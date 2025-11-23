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
        // Generate a guaranteed 5-character alphanumeric code
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let roomId = '';
        for(let i = 0; i < 5; i++) {
            roomId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        console.log('Generating room code:', roomId);
        
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
        console.log('Join-room attempt:', code, 'Available rooms:', Object.keys(games));
        
        if(!games[code]) {
            console.log('Room not found:', code);
            socket.emit('room-not-found');
            return;
        }
        
        if(games[code].player2) {
            console.log('Room full:', code);
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
        
        // Notify both players game started with their player IDs
        io.to(games[code].player1).emit('game-start', {
            roomId: code,
            playerId: 1
        });
        
        io.to(socket.id).emit('game-start', {
            roomId: code,
            playerId: 2
        });
        
        console.log('Player joined room:', code, '- Player 1:', games[code].player1, 'Player 2:', socket.id);
    });
    
    // Sync player state
    socket.on('player-update', (data) => {
        if(players[socket.id]) {
            const roomId = players[socket.id].roomId;
            const myPlayerId = players[socket.id].playerId; // Server-authoritative ID
            
            // CRITICAL: Only accept updates for THIS socket's playerId (ignore client-provided ID)
            // Update this player's state
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            players[socket.id].health = data.health;
            
            // Send to opponent based on SERVER-AUTHORITATIVE playerId
            const opponentId = myPlayerId === 1 
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
