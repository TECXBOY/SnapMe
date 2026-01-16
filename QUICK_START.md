# SnapMe - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Supabase
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **Settings > API**
4. Copy your:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

5. Create `.env` file:
```bash
cp .env.example .env
```

6. Add to `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Setup Supabase Database
1. Go to **SQL Editor** in Supabase dashboard
2. Run the SQL from `README_SETUP.md` (Database setup section)
3. This creates the `users`, `customers`, and `cameramen` tables

### Step 4: Setup GitHub Auto-Commit (Optional)
```bash
# Initialize git
git init
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/yourusername/snapme-mobile.git

# Test auto-commit
npm run git:auto-commit
```

### Step 5: Run on Android Device

**Prerequisites:**
- Android device connected via USB
- USB debugging enabled (Settings > Developer Options)
- Device drivers installed

**Run:**
```bash
# Option 1: Use setup script
chmod +x scripts/setup-android.sh
./scripts/setup-android.sh

# Option 2: Manual
npm run android
```

## 📱 App Features

✅ **Authentication** - Phone/OTP via Supabase  
✅ **Logo & Splash** - Custom camera icon  
✅ **Auto-Commit** - Automatic GitHub commits  
✅ **Type-Safe** - Full TypeScript support  

## 🎨 App Logo

The app uses a custom camera logo:
- **Component**: `src/components/Logo.tsx`
- **Splash Screen**: Automatically configured
- **Colors**: Coral/Orange bottom, white top, dark gray outline

## 🔄 Auto-Commit to GitHub

The app automatically commits and pushes changes:

**Manual:**
```bash
npm run git:auto-commit
```

**Automatic (via GitHub Actions):**
- Commits run hourly via `.github/workflows/auto-commit.yml`
- Or trigger manually in GitHub Actions tab

## 🐛 Troubleshooting

### Android Device Not Found
```bash
# Check connection
adb devices

# If empty, enable USB debugging on device
# Settings > About Phone > Tap "Build Number" 7 times
# Then: Settings > Developer Options > USB Debugging
```

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache
```

### Build Errors
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

### Supabase Connection Issues
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure database tables are created

## 📚 Next Steps

1. ✅ Supabase authentication configured
2. ✅ Logo and splash screen ready
3. ✅ Auto-commit script working
4. ⏳ Complete booking system
5. ⏳ Add Orange Money integration
6. ⏳ Build remaining features

## 🆘 Need Help?

- Check `README_SETUP.md` for detailed setup
- Check `BUILD_SUMMARY.md` for project status
- Review Supabase docs: https://supabase.com/docs
