# T3Chat Raycast Integration

This folder contains the Raycast integration for T3Chat, allowing you to quickly start new chats from Raycast.

## Manual Installation

### Step 1: Enable Script Commands in Raycast
1. Open Raycast
2. Go to Extensions → Script Commands
3. Click "Add Script Directory"
4. Select `/Users/superabundant/Github/t3chat-macos/raycast`

### Step 2: Reload Raycast
- Press ⌘+R in Raycast to reload extensions
- Or restart Raycast completely

### Step 3: Test the Integration
1. Open Raycast (⌘+Space)
2. Type "Ask T3 Chat"
3. Enter your prompt (e.g., "How many tacos can I eat daily and stay under 2000 calories?")
4. Optionally specify a model in the second field
5. Hit Enter - T3Chat will launch and automatically send your prompt

## Files

- `t3chat.sh` - Main Raycast script command
- `t3chat-raycast.scpt` - AppleScript for app automation
- `install-raycast-command.sh` - Automated installer (alternative to manual setup)

## Alternative: Automated Installation

Run the installer script:
```bash
./install-raycast-command.sh
```

This will copy the script to Raycast's default script directory.

## Troubleshooting

### Command Not Appearing
- Ensure the script directory is added to Raycast settings
- Check that `t3chat.sh` is executable: `chmod +x t3chat.sh`
- Reload Raycast with ⌘+R

### App Not Opening
- Verify T3Chat app exists at: `/Users/superabundant/Github/t3chat-macos/T3Chat-darwin-x64/T3Chat.app`
- Test AppleScript directly: `osascript t3chat-raycast.scpt "test prompt"`

### Prompt Not Being Sent
- The script waits for the app to load before typing
- If timing issues occur, increase delays in `t3chat-raycast.scpt`