# Supabase Setup Guide for SnapMe

This guide will help you set up Supabase as the authentication and database backend for SnapMe.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: snapme-mobile (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to Sierra Leone (e.g., `eu-west-1` or `us-east-1`)
   - **Pricing Plan**: Free tier is sufficient for MVP

## Step 2: Get API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example` if it exists)
2. Add your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit the `.env` file to Git! It's already in `.gitignore`.

## Step 4: Setup Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL

This will create:
- `users` table (base user data)
- `customers` table (customer-specific data)
- `cameramen` table (cameraman-specific data)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for `updated_at` timestamps

## Step 5: Enable Phone Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Phone** provider
3. Enable it
4. Configure settings:
   - **Enable phone provider**: ON
   - **Confirm phone**: ON (requires OTP verification)
   - **Phone OTP Expiry**: 60 seconds (default is fine)
   - **Enable SMS provider**: Twilio (default, requires Twilio setup) OR use test mode

### For Development/Testing (Twilio Alternative)

If you don't have Twilio set up yet, you can:

1. Use Supabase's test mode (limited functionality)
2. Set up Twilio for SMS:
   - Go to **Project Settings** → **Auth** → **SMS Auth**
   - Follow Twilio setup instructions
   - Add Twilio credentials

**Note**: For Sierra Leone, you may need to configure a different SMS provider or use Supabase's test OTP (which sends to console/logs).

## Step 6: Verify Setup

1. Check tables were created:
   - Go to **Table Editor**
   - You should see: `users`, `customers`, `cameramen`

2. Check RLS policies:
   - Go to **Authentication** → **Policies**
   - Verify policies exist for each table

3. Test authentication:
   - Try running the app: `npm run android`
   - The app should be able to connect to Supabase

## Step 7: Database Schema Verification

Run this query in SQL Editor to verify everything is set up correctly:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'customers', 'cameramen');

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'customers', 'cameramen');
```

## Troubleshooting

### Issue: "Invalid API key"
- **Solution**: Double-check `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes

### Issue: "Table does not exist"
- **Solution**: Run `supabase-setup.sql` again in SQL Editor

### Issue: "Permission denied" when inserting data
- **Solution**: Check RLS policies are correctly set up
- Verify user is authenticated: `auth.uid()` should return a valid UUID

### Issue: Phone OTP not working
- **Solution**: 
  - Check Twilio is configured (if using SMS)
  - For testing, check Supabase logs in Dashboard → Logs → Auth Logs
  - Verify phone number format: `+232XXXXXXXXX` (Sierra Leone format)

### Issue: TypeScript errors about snake_case vs camelCase
- **Solution**: The auth service now handles mapping automatically
- Database uses `snake_case`, TypeScript uses `camelCase`
- Mapping functions in `authService.ts` handle conversion

## Next Steps

After Supabase is set up:

1. ✅ Test authentication flow (phone + OTP)
2. ✅ Create test customer account
3. ✅ Create test cameraman account
4. ✅ Verify data is being saved correctly
5. ⏳ Continue with booking and payment features

## Security Notes

- **Never commit** `.env` file
- **Use RLS** - Row Level Security protects user data
- **Anon key** is safe to use in client (it's restricted by RLS)
- **Service role key** should NEVER be used in client app (only in server/Cloud Functions)

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Phone Auth Docs: https://supabase.com/docs/guides/auth/phone-login

