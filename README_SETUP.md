# SnapMe Setup Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
1. Create a project at https://supabase.com
2. Go to Settings > API
3. Copy your `Project URL` and `anon public` key
4. Add to `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Setup Supabase Database
Run these SQL commands in Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  phone_number TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'cameraman', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY REFERENCES users(id),
  name TEXT NOT NULL,
  profile_image TEXT,
  booking_history UUID[],
  orange_money_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cameramen table
CREATE TABLE cameramen (
  id UUID PRIMARY KEY REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  brand_name TEXT NOT NULL,
  profile_image TEXT NOT NULL,
  portfolio TEXT[],
  equipment TEXT[],
  service_categories TEXT[],
  location JSONB,
  availability TEXT NOT NULL CHECK (availability IN ('available', 'busy')),
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  price_per_hour NUMERIC,
  orange_money_number TEXT NOT NULL,
  wallet_balance NUMERIC DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  withdrawal_history UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cameramen ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for customers
CREATE POLICY "Customers can read own data" ON customers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customers can update own data" ON customers
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for cameramen
CREATE POLICY "Cameramen can read own data" ON cameramen
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Cameramen can update own data" ON cameramen
  FOR UPDATE USING (auth.uid() = id);
```

### 4. Setup Auto-Commit to GitHub

#### Option A: Manual Setup
```bash
# Initialize git (if not already done)
git init
git branch -M main

# Add your remote repository
git remote add origin https://github.com/yourusername/snapme-mobile.git

# Run auto-commit script
npm run git:auto-commit
```

#### Option B: Automatic (Watch Mode)
Install `watchman` for file watching:
```bash
# macOS
brew install watchman

# Then setup a file watcher (optional)
```

### 5. Run on Android Device

#### Prerequisites:
- Android device connected via USB
- USB debugging enabled
- Device drivers installed

#### Steps:
```bash
# Make setup script executable
chmod +x scripts/setup-android.sh

# Run setup script
./scripts/setup-android.sh

# OR manually:
npm run android
```

### 6. App Logo & Splash Screen

The app logo is automatically used:
- **Logo Component**: `src/components/Logo.tsx` (used in SplashScreen)
- **Splash Screen**: Configured in `android/app/src/main/res/`
- **App Icon**: Place PNG files in `android/app/src/main/res/mipmap-*/`

To update the logo:
1. Edit `src/components/Logo.tsx` for React Native usage
2. Generate PNG icons from logo for Android:
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

## Environment Variables

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Required variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- Orange Money credentials (when available)

## Troubleshooting

### Android Device Not Detected
```bash
# Check ADB connection
adb devices

# Restart ADB
adb kill-server
adb start-server
```

### Metro Bundler Issues
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Build Errors
```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run android
```

## Next Steps

1. ✅ Supabase authentication is now configured
2. ✅ Logo and splash screen are set up
3. ✅ Auto-commit script is ready
4. ⏳ Complete remaining features (booking, payments, etc.)
5. ⏳ Add Orange Money API credentials when available
