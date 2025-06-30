#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Ask T3 Chat
# @raycast.mode compact

# Optional parameters:
# @raycast.icon /Users/superabundant/Github/t3chat-macos/T3Chat-darwin-x64/T3Chat.app/Contents/Resources/electron.icns
# @raycast.argument1 { "type": "text", "placeholder": "Enter your prompt", "optional": false }
# @raycast.argument2 { "type": "text", "placeholder": "Model (optional)", "optional": true }
# @raycast.packageName T3Chat

# Documentation:
# @raycast.description Start a new chat in T3Chat with your prompt
# @raycast.author YourName

SCRIPT_DIR="/Users/superabundant/Github/t3chat-macos/raycast"

if [ -z "$2" ]; then
    osascript "$SCRIPT_DIR/t3chat-raycast.scpt" "$1"
else
    osascript "$SCRIPT_DIR/t3chat-raycast.scpt" "$1" "$2"
fi