# T3 Chat Desktop App

## Background

One of my favorite daily tools is [T3 Chat](https://t3.chat/), but the lack of a desktop native app has made integrating it into my productivity workflow challenging. This is my first attempt to close that gap, and I wanted to share it with everyone.

Of course, if [@t3dotgg](https://github.com/t3dotgg) and the team decide to create their own native apps for T3 Chat, this project will be deprecated quickly. But until then, this serves as a bridge for those who want a native desktop experience.

I also use Raycast as part of my workflow to start new chats with tools like Claude and Perplexity. The `new-chat-automator.js` script helps me push prompts into the native app, enabling integrations with Raycast and other tools on a native platform.

I love T3 Chat - it's honestly the best $8/month you could spend if you want to use one or more AI models in a single interface.

## Download

**macOS (Apple Silicon/M-series)**: [Download T3Chat-macOS-AppleSilicon.zip](https://github.com/chrisdesrochers/t3chat-desktop/releases/download/v1.0/T3Chat-macOS-AppleSilicon.zip)

> **Installation**: Download, unzip, and drag `T3Chat.app` to your Applications folder.

## About This Project

A desktop application wrapper for [T3 Chat](https://t3.chat/) built using Nativefier to improve productivity by providing a native desktop experience. This project aims to create a dedicated desktop version of T3 Chat that eliminates browser distractions and provides better system integration.

The first compiled version targets **macOS Apple Silicon**, but this repository includes instructions for building on other systems including Windows and Linux.

## What This Project Does

This project wraps the T3 Chat web application (https://t3.chat/) into a native macOS desktop application using Nativefier, providing:

- **Enhanced Productivity**: Dedicated desktop app eliminates browser distractions and tab switching
- **Native System Integration**: Standalone application with dock icon, native window controls, and system-specific behaviors
- **Quick Access Features**: Experimental Raycast integration (macOS only) for rapid prompt launching
- **Focused Experience**: Clean interface without browser chrome, tabs, or URL bars

## Project Structure

```
t3chat-desktop/
├── T3Chat-darwin-x64/           # Generated Nativefier app bundle
│   └── T3Chat.app/              # macOS application
├── raycast/                     # Raycast integration scripts
│   ├── t3chat.sh               # Main Raycast command script
│   ├── t3chat-raycast.scpt     # AppleScript automation
│   └── install-raycast-command.sh
├── new-chat-automator.js        # JavaScript for automated prompt injection
└── LICENSE                      # MIT License
```

## How We Built It

### 1. Core Application
- Used **Nativefier v52.0.0** with **Electron v25.7.0** to wrap the T3 Chat web interface
- Configured for macOS Apple Silicon (darwin-x64 architecture)
- Set up with window dimensions 1280x800 and system tray integration

### 2. Automation Features
- Created `new-chat-automator.js` to handle automated prompt injection
- Implemented DOM waiting mechanisms for reliable element targeting
- Added URL parameter parsing for external prompt triggering

### 3. Raycast Integration
- Built shell script wrapper for Raycast command integration
- Created AppleScript for macOS app automation and prompt injection
- Provided both manual and automated installation options

## Building on Other Systems

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install Nativefier globally:**
```bash
npm install -g nativefier
```

2. **Build the desktop app:**
```bash
# For macOS (Apple Silicon)
nativefier "https://t3.chat/" \
  --platform=darwin \
  --arch=x64 \
  --name="T3Chat" \
  --app-version="1.0.0" \
  --app-copyright="T3Chat Wrapper" \
  --width=1280 \
  --height=800 \
  --tray=start-in-tray \
  --single-instance \
  --hide-window-frame=false \
  --show-menu-bar=false

# For Windows
nativefier "https://t3.chat/" \
  --platform=win32 \
  --arch=x64 \
  --name="T3Chat"

# For Linux
nativefier "https://t3.chat/" \
  --platform=linux \
  --arch=x64 \
  --name="T3Chat"
```

3. **Add automation features (optional):**
   - Copy `new-chat-automator.js` to the generated app's resources folder
   - Modify the app's injection settings to include the automation script

### Platform-Specific Notes

#### macOS
- Supports system tray integration
- Requires code signing for distribution
- Native window controls and behaviors

#### Windows
- Different system tray behavior
- May require additional permissions for some features
- Windows-specific packaging options available

#### Linux
- Various desktop environment integrations
- Package as AppImage, Snap, or deb/rpm
- System tray support varies by desktop environment

## Usage

### Basic Usage
1. Launch the T3Chat application from your Applications folder (macOS)
2. The app will open to the T3 Chat interface
3. Use normally as you would the web version

### Raycast Integration (Experimental - macOS only)
1. Install Raycast if not already installed
2. Run the installation script: `./raycast/install-raycast-command.sh`
3. Use ⌘+Space to open Raycast, then type "Ask T3 Chat"
4. Enter your prompt and optionally specify a model
5. The app will launch and automatically send your prompt

## Technical Details

- **Electron Version**: 25.7.0
- **Nativefier Version**: 52.0.0
- **Target Architecture**: x64 (Apple Silicon compatible)
- **Dependencies**: Standard Electron framework dependencies
- **License**: MIT

## Disclaimer

**This project is not affiliated with T3 Chat or its creators.** We do not own the trademark to "T3 Chat" or any related intellectual property. This is an unofficial, community-created desktop wrapper.

**Fair Use and Interoperability:** This software is created under principles of fair use and interoperability. It does not reproduce, distribute, or modify T3 Chat's proprietary code or content. Instead, it provides a desktop interface that accesses the publicly available T3 Chat web service, similar to how web browsers access websites. This falls under fair use provisions that allow for interoperability tools and does not infringe on T3 Chat's intellectual property rights.

**No warranty expressed or implied.** This software is provided "as is" without any guarantees. Use at your own risk.

## Contributing

This project is open source under the MIT License. Feel free to submit issues, feature requests, or pull requests.

## Troubleshooting

### App Won't Launch
- Ensure you have the required macOS version
- Check that the app has necessary permissions
- Try running from Terminal to see error messages

### Raycast Integration Issues
- Verify Raycast script directory is properly configured
- Check that scripts have executable permissions (`chmod +x`)
- Test AppleScript directly: `osascript raycast/t3chat-raycast.scpt "test"`

### Building Issues
- Ensure Node.js and npm are up to date
- Clear npm cache if installation fails
- Check Nativefier documentation for platform-specific requirements