# SnapMe Mobile App

Professional photography on-demand platform for Sierra Leone.

## Overview

SnapMe is a two-sided marketplace connecting customers with professional photographers/cameramen. Built with React Native and TypeScript, featuring Orange Money payment integration.

## Technology Stack

- **Framework**: React Native 0.73.2
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6+
- **UI Components**: React Native Paper
- **Maps**: React Native Maps
- **Authentication**: Firebase Auth (Phone/OTP)
- **Backend**: Firebase (Firestore, Storage, Cloud Functions)
- **Payment**: Orange Money Sierra Leone API
- **Push Notifications**: Firebase Cloud Messaging (FCM)

## Project Structure

```
snapme-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API calls, Firebase services
│   ├── store/              # State management (Redux)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions, constants
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Images, fonts, icons
│   ├── config/             # App configuration
│   └── theme/              # Design system
├── docs/                    # Documentation files
└── [configuration files]
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in Firebase and Orange Money credentials

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the App**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## Features

### Customer Features
- Browse and search photographers
- Book photography services
- Make payments via Orange Money
- Rate and review after completion

### Cameraman Features
- Register and create profile
- Manage availability
- Accept/reject booking requests
- Receive payments via Orange Money
- Build reputation through ratings

## Documentation

All code files have corresponding documentation in the `docs/` directory. See individual component and screen documentation for detailed usage.

## Development Phases

1. ✅ Foundation (Project setup, theme, navigation)
2. ✅ Authentication (Phone/OTP, onboarding)
3. 🔄 Core Features (Profiles, discovery, search)
4. ⏳ Booking System
5. ⏳ Orange Money Integration
6. ⏳ Additional Features (Ratings, notifications)
7. ⏳ Admin Features
8. ⏳ Polish & Testing

## License

Proprietary - SnapMe Platform
