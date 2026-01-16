# Installation Instructions

## Step-by-Step Setup

### 1. Install All Dependencies

```bash
# Navigate to project directory
cd /Users/limkokwingsl/Desktop/SNAPME

# Install with legacy peer deps (resolves React version conflicts)
npm install --legacy-peer-deps

# Install additional required packages
npm install react-native-svg @supabase/supabase-js react-native-url-polyfill --legacy-peer-deps
```

### 2. Setup Supabase

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free account
   - Create a new project

2. **Get Credentials**
   - Go to **Settings > API**
   - Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - Copy **anon public** key

3. **Configure Environment**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit .env and add:
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Setup Database**
   - Go to **SQL Editor** in Supabase dashboard
   - Copy SQL from `README_SETUP.md` (Database Setup section)
   - Run the SQL to create tables

### 3. Setup GitHub Auto-Commit

```bash
# Initialize git (if not already done)
git init
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/yourusername/snapme-mobile.git

# Test auto-commit
npm run git:auto-commit
```

### 4. Run on Android Device

**Prerequisites:**
- Android device connected via USB
- USB debugging enabled:
  - Settings > About Phone > Tap "Build Number" 7 times
  - Settings > Developer Options > Enable "USB Debugging"
- Device drivers installed (if on Windows)

**Run:**
```bash
# Option 1: Use automated script
chmod +x scripts/setup-android.sh
./scripts/setup-android.sh

# Option 2: Manual
npm run android
```

**If device not detected:**
```bash
# Check ADB connection
adb devices

# Restart ADB
adb kill-server
adb start-server
```

### 5. Verify Installation

1. **Check Logo**: App should show camera icon on splash screen
2. **Check Auth**: Try phone number input (needs Supabase setup)
3. **Check Auto-Commit**: Run `npm run git:auto-commit`
4. **Check Android**: App should install and run on device

## Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try again with legacy peer deps
npm install --legacy-peer-deps
```

### Metro bundler issues
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### Android build fails
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

### Supabase connection fails
- Verify `.env` file exists and has correct credentials
- Check Supabase project is active (not paused)
- Ensure database tables are created

## Next Steps

After installation:
1. ✅ Test authentication flow
2. ✅ Verify logo appears correctly
3. ✅ Test auto-commit script
4. ✅ Build remaining features

## Support

- Check `QUICK_START.md` for quick reference
- Check `README_SETUP.md` for detailed setup
- Check `BUILD_SUMMARY.md` for project status
