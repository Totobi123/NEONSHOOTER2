const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// Serve static files (index.html, etc.)
app.use(express.static(path.join(__dirname)));

// Store active games
const games = {};
const players = {};

// Matchmaking queue
const matchQueue = [];

// Socket.io events
io.on('connection', (socket) => {
    console.log('New player connected:', socket.id);
    
    // Player creates a random match
    socket.on('create-room', () => {
        const roomId = 'room_' + Math.random().toString(36).substr(2, 8).toUpperCase();
        
        socket.join(roomId);
        players[socket.id] = { roomId, playerId: 1, x: 0, y: 0, health: 100 };
        games[roomId] = { 
            player1: socket.id, 
            player2: null, 
            started: false 
        };
        
        socket.emit('room-created', { code: roomId });
        console.log('Room created:', roomId);
        
        // Auto-cancel after 2 minutes if no opponent joins
        setTimeout(() => {
            if(!games[roomId] || !games[roomId].player2) {
                socket.emit('opponent-timeout');
                delete games[roomId];
                delete players[socket.id];
            }
        }, 120000);
    });
    
    // Player joins a room
    socket.on('join-room', (code) => {
        if(!games[code]) {
            socket.emit('room-not-found');
            return;
        }
        
        if(games[code].player2) {
            socket.emit('room-full');
            return;
        }
        
        socket.join(code);
        games[code].player2 = socket.id;
        games[code].started = true;
        
        players[socket.id] = { 
            roomId: code, 
            playerId: 2, 
            x: 0, 
            y: 0, 
            health: 100 
        };
        
        // Notify both players game started
        io.to(code).emit('game-start', {
            roomId: code,
            player1: games[code].player1,
            player2: socket.id
        });
        
        console.log('Player joined room:', code);
    });
    
    // Sync player state
    socket.on('player-update', (data) => {
        if(players[socket.id]) {
            const roomId = players[socket.id].roomId;
            players[socket.id] = { ...players[socket.id], ...data };
            
            // Send to opponent
            const opponentId = data.playerId === 1 
                ? games[roomId]?.player2 
                : games[roomId]?.player1;
            
            if(opponentId) {
                io.to(opponentId).emit('opponent-update', {
                    x: data.x,
                    y: data.y,
                    health: data.health
                });
            }
        }
    });
    
    // Projectile sync
    socket.on('fire-projectile', (projectile) => {
        if(players[socket.id]) {
            const roomId = players[socket.id].roomId;
            const opponentId = players[socket.id].playerId === 1 
                ? games[roomId]?.player2 
                : games[roomId]?.player1;
            
            if(opponentId) {
                io.to(opponentId).emit('opponent-projectile', projectile);
            }
        }
    });
    
    // Game end
    socket.on('game-end', (data) => {
        if(players[socket.id]) {
            const roomId = players[socket.id].roomId;
            io.to(roomId).emit('opponent-disconnect');
            delete games[roomId];
            delete players[socket.id];
        }
    });
    
    // Disconnect
    socket.on('disconnect', () => {
        if(players[socket.id]) {
            const roomId = players[socket.id].roomId;
            io.to(roomId).emit('opponent-disconnect');
            delete games[roomId];
        }
        delete players[socket.id];
        console.log('Player disconnected:', socket.id);
    });
});

// Start server
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
