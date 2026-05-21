-- Supabase SQL Schema for Client Academy Sites
-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. PROFILES TABLE
-- Synchronized with Clerk user registration data
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON public.profiles(clerk_user_id);

-- Trigger to auto-update public.profiles updated_at column
CREATE OR REPLACE FUNCTION public.handle_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_update_timestamp();


-- =========================================================================
-- 2. COURSES TABLE
-- Stores details of course catalog offerings
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'course-1' matching static list
    slug VARCHAR(255) UNIQUE NOT NULL,      -- e.g., 'full-stack-web-development'
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,          -- Runtime program pricing is handled separately in app config
    duration VARCHAR(100),
    level VARCHAR(100),
    mode VARCHAR(100),
    certificate BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_course_id ON public.courses(course_id);


-- =========================================================================
-- 3. FAVORITES TABLE
-- Tracks course items bookmarked / saved by users
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    course_slug VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Ensure user cannot favorite the same course multiple times
    CONSTRAINT unique_user_course_favorite UNIQUE (clerk_user_id, course_slug)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_slug ON public.favorites(clerk_user_id, course_slug);


-- =========================================================================
-- 4. ENROLLMENTS TABLE
-- Tracks active user registrations in academy courses
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    course_id VARCHAR(255) NOT NULL,       -- matches course_id/slug mapping
    course_slug VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Ensure user cannot register twice for the same course slug
    CONSTRAINT unique_user_course_enrollment UNIQUE (clerk_user_id, course_slug)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON public.enrollments(clerk_user_id, course_slug);


-- =========================================================================
-- 5. PAYMENTS TABLE
-- Tracks payment intent, Razorpay order IDs, and captures
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    course_id VARCHAR(255) NOT NULL,
    razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(255) UNIQUE,
    razorpay_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL,         -- Amount stored in Rupees
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'captured', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);


-- =========================================================================
-- POPULATE STARTER DATA FOR COURSES
-- =========================================================================
INSERT INTO public.courses (course_id, slug, title, category, price, duration, level, mode, certificate, status)
VALUES
('course-1', 'full-stack-web-development', 'Full Stack Web Development', 'Technology', 0.00, '6 Months', 'Beginner to Advanced', 'Online Live', true, 'active'),
('course-2', 'advanced-data-science-ai', 'Advanced Data Science & AI', 'Data', 0.00, '8 Months', 'Intermediate', 'Hybrid', true, 'active'),
('course-3', 'ui-ux-product-design', 'UI/UX Product Design Masterclass', 'Design', 0.00, '4 Months', 'Beginner', 'Online Recorded', true, 'active'),
('course-4', 'cloud-computing-devops', 'Cloud Computing & DevOps', 'Infrastructure', 0.00, '5 Months', 'Intermediate', 'Online Live', true, 'active')
ON CONFLICT (course_id) DO UPDATE
SET price = EXCLUDED.price,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    slug = EXCLUDED.slug;

-- =========================================================================
-- 6. STUDENT REGISTRATIONS TABLE
-- Stores full multi-section registration form for students
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.student_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(50),
    parent_guardian_name VARCHAR(255),
    mobile_number VARCHAR(50),
    whatsapp_number VARCHAR(50),
    permanent_address TEXT,
    city VARCHAR(255),
    state VARCHAR(255),
    pin_code VARCHAR(20),
    university_name VARCHAR(255),
    college_name VARCHAR(255),
    degree VARCHAR(255),
    department_stream VARCHAR(255),
    class_semester VARCHAR(255),
    academic_session VARCHAR(255),
    major_subject VARCHAR(255),
    university_roll_number VARCHAR(255),
    university_registration_number VARCHAR(255),
    course_program VARCHAR(255),
    branch_specialization VARCHAR(255),
    cgpa_percentage VARCHAR(50),
    internship_programs JSONB,
    first_preference VARCHAR(255),
    preferred_mode VARCHAR(50),
    preferred_time_slot VARCHAR(255),
    laptop_device_availability VARCHAR(10),
    internet_availability VARCHAR(10),
    previous_internship TEXT,
    skills_to_learn TEXT,
    why_join TEXT,
    how_did_you_hear VARCHAR(255),
    referral_code VARCHAR(50),
    emergency_contact_name VARCHAR(255),
    emergency_contact_number VARCHAR(50),
    emergency_contact_relationship VARCHAR(100),
    id_card_link TEXT,
    resume_link TEXT,
    photo_link TEXT,
    declaration_consent BOOLEAN DEFAULT FALSE,
    terms_agreed BOOLEAN DEFAULT FALSE,
    registration_completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_student_registrations_clerk_user_id ON public.student_registrations(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_student_registrations_email ON public.student_registrations(email);
CREATE INDEX IF NOT EXISTS idx_student_registrations_mobile ON public.student_registrations(mobile_number);

-- Trigger to auto-update student_registrations updated_at column
CREATE OR REPLACE TRIGGER trigger_update_student_registrations_updated_at
    BEFORE UPDATE ON public.student_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_update_timestamp();

-- =========================================================================
-- POPULATE SUMMER INTERNSHIP PROGRAMS 2026
-- =========================================================================
INSERT INTO public.courses (course_id, slug, title, category, price, duration, level, mode, certificate, status)
VALUES
('program-1', 'computer-science-it-internship', 'Computer Science & IT Internship', 'Technology', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-2', 'robotics-iot-ros-internship', 'Robotics, IoT & ROS Internship', 'Technology', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-3', 'graphic-design-content-creation-internship', 'Graphic Design & Content Creation Internship', 'Design', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-4', 'digital-literacy-computer-skills-internship', 'Digital Literacy & Computer Skills Internship', 'Technology', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-5', 'accounting-tally-internship', 'Accounting & Tally Internship', 'Business', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-6', 'financial-literacy-personal-finance-internship', 'Financial Literacy & Personal Finance Internship', 'Finance', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-7', 'entrepreneurship-startup-development-internship', 'Entrepreneurship & Startup Development Internship', 'Business', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-8', 'communication-skills-personality-development-internship', 'Communication Skills & Personality Development Internship', 'Soft Skills', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-9', 'teaching-online-tutoring-internship', 'Teaching & Online Tutoring Internship', 'Education', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-10', 'agricultural-innovation-entrepreneurship-internship', 'Agricultural Innovation & Entrepreneurship Internship', 'Agriculture', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-11', 'journalism-mass-communication-internship', 'Journalism & Mass Communication Internship', 'Media', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active'),
('program-12', 'mathematics-statistics-internship', 'Mathematics & Statistics Internship', 'Science', 0.00, '4 to 8 Weeks', 'Beginner to Advanced', 'Flexible', true, 'active')
ON CONFLICT (course_id) DO UPDATE
SET price = EXCLUDED.price,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    slug = EXCLUDED.slug,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode;

-- =========================================================================
-- ADDITIVE UPDATE: OPTIONAL COLLEGE TEXT FOR REGISTRATION FALLBACKS
-- =========================================================================
ALTER TABLE IF EXISTS public.student_registrations
ADD COLUMN IF NOT EXISTS other_college_name TEXT;
