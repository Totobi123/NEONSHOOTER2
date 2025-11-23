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

## Game Features
- **1v1 PvP Combat:**
  - Local 1v1: Two players on same device
  - Bot Mode: Play against AI with 3 difficulty levels (Easy/Medium/Hard)
  - Online 1v1: Connect via code or random match (placeholder UI)
- **Gameplay:**
  - 3 weapons (Pistol, Shotgun, Sniper)
  - No powerups (removed for balanced PvP)
  - Health bars for both players
  - Bot AI with adaptive difficulty
- **Controls (2-Player Mode):**
  - Multi-Keyboard Detection: System detects and names connected keyboards (Keyboard A, B, C, etc.)
  - Smart Assignment: Players select which keyboard to use, other auto-assigned to Player 2
  - Default Controls: Player 1 (WASD + Click), Player 2 (Arrow Keys + CTRL)
  - Fallback Option: If only 1 keyboard, use default controls
- **Bot Mode:**
  - Easy: Slower movement speed (2.5x), longer fire rate (800ms)
  - Medium: Balanced speed (4x), standard fire rate (500ms)
  - Hard: Fast movement speed (5.5x), rapid fire rate (300ms)
  - Bot automatically moves toward and shoots at player
- **Features:**
  - Pause button (ESC key)
  - Home button on game over
  - Smooth neon visual style with particle effects

## Recent Changes
- 2025-11-22: Completely redesigned game as 1v1 PvP
- 2025-11-22: Removed Battle Royale and Normal modes
- 2025-11-22: Removed all powerups for balanced gameplay
- 2025-11-22: Added pause functionality with ESC key
- 2025-11-22: Added home buttons to return to menu
- 2025-11-22: Added Local 1v1 mode (fully functional)
- 2025-11-22: Added Bot Mode with 3 difficulty levels
- 2025-11-22: Bot AI automatically moves toward and shoots at player
- 2025-11-22: Added choice screen between vs Bot and vs Player (local)
- 2025-11-22: Added multi-keyboard detection system for 2-player mode
- 2025-11-22: System detects multiple physical keyboards and assigns names (Keyboard A, B, etc.)
- 2025-11-22: Players select which keyboard to use, other auto-assigned to Player 2
- 2025-11-22: Mouse registration for both players in calibration phase
- 2025-11-22: Fallback to default controls if only 1 keyboard detected
- 2025-11-22: **NEW: Node.js + Socket.io Online Multiplayer** - Real-time 1v1 play across the internet
- 2025-11-22: Implemented random match (generates 5-char code) and code-based joining
- 2025-11-22: Real-time game state sync (positions, health, projectiles)
- 2025-11-22: Extended matchmaking timeout to 2 minutes
- 2025-11-23: **CRITICAL FIXES: Complete Online Multiplayer Overhaul**
- 2025-11-23: Fixed player ID assignment - Host=Player 1, Joiner=Player 2 (server-authoritative)
- 2025-11-23: Fixed movement sync - each player controls own avatar, positions sync every frame
- 2025-11-23: Fixed damage sync - each client authoritative for own health (no double-application)
- 2025-11-23: Fixed projectile rendering - remote projectiles now visible using Projectile class
- 2025-11-23: Fixed control restrictions - Host uses WASD+Click/Enter, Joiner uses Arrows+Shift
- 2025-11-23: Fixed labels - Host sees "You (Host)", Joiner sees "You (Joiner)"
- 2025-11-23: Fixed copy button visibility - only Host sees copy code button
- 2025-11-23: Separated game modes clearly - Bot/Online/Local have distinct code paths
- 2025-11-23: Server validates player IDs and routes updates correctly
- 2025-11-23: Eliminated health desync - both players see consistent health and victory states
- 2025-11-23: **FIXED: Movement for offline modes** - Bot and Local 2-Player now use default controls (WASD + Arrows)
- 2025-11-23: **NEW: Replay Button** - Click REPLAY on game-over screen to instantly restart same game mode
- 2025-11-23: **COMPLETE FEATURE UPDATE - ALL 5 FEATURES ADDED:**
- 2025-11-23: **Feature 1: Sound Effects System** - Web Audio API generates shoot/hit/game-over sounds
- 2025-11-23: **Feature 2: Settings Menu** - Volume control (0-100%), screen shake toggle, particle effects toggle, bullet trails toggle
- 2025-11-23: **Feature 3: Weapon Selection** - Pre-game weapon selection screen with Pistol/Shotgun/Sniper stats
- 2025-11-23: **Feature 4: Game Statistics** - Track kills, damage dealt per player, display on HUD during gameplay
- 2025-11-23: **Feature 5: Visual Polish** - Screen shake (8px intensity on hits), particle explosion effects, bullet trail rendering

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
