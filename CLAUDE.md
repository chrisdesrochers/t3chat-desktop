# T3 Chat Desktop App

This project creates a native macOS desktop application for T3 Chat using Nativefier to improve productivity by eliminating browser distractions.

## Project Structure

- **README.md**: Comprehensive project documentation with build instructions
- **LICENSE**: MIT license
- **new-chat-automator.js**: JavaScript for automated prompt injection
- **raycast/**: Raycast integration scripts for macOS productivity workflow
- **T3Chat-darwin-x64/**: Complete macOS app bundle (excluded from git due to size)
- **.gitignore**: Excludes large binaries and distribution files

## Key Features

- Native macOS application with system integration
- Experimental Raycast integration for quick prompt launching
- Cross-platform build documentation
- Automation scripts for custom integrations

## Development Notes

- Built with Nativefier v52.0.0 and Electron v25.7.0
- App distribution handled via GitHub Releases (files too large for git)
- Uses GitHub noreply email for commits
- Community-driven solution until official native apps are available

## Distribution

- **Source Code**: GitHub repository with build instructions
- **Binaries**: Distributed via GitHub Releases as zip files
- **Target**: macOS Apple Silicon initially, with cross-platform instructions

## Build Commands

```bash
# Install Nativefier
npm install -g nativefier

# Build for macOS
nativefier "https://t3.chat/" \
  --platform=darwin \
  --arch=x64 \
  --name="T3Chat" \
  --app-version="1.0.0" \
  --width=1280 \
  --height=800 \
  --tray=start-in-tray \
  --single-instance
```

This project aims to bridge the productivity gap until official T3 Chat native applications are available.