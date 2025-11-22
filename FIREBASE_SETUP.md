# Firebase Setup Guide for Neon Defender Online Multiplayer

## Step 1: Create a Firebase Project (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or sign in with your Google account
3. Enter project name: `neon-defender` (or any name you like)
4. Click "Create project"
5. Wait for project to be created

## Step 2: Get Your Firebase Config

1. In Firebase Console, click the **gear icon** (⚙️) at top-left → **Project Settings**
2. Go to the **"General"** tab
3. Scroll down to **"Your apps"** section
4. If no app exists, click **"Add app"** → **Web** (</> icon)
5. Enter app name: `Neon Defender`
6. Copy the entire **firebaseConfig** object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 3: Add Config to Game

1. Open `index.html` in your Replit project
2. Find the **"===== FIREBASE CONFIG ====="** section (around line 264)
3. **Replace the entire `firebaseConfig` object** with YOUR config from step 2
4. **Save the file**

## Step 4: Enable Realtime Database

1. Back in Firebase Console, go to **"Realtime Database"** (left sidebar)
2. Click **"Create Database"**
3. Choose location (default is fine)
4. Choose **"Start in test mode"** (for testing)
5. Click "Enable"
6. Wait for database to be created

## Step 5: Set Database Rules

1. In Realtime Database, go to the **"Rules"** tab
2. Replace with this:

```json
{
  "rules": {
    "games": {
      ".read": true,
      ".write": true,
      "$roomId": {
        ".validate": "newData.hasChildren(['player1', 'player2'])"
      }
    }
  }
}
```

3. Click "Publish"

## Step 6: Test Online Mode!

1. **Start your game**: Click "ONLINE 1v1" → "RANDOM MATCH"
2. **Share the code** with a friend or open another browser tab
3. **Friend enters code** → Game starts when both connect!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Firebase not configured" error | Check that you pasted the config correctly in index.html |
| Opponent doesn't appear | Make sure Realtime Database is enabled and rules are published |
| No opponent found after 30 seconds | The other player might not have joined yet, or there's a connection issue |
| Console errors about Firebase | Check browser console (F12) and verify your apiKey is correct |

## How It Works

1. **Player 1** clicks "RANDOM MATCH" → Creates a room with unique code
2. **Player 2** enters that code → Both players connect
3. **Real-time sync**: Player positions, health, and shots sync continuously
4. **Winner**: First to 0 health loses
5. **Auto-fallback**: If no opponent joins in 30 seconds, plays vs Bot

## Notes

- You can play online with **any device** (phone, tablet, computer)
- Latency depends on internet speed (typically 50-200ms)
- Test mode allows unlimited free usage for development

Enjoy online multiplayer! 🎮
