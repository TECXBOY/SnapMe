-- SnapMe Mobile App - Supabase Database Setup
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (matches auth.users from Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'cameraman', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  profile_image TEXT,
  booking_history UUID[] DEFAULT '{}',
  orange_money_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cameramen table
CREATE TABLE IF NOT EXISTS public.cameramen (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  brand_name TEXT NOT NULL,
  profile_image TEXT NOT NULL DEFAULT '',
  portfolio TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  service_categories TEXT[] DEFAULT '{}',
  location JSONB,
  availability TEXT NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'busy')),
  rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  price_per_hour NUMERIC,
  orange_money_number TEXT NOT NULL,
  wallet_balance NUMERIC DEFAULT 0 CHECK (wallet_balance >= 0),
  total_earnings NUMERIC DEFAULT 0 CHECK (total_earnings >= 0),
  withdrawal_history UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cameramen ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running script)
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can read all data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

DROP POLICY IF EXISTS "Customers can read own data" ON public.customers;
DROP POLICY IF EXISTS "Customers can read all data" ON public.customers;
DROP POLICY IF EXISTS "Customers can update own data" ON public.customers;
DROP POLICY IF EXISTS "Customers can insert own data" ON public.customers;

DROP POLICY IF EXISTS "Cameramen can read own data" ON public.cameramen;
DROP POLICY IF EXISTS "Cameramen can read all data" ON public.cameramen;
DROP POLICY IF EXISTS "Cameramen can update own data" ON public.cameramen;
DROP POLICY IF EXISTS "Cameramen can insert own data" ON public.cameramen;

-- RLS Policies for users
-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can read all users (for discovery)
CREATE POLICY "Users can read all data" ON public.users
  FOR SELECT USING (true);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for customers
CREATE POLICY "Customers can read own data" ON public.customers
  FOR SELECT USING (auth.uid() = id);

-- Customers can read all customers (for discovery - optional)
CREATE POLICY "Customers can read all data" ON public.customers
  FOR SELECT USING (true);

CREATE POLICY "Customers can update own data" ON public.customers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Customers can insert own data" ON public.customers
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for cameramen
CREATE POLICY "Cameramen can read own data" ON public.cameramen
  FOR SELECT USING (auth.uid() = id);

-- Cameramen profiles are public for discovery
CREATE POLICY "Cameramen can read all data" ON public.cameramen
  FOR SELECT USING (true);

CREATE POLICY "Cameramen can update own data" ON public.cameramen
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Cameramen can insert own data" ON public.cameramen
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cameramen_updated_at BEFORE UPDATE ON public.cameramen
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone_number);
CREATE INDEX IF NOT EXISTS idx_cameramen_status ON public.cameramen(status);
CREATE INDEX IF NOT EXISTS idx_cameramen_availability ON public.cameramen(availability);
CREATE INDEX IF NOT EXISTS idx_cameramen_rating ON public.cameramen(rating DESC);

-- Enable phone authentication in Supabase Auth
-- Note: This needs to be done in Supabase Dashboard > Authentication > Providers > Phone

