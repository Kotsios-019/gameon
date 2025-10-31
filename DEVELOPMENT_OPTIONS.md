# Development Options - Windows

## You're on Windows - iOS Simulator Options

Since you're on Windows, you can't run iOS Simulator (Xcode is macOS-only). Here are your options:

### Option 1: Use Android Emulator (Recommended for Windows)
1. Install Android Studio
2. Set up Android Virtual Device (AVD)
3. Run: `npm start`
4. Press `a` for Android

### Option 2: Use Expo Go App (Easiest)
1. Install Expo Go on your phone (iOS or Android)
2. Run: `npm start`
3. Scan the QR code with Expo Go app

### Option 3: Use Web Version (Quick Testing)
1. Run: `npm start`
2. Press `w` for web
3. Opens in browser

### Option 4: Cloud iOS Simulator (Paid)
- Use services like MacStadium or AWS Device Farm
- Or use a macOS virtual machine (complex setup)

## Recommended Setup for You

1. **Start with Web** - Fastest way to test UI
   ```bash
   npm start
   # Press 'w'
   ```

2. **Use Expo Go on your phone** - Best for testing mobile features
   - Install Expo Go app
   - Scan QR code
   - Test location, camera, etc. on real device

3. **Set up Android Emulator** - For Android-specific testing
   - Install Android Studio
   - Create AVD
   - Use for Android testing

