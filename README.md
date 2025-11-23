# Neon Defender 1v1 - Competitive PvP Shooter

A real-time, neon-styled 1v1 PvP shooter game with three distinct modes: Bot AI, Local 2-Player, and Online Multiplayer.

## Features

- **1v1 PvP Combat**: Local, vs Bot (3 difficulties), or Online matchmaking
- **3 Weapons**: Pistol, Shotgun, Sniper with unique stats
- **4 Free Skins**: Customize player appearance
- **Sound Effects & Visual Polish**: Web Audio API sounds, particle effects, bullet trails
- **Game Statistics**: Real-time kill/damage tracking
- **Mobile Touch Controls**: Optional on-screen joystick & shoot button
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Real-time Multiplayer**: WebSocket-based online play with room codes

## Deployment

### Option 1: Deploy Frontend to Netlify + Backend Separately

**Frontend (Netlify):**
1. Connect your GitHub/Git repo to Netlify
2. Set build command: (leave empty - static site)
3. Set publish directory: (root folder or `.`)
4. Deploy!

**Backend (Render/Railway/Heroku):**
1. Deploy `server.js` to Render/Railway/Heroku
2. In Netlify environment variables, set:
   - `BACKEND_URL` = your deployed backend URL
3. Update frontend code to use the backend URL

**Quick Netlify Setup:**
```bash
# 1. Connect repo to Netlify dashboard
# 2. Leave build settings empty (static site)
# 3. Add environment variable:
#    BACKEND_URL = https://your-backend-url.com
```

### Option 2: Deploy Everything to Render/Railway

If you want both frontend and backend in one place:
1. Deploy the Node.js server to Render or Railway
2. Backend automatically serves the frontend from `index.html`
3. No need for separate deployment

## Local Development

```bash
# Install dependencies
npm install

# Start server (includes frontend on http://localhost:5000)
node server.js
```

## Environment Variables

- `BACKEND_URL` - URL for backend API (used in production)
- Set in Netlify: Site settings → Build & deploy → Environment

## Project Structure

```
.
├── index.html          # Main game (frontend)
├── server.js           # Node.js backend (Express + Socket.io)
├── package.json        # Dependencies
├── netlify.toml        # Netlify configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Canvas API)
- **Backend**: Node.js, Express.js, Socket.io
- **Deployment**: Netlify (frontend), Render/Railway/Heroku (backend)

## Quick Start

1. **Play Online**: Share room code with a friend for real-time multiplayer
2. **Play Locally**: 2-player mode on same device
3. **Play vs Bot**: Challenge AI with 3 difficulty levels
4. **Customize**: Select skins and weapons before each match
5. **Settings**: Toggle sound, particles, screen shake, and touch controls

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Controls

**Keyboard (Desktop):**
- Player 1: WASD to move, Click or ENTER to shoot
- Player 2: Arrow Keys to move, SHIFT to shoot

**Mobile (Optional):**
- Toggle "Enable Touch Controls" in Settings
- Use virtual joystick for movement
- Tap 🔫 button to shoot

## License

Created with ❤️ for competitive gaming
