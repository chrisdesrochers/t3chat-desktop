#!/bin/bash

RAYCAST_SCRIPTS_DIR="$HOME/Library/Application Support/com.raycast.macos/extensions/script-commands"
mkdir -p "$RAYCAST_SCRIPTS_DIR"

# Copy files from this directory to Raycast scripts directory
cp "$(dirname "$0")/t3chat.sh" "$RAYCAST_SCRIPTS_DIR/"
cp "$(dirname "$0")/t3chat-raycast.scpt" "$RAYCAST_SCRIPTS_DIR/"

chmod +x "$RAYCAST_SCRIPTS_DIR/t3chat.sh"

echo "Raycast command installed successfully!"
echo "You can now use 'Ask T3 Chat' command in Raycast"
echo "Files copied to: $RAYCAST_SCRIPTS_DIR"