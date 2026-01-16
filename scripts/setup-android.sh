#!/bin/bash

# Setup script for Android development
echo "🚀 Setting up Android development environment..."

# Check if Android device is connected
echo "📱 Checking for connected Android devices..."
DEVICES=$(adb devices | grep -v "List" | grep "device" | wc -l)

if [ $DEVICES -eq 0 ]; then
    echo "❌ No Android device found!"
    echo "Please connect your Android device and enable USB debugging."
    exit 1
fi

echo "✅ Found $DEVICES connected device(s)"
adb devices

# Check if Metro bundler is running
echo "🔍 Checking Metro bundler..."
if ! lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null ; then
    echo "📦 Starting Metro bundler..."
    npm start &
    sleep 5
fi

# Build and run on device
echo "🏗️  Building and installing app on device..."
npx react-native run-android

echo "✅ Setup complete! App should be running on your device."
