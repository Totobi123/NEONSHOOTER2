# Neon Defender 1v1

## Overview
A single-page HTML5 canvas game - "Neon Defender 1v1" - a competitive 1v1 PvP shooter with neon graphics. This is a static website with no backend or build process required.

## Project Structure
- `index.html` - Complete game with embedded CSS and JavaScript
- Static HTML5 game using Canvas API

## Technology Stack
- Pure HTML5, CSS3, and JavaScript
- No dependencies or build tools needed
- Client-side only application

## Setup
No build process required - just serve the HTML file directly.

## Responsive Design
✅ **FULLY RESPONSIVE** - Works perfectly on all devices:
- **Desktop (1024px+)**: Full-sized UI with optimal spacing
- **Tablets (600-1024px)**: Scaled layout with flexible grids
- **Mobile (600px and below)**: Touch-friendly buttons, adapted layouts
- **Very Small Phones (under 400px)**: Compact UI while maintaining playability
- **Landscape Mode**: Optimized for horizontal screens
- **Touch Support**: `touch-action: manipulation` for smooth mobile interactions
- **Fluid Scaling**: Uses CSS `clamp()` and viewport units (vmin, vw, vh) for automatic scaling
- **CSS Media Queries**: 5 breakpoints for perfect rendering on any screen size

## Mobile Game Controls
✅ **TOUCH CONTROLS FOR PHONES** - Optional on-screen controls:
- **Movement Joystick** (Bottom Left): Virtual joystick for directional movement
- **Shoot Button** (Bottom Right): Large 🔫 button to fire weapons
- **Toggle in Settings**: "Enable Touch Controls" checkbox to show/hide during gameplay
- **Auto-disabled on desktop**: Only appears on mobile devices
- **Works in all modes**: Bot, Local 2-Player, and Online multiplayer
- **Smooth responsiveness**: Real-time movement tracking and haptic feedback

## Game Features
- **1v1 PvP Combat:**
  - Local 1v1: Two players on same device
  - Bot Mode: Play against AI with 3 difficulty levels (Easy/Medium/Hard)
  - Online 1v1: Connect via code or random match
- **Gameplay:**
  - 3 weapons (Pistol, Shotgun, Sniper)
  - Health bars for both players
  - Bot AI with adaptive difficulty
- **Controls (2-Player Mode):**
  - Multi-Keyboard Detection: System detects and names connected keyboards (Keyboard A, B, C, etc.)
  - Smart Assignment: Players select which keyboard to use, other auto-assigned to Player 2
  - Default Controls: Player 1 (WASD + Click), Player 2 (Arrow Keys + SHIFT)
  - Fallback Option: If only 1 keyboard, use default controls
- **Bot Mode:**
  - Easy: Slower movement speed (2.5x), longer fire rate (800ms)
  - Medium: Balanced speed (4x), standard fire rate (500ms)
  - Hard: Fast movement speed (5.5x), rapid fire rate (300ms)
  - Bot automatically moves toward and shoots at player
- **Features:**
  - Sound Effects: Shoot, hit, game over sounds via Web Audio API
  - Settings Menu: Volume control, color themes (Cyan/Red/Blue/Green), visual effects toggles
  - Weapon Selection: Pre-game weapon choice with stats display
  - Game Statistics: Real-time kill/damage tracking on HUD
  - Visual Polish: Intense screen shake on hits, particle explosions, bullet trails
  - **Cosmetic Skins:** 4 character appearance options (unlock via Daily Challenges)
  - **Daily Challenges:** 3 daily quests with progress bars and cosmetic rewards
  - Pause button (ESC key)
  - Home button on game over
  - Smooth neon visual style with particle effects

## Deployment Setup (Netlify-Ready)
✅ **NETLIFY DEPLOYMENT CONFIGURED:**
- `netlify.toml` - Complete Netlify configuration
- `README.md` - Full documentation with features & controls
- `DEPLOYMENT.md` - Step-by-step deployment guide
- `package.json` - Updated with metadata and start scripts
- `.gitignore` - Optimized for production

**To Deploy:**
1. Push to GitHub
2. Connect repo to Netlify
3. Leave build command empty (static site)
4. (Optional) Deploy Node.js backend to Render/Railway/Heroku
5. Set `BACKEND_URL` env variable in Netlify if using remote backend

## Recent Changes
- 2025-11-23: **REMOVED: Power-ups, Screen Shake on Hit, Challenges System** - Streamlined for clean gameplay
- 2025-11-23: **REMOVED: All locked content** - All character skins now free and available
- 2025-11-23: **MOVED: Skins & Settings to main menu** - Direct access from home screen
- 2025-11-23: **MADE FULLY RESPONSIVE** - Extreme responsiveness with 5 breakpoints (mobile to 4K)
- 2025-11-23: **ADDED: Mobile Touch Controls** - Optional on-screen joystick + shoot button
- 2025-11-23: **ADDED: Complete Netlify Deployment Setup**
  - `netlify.toml` - Netlify configuration file
  - `README.md` - Full documentation
  - `DEPLOYMENT.md` - Step-by-step deployment guide
  - `package.json` - Updated with metadata
  - `.env.example` - Environment variable template
  - `.gitignore` - Production-ready ignore rules
  - `server.js` - Updated to use PORT env variable
- Previous features: Sound effects, Settings menu, Weapon selection, Game statistics, Visual polish, Character skins, Online multiplayer, Bot AI, Local 2-player, Multi-keyboard detection

## Online Multiplayer Backend (Node.js + WebSockets)
- **Backend:** Express.js server with Socket.io for real-time multiplayer
- **How it works:** Server handles matchmaking and syncs game state in real-time
- **Architecture:** 
  - `server.js` - Node.js server (Express + Socket.io)
  - Serves the static game (index.html)
  - Manages player connections and game rooms
  - Server-authoritative player ID assignment (prevents spoofing)
  - Syncs positions, health, and projectiles in real-time
- **Authoritative Architecture:**
  - Each client controls and syncs ONLY their own avatar
  - Each client detects hits ONLY on their own avatar
  - Server validates player IDs and routes updates to correct opponent
  - No double-application of damage - health stays synchronized
  - Victory conditions consistent across both clients
- **Controls:**
  - **Host (Player 1):** WASD to move, Click or ENTER to auto-shoot at opponent
  - **Joiner (Player 2):** Arrow Keys to move, SHIFT to auto-shoot at opponent
- **Matchmaking:**
  - Host clicks "RANDOM MATCH" → gets 5-character code to share
  - Joiner clicks "ENTER CODE" → enters host's code to connect
  - 2-minute timeout if opponent doesn't join
- **No external services needed** - All on Replit!
