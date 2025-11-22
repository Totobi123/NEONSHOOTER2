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
- 2025-11-22: Added Online 1v1 UI (random match + code-based matchmaking)
- 2025-11-22: Added Bot Mode with 3 difficulty levels
- 2025-11-22: Bot AI automatically moves toward and shoots at player
- 2025-11-22: Added choice screen between vs Bot and vs Player (local)
- 2025-11-22: Added multi-keyboard detection system for 2-player mode
- 2025-11-22: System detects multiple physical keyboards and assigns names (Keyboard A, B, etc.)
- 2025-11-22: Players select which keyboard to use, other auto-assigned to Player 2
- 2025-11-22: Mouse registration for both players in calibration phase
- 2025-11-22: Fallback to default controls if only 1 keyboard detected
