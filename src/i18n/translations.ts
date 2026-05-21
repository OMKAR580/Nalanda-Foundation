export type Language = "en" | "hi";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "nalanda_language";
export const LANGUAGE_COOKIE_NAME = "nalanda_language";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const englishMessages = {
  common: {
    dashboard: "Dashboard",
    goToDashboard: "Go to Dashboard",
    goToStudentDashboard: "Go to Student Dashboard",
    completeRegistration: "Complete Registration",
    explorePrograms: "Explore Programs",
    browsePrograms: "Browse Programs",
    browseMorePrograms: "Browse More Programs",
    browseAllPrograms: "Browse All 12 Programs",
    exploreOtherStreams: "Explore Other Streams",
    register: "Register",
    signIn: "Sign In",
    viewDetails: "View Details",
    viewDetailsAndEnroll: "View Details & Enroll",
    enrollNow: "Enroll Now",
    enrollAndPayNow: "Enroll & Pay Now",
    processing: "Processing...",
    retry: "Retry",
    backToSignIn: "Back to Sign In",
    loading: "Loading...",
    success: "Success",
    validationError: "Validation Error",
    previousSection: "Previous Section",
    nextSection: "Next Section",
    verified: "Verified",
    saveFortyPercent: "Save 40%",
  },
  brand: {
    learningPortal: "Learning Portal",
  },
  nav: {
    home: "Home",
    about: "About Us",
    programs: "Programs & Internships",
    services: "Services",
    certification: "Certification",
    contact: "Contact",
    languageLabel: "Language",
    english: "EN",
    hindi: "हिंदी",
  },
  footer: {
    description:
      "An ancient academic legacy meets modern innovation. Explore 12 premium skill-based learning and certification programs, gain verified credentials, and accelerate your career pathway.",
    quickLinksTitle: "Quick Links",
    admissionsHelpTitle: "Admissions Help",
    about: "About Us",
    programs: "Programs & Internships",
    services: "Our Services",
    certification: "Certification",
    studentDashboard: "Student Dashboard",
    contactAdmissions: "Contact Admissions",
    whatsappGroup: "WhatsApp Group",
    email: "Email",
    phone: "Phone",
    rightsReserved: "All rights reserved.",
    initiative: "Heritage Academic Initiative",
  },
  hero: {
    visualBadges: [
      "Verified Learning",
      "Certificate Support",
      "₹599 Fee",
      "Career Skills",
    ],
    copyBadges: [
      "Heritage-Led Career Learning",
      "Verified Programs",
      "Certificate Support",
      "₹599 Fee",
    ],
    titlePrefix: "Ancient Wisdom,",
    typewriterWords: [
      "Modern Career Skills",
      "Practical Learning",
      "Verified Certifications",
      "Future-Ready Growth",
    ],
    subtitle:
      "Explore premium certification and internship programs designed to help students build practical industry skills, confidence, and career-ready portfolios under the Nalanda Foundation legacy.",
    whatsappCta: "Join our WhatsApp community for quick updates",
  },
  testimonials: {
    badge: "Student Success",
    heading: "What Our Learners Say",
    subtitle:
      "Stories from students building practical skills, confidence, and career-ready portfolios.",
    dotAriaPrefix: "Go to testimonial",
    previousAria: "Previous testimonial",
    nextAria: "Next testimonial",
  },
  gallery: {
    badge: "Learning Gallery",
    heading: "Explore Nalanda Cohorts In Action",
    subtitle:
      "A glimpse into workshops, mentorship discussions, student learning cohorts, certification moments, and practical projects.",
  },
  home: {
    bridge: {
      title: "Bridging Eras of Learning",
      description:
        "We synthesize the holistic learning frameworks of historical Nalanda University with the rigorous project-driven skill demand of today's digital global economies.",
      learningTracks: "Learning Tracks",
      verifiedCertificate: "Verified Certificate",
      expertSupport: "Expert Support",
    },
    about: {
      badge: "Heritage-Led Academy",
      heading: "About Nalanda Foundation",
      subtitle:
        "Ancient learning values synthesized dynamically with modern, career-focused, and project-driven education.",
      missionTitle: "Our Mission",
      missionDescription:
        "To build a comprehensive educational system where young minds acquire practical industry skills, digital literacy, and professional confidence through active, mentor-supported, and project-based learning. We aim to make skill-based career growth accessible to every motivated learner.",
      visionTitle: "Our Vision",
      visionDescription:
        "To nurture future-ready professionals who possess both verified academic credentials and industry-grade portfolios. We envision a community where students bridge the gap between classroom-based abstract theories and real-world execution, powered by the heritage of robust mentoring.",
      whyHeading: "Why Nalanda Foundation?",
      whyItems: [
        {
          title: "Heritage-Led Learning",
          description:
            "Inspired by historical frameworks to provide deep learning, rigorous mentorship, and holistic career outlooks.",
        },
        {
          title: "Practical Skill Development",
          description:
            "Say goodbye to abstract rote-learning. Build production-grade code, actual design projects, and live portfolios.",
        },
        {
          title: "Certification Support",
          description:
            "Receive recognized, blockchain-verifiable digital learning credentials upon successful course track completion.",
        },
        {
          title: "Helpline & Coordinators",
          description:
            "Dedicated WhatsApp groups, student helplines, and cohort support to assist you during every learning module.",
        },
        {
          title: "Affordable Program Access",
          description:
            "Premium, top-tier mentorship programs made extremely accessible today at just ₹599 to empower student demographics.",
        },
        {
          title: "Tailored For Careers",
          description:
            "Every track is built specifically to address current market trends, internships demands, and career-readiness.",
        },
      ],
      valuesBadge: "Our Core Values",
      valuesHeading: "The Pillars We Build Upon",
      values: [
        {
          title: "Knowledge",
          description:
            "Delivering deep, structured, and comprehensive insights rather than simple surface learning.",
        },
        {
          title: "Service",
          description:
            "Committed to guiding every student on their educational journey with responsive, dedicated support.",
        },
        {
          title: "Growth",
          description:
            "Ensuring every cohort member achieves clear, quantifiable development in practical skill sets.",
        },
        {
          title: "Integrity",
          description:
            "Upholding high academic, verification, and mentorship standards across every single track.",
        },
      ],
    },
    supportBanner: {
      badge: "Admissions Support Desk",
      heading: "Join the Official Nalanda WhatsApp Community",
      description:
        "Unlock instant support! Connect with batch coordinators, clear admission queries, secure slot reminders, and receive course calendar updates before learning models go live.",
      button: "Join Official Group Now",
    },
    features: {
      badge: "Premium Features",
      heading: "A Transformed Educational Paradigm",
      subtitle:
        "Acquire future-ready technical skills built on an enduring legacy of academic depth, mentorship integrity, and certification weight.",
      items: [
        {
          title: "Pedagogic Excellence",
          description:
            "Curriculums mapped dynamically by seasoned educational directors to bridge the gap between abstract textbook theories and production-grade code.",
        },
        {
          title: "Verified Credentials",
          description:
            "Every successfully completed course stream automatically triggers a secure, blockchain-verifiable digital credential link to validate your portfolio.",
        },
        {
          title: "Interactive Support",
          description:
            "Unlock access to cohort leaders and core technical support coordinates on WhatsApp instantly upon starting your registration setup.",
        },
        {
          title: "Subsidized Pricing",
          description:
            "Get full access to live lecture credentials, codebases, and templates for just ₹599 (crossed out from ₹999) as a student stimulus effort today.",
        },
      ],
    },
    programs: {
      badge: "Featured Programs",
      heading: "Explore 12 Skill-Based Internship & Certification Programs",
      subtitle:
        "Enroll in premium tracks designed to help students build practical skills, work under live mentors, and secure high-value resume portfolios.",
      offer: "40% OFF",
      browseAll: "Browse All 12 Programs",
    },
    services: {
      badge: "Our Learning Ecosystem",
      heading: "Our Learning Services",
      subtitle:
        "Structured programs, mentorship guidance, blockchain-verifiable certification support, and practical career pathway building.",
      items: [
        {
          title: "Skill-Based Internship Programs",
          description:
            "Structured, flexible, and fully digital internships built specifically around in-demand tracks.",
        },
        {
          title: "Certification Support",
          description:
            "Get secure, verifiable, and shareable digital certificate credentials directly linked to your profile.",
        },
        {
          title: "Project-Based Learning",
          description:
            "Focus on creating end-to-end, production-ready systems that demonstrate hands-on mastery.",
        },
        {
          title: "Mentorship & Guidance",
          description:
            "Access structured curriculum direction, active guidelines, and live coordinator interactions.",
        },
        {
          title: "WhatsApp Community Support",
          description:
            "Join real-time cohort channels to connect with advisors, peers, and track organizers instantly.",
        },
        {
          title: "Career Portfolio Building",
          description:
            "Convert abstract concepts into tangible Github repositories, Figma canvases, and case studies.",
        },
        {
          title: "Digital Literacy Training",
          description:
            "Empowering non-technical demographics with essential computational, word-processing, and internet tools.",
        },
        {
          title: "Affordable Student Programs",
          description:
            "Ensuring top-quality education does not demand massive financial strain through highly subsidized fees (₹599).",
        },
      ],
      workflowBadge: "Workflow Guide",
      workflowHeading: "How It Works",
      workflowSubtitle:
        "Follow our simple, highly structured process to kickstart your practical learning.",
      workflowSteps: [
        {
          step: "01",
          title: "Register",
          description:
            "Complete your basic profile details safely in just 2 minutes.",
        },
        {
          step: "02",
          title: "Choose Programs",
          description:
            "Select from our 12 featured skill tracks built for student growth.",
        },
        {
          step: "03",
          title: "Pay Fee",
          description:
            "Process the highly subsidized student fee (₹599) via secure Razorpay.",
        },
        {
          step: "04",
          title: "Join WhatsApp Group",
          description:
            "Gain instant entry into active academic coordinator channels.",
        },
        {
          step: "05",
          title: "Learn & Build",
          description:
            "Access robust templates, build portfolios, and clear doubts.",
        },
        {
          step: "06",
          title: "Get Certificate Support",
          description:
            "Claim your verified completion credentials directly.",
        },
      ],
    },
    certification: {
      badge: "Verified Credentials",
      heading: "Certification Highlights",
      subtitle:
        "Complete structured programs and build verified learning credentials for your academic and career profile.",
      items: [
        {
          title: "Verified Program Completion",
          description:
            "Every certificate triggers a secure, blockchain-verifiable credential link that anyone can open to confirm your participation details.",
        },
        {
          title: "Skill Track Recognition",
          description:
            "Get certified across 12 dynamic tracks spanning IT, Computer Sciences, Graphic Design, content creation, robotics, and digital literacy.",
        },
        {
          title: "Portfolio Support",
          description:
            "We focus on real outputs. Your certificate reflects hands-on milestones, code repositories, or design files rather than simple theory tests.",
        },
        {
          title: "Resume Value",
          description:
            "Boost your employment credentials! Add structured, verified training items from Nalanda Foundation directly onto your resume and LinkedIn.",
        },
        {
          title: "Community Learning Proof",
          description:
            "Validate active cohort engagement, peer collaboration milestones, and interactive helpline support interactions.",
        },
        {
          title: "Practical Project Exposure",
          description:
            "Certification proof showing you completed end-to-end, production-grade templates and solved active industry problems.",
        },
      ],
      pipelineBadge: "Verification Pipeline",
      pipelineHeading: "The Verification Journey",
      pipelineSubtitle:
        "Follow this structured sequence to complete training modules and claim verified status.",
      pipelineSteps: [
        {
          step: "01",
          title: "Register & Profile Setup",
          description:
            "Create your student account securely to initialize your records in the Nalanda Database.",
        },
        {
          step: "02",
          title: "Enroll in Program Track",
          description:
            "Enroll in your preferred skill specialization track at the highly subsidized student fee (₹599).",
        },
        {
          step: "03",
          title: "Complete Learning Activities",
          description:
            "Engage with guided curriculum modules, explore code templates, and utilize coordinator support channels.",
        },
        {
          step: "04",
          title: "Submit Assigned Projects",
          description:
            "Build and submit your practical track projects to demonstrate hands-on competency.",
        },
        {
          step: "05",
          title: "Claim Certificate Support",
          description:
            "Acquire your digital, shareable, and verifiable program completion credentials directly.",
        },
      ],
      announcementTitle: "Important Announcement",
      announcementDescription:
        "Course content, interactive code playgrounds, support tickets, and specific certificate access details will be fully activated inside your student dashboard immediately upon completing enrollment in your chosen track.",
      ctaHeading: "Elevate Your Career Portfolio Today",
      ctaDescription:
        "Join active cohort structures and acquire highly shareable, secure verification credentials for just ₹599.",
    },
    contact: {
      heading: "Official Admissions & Academic Helpline",
      description:
        "Facing difficulties during registration, payments validation, or have generic learning batch queries? Reach our team directly for instant guidance.",
      phoneLabel: "Helpline Phone",
      emailLabel: "Helpline Email",
    },
  },
  programsPage: {
    badge: "Nalanda Foundation Programs & Certifications",
    heading: "Internship Streams & Programs",
    subtitle:
      "Revive the academic standard of India's golden heritage. Select from our 12 premium multidisciplinary training paths. Each curriculum includes verified certifications, hands-on projects, and real-time mentor guidance.",
    flexibleMode: "Flexible Mode",
    certificate: "Verified Internship Certificate",
  },
  programDetail: {
    backToPrograms: "Back to Programs",
    streamSuffix: "Stream",
    duration: "Program Duration",
    internshipMode: "Internship Mode",
    flexible: "Flexible",
    skillLevel: "Skill Level",
    certification: "Certification",
    skillsHeading: "Key Skills You Will Acquire",
    portalStatusTitle: "Academic Portal Status",
    importantNoticeLabel: "Important Notice:",
    portalStatusDescription:
      "Course content will be uploaded soon after enrollment. Your official dashboard will display live lecture coordinates, tasks lists, project codebases, and student groups immediately upon concluding registration rounds.",
    totalContribution: "Total Program Contribution",
    includedNote: "* Interactive verified certification & GST included.",
    paymentSecurityOne: "Safe test-mode payment processed through Razorpay.",
    paymentSecurityTwo:
      "Academic access logged automatically into your student dashboard.",
    helpTitle: "Need Admission Help?",
    helpDescription:
      "Call our admissions office at {phone} if you face billing or enrollment validation problems.",
    checkoutRetryMessage:
      "We could not verify your registration right now. Please retry in a moment.",
    checkoutErrorMessage:
      "We could not verify your registration or start checkout right now. Please retry in a moment.",
  },
  registrationGate: {
    checkingTitle: "Checking registration...",
    checkingDescription:
      "We are validating your Clerk session and checking whether your registration is already complete.",
    redirectingTitle: "Redirecting...",
    redirectingDescription:
      "You need to sign in before we can show the registration form.",
    errorTitle: "Error loading registration",
    portalBadge: "Nalanda Foundation Learning & Certification Portal",
    heading: "Official Registration Portal",
    description:
      "Please complete all details below carefully. Selected students will receive an official offer letter and enrollment panel on their dashboard.",
    devWarningTitle: "Development Clerk setup warning",
    devWarningDescription:
      "This page uses a verified session-cookie fallback so you can still continue testing the registration flow locally.",
    signedInVerificationPrefix:
      "Your browser says you are signed in, but the app server could not verify that session.",
    signedInVerificationSuffix: "Please sign in again and retry.",
    statusLoadError:
      "We could not load your registration status from Supabase.",
    networkError:
      "We could not load your registration status. Please check your connection and retry.",
  },
  registrationForm: {
    validation: {
      personalRequired: "All fields in Personal Information are required.",
      mobileNumber: "Mobile Number must be exactly 10 digits.",
      email: "Please enter a valid email address.",
      academicRequired: "All fields in Academic Information are required.",
      minimumPrograms:
        "You must select a minimum of 2 internship programs under Internship Preferences.",
      preferencesRequired:
        "Please complete all required fields under Internship Preferences.",
      emergencyRequired: "All fields in Emergency Contact are required.",
      emergencyNumber:
        "Emergency Contact Number must be exactly 10 digits.",
      consent:
        "You must accept the declaration and terms of agreement to proceed.",
    },
    submitSuccess:
      "Registration successfully saved! Redirecting to dashboard...",
    submitFailure: "Failed to submit registration.",
    networkError: "Network error occurred during form submission.",
    tabs: {
      personal: "Personal Information",
      academic: "Academic Profile",
      preferences: "Internship Preferences",
      emergency: "Emergency Contacts",
      consent: "Consents & Documents",
    },
    headers: {
      personal: "1. Personal Information",
      academic: "2. Academic Information",
      preferences: "3. Internship Preferences",
      emergency: "4. Emergency Contact",
      consent: "5. Optional Documents & Declarations",
    },
    personal: {
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "Enter your legal full name",
      dobLabel: "Date of Birth *",
      genderLabel: "Gender *",
      genderPlaceholder: "Select Gender",
      genderMale: "Male",
      genderFemale: "Female",
      genderOther: "Other",
      guardianLabel: "Parent / Guardian Name *",
      guardianPlaceholder: "Enter parent/guardian full name",
      emailLabel: "Email Address *",
      emailPlaceholder: "student@example.com",
      mobileLabel: "Mobile Number (10 digits) *",
      mobilePlaceholder: "e.g. 9876543210",
      whatsappLabel: "WhatsApp Number (Optional)",
      whatsappPlaceholder: "Leave blank if same as mobile",
      addressLabel: "Permanent Address *",
      addressPlaceholder:
        "Enter your complete house number, street, landmark, etc.",
      cityLabel: "City *",
      cityPlaceholder: "e.g. Rajgir",
      stateLabel: "State *",
      statePlaceholder: "e.g. Bihar",
      pinLabel: "Pin Code *",
      pinPlaceholder: "6-digit ZIP code",
    },
    academic: {
      universityLabel: "University Name *",
      universityPlaceholder: "e.g. Patliputra University",
      collegeLabel: "College Name *",
      collegePlaceholder: "e.g. Nalanda College",
      degreeLabel: "Degree *",
      degreePlaceholder: "e.g. B.Tech / B.Sc / BCA",
      departmentLabel: "Department / Stream *",
      departmentPlaceholder: "e.g. Computer Science",
      classLabel: "Class / Semester *",
      classPlaceholder: "e.g. Semester IV / 2nd Year",
      sessionLabel: "Academic Session *",
      sessionPlaceholder: "e.g. 2024-2028",
      majorLabel: "Major Subject (Optional)",
      majorPlaceholder: "e.g. Physics / Software Eng",
      rollLabel: "University Roll Number *",
      rollPlaceholder: "Roll number",
      registrationLabel: "University Registration Number *",
      registrationPlaceholder: "Registration number",
      courseProgramLabel: "Course Program *",
      courseProgramPlaceholder: "e.g. BCA Honours",
      branchLabel: "Branch Specialization (Optional)",
      branchPlaceholder: "e.g. Data Analytics",
      cgpaLabel: "CGPA / Percentage (Optional)",
      cgpaPlaceholder: "e.g. 8.5 CGPA or 82%",
    },
    preferences: {
      selectProgramsLabel:
        "Select Internship Programs (Select Minimum 2) *",
      selectedPrefix: "Currently Selected:",
      selectedSuffix: "programs (need at least 2)",
      firstPreferenceLabel: "First Preference Program *",
      firstPreferencePlaceholder: "Select First Preference",
      firstPreferenceHint:
        "Must be chosen from the selected programs list above.",
      preferredModeLabel: "Preferred Mode *",
      preferredModePlaceholder: "Select Mode",
      modeOnline: "Online",
      modeHybrid: "Hybrid",
      modeOffline: "Offline",
      preferredTimeLabel: "Preferred Time Slot (Optional)",
      preferredTimePlaceholder: "e.g. 10:00 AM - 01:00 PM",
      laptopLabel: "Laptop / Device Availability *",
      availabilityPlaceholder: "Select Availability",
      laptopYes: "Yes (I have a functional laptop)",
      laptopNo: "No (I do not have a personal laptop)",
      internetLabel: "Internet / Wi-Fi Availability *",
      internetYes: "Yes (I have stable Internet)",
      internetNo: "No (I face issues with connectivity)",
      previousInternshipLabel: "Previous Internship Details (Optional)",
      previousInternshipPlaceholder:
        "Organization name, profile, or none",
      skillsLabel: "Skills to Learn (Optional)",
      skillsPlaceholder: "e.g. Next.js, Data Analysis, SEO",
      hearAboutLabel: "How Did You Hear About Us? (Optional)",
      hearAboutPlaceholder: "e.g. Social Media, Friends, College",
      referralLabel: "Referral / Coupon Code (Optional)",
      referralPlaceholder: "Enter referral code",
      whyJoinLabel: "Why do you want to join this program? *",
      whyJoinPlaceholder:
        "Explain your goals, what you wish to achieve, and why you are suitable.",
    },
    emergency: {
      nameLabel: "Emergency Contact Full Name *",
      namePlaceholder: "Enter contact full name",
      numberLabel: "Emergency Contact Number (10 digits) *",
      numberPlaceholder: "e.g. 9876543210",
      relationshipLabel: "Emergency Contact Relationship *",
      relationshipPlaceholder: "e.g. Father / Mother / Sibling / Uncle",
    },
    consent: {
      documentsTitle: "Documents Links (Optional)",
      documentsDescription:
        "You can upload documents to Google Drive, Dropbox, or OneDrive and paste public, shareable links below.",
      idCardLabel: "College ID Card Link",
      resumeLabel: "Resume / CV Link",
      photoLabel: "Passport Photo Link",
      declarationTitle: "Declaration & Terms",
      declarationLabel:
        "Declaration *: I hereby declare that all information submitted in this application is correct, complete, and true to the best of my knowledge. I understand that any false documentation will lead to immediate suspension from the Nalanda Foundation internship panel.",
      termsLabel:
        "Terms Agreement *: I agree to the rules, code of conduct, flexible internship hours, and structural rules set by the academic panel of Nalanda Foundation for the Summer Internship Program 2026.",
      submit: "Submit & Complete Registration",
      submitting: "Submitting Details...",
    },
  },
  dashboard: {
    connectionNoticeTitle: "Database Connection Notice",
    connectionNoticeDescription:
      "We encountered a connection issue while validating your student profile data from Supabase. This could be due to network delays or service updates.",
    instantVerificationTitle: "Instant Verification Steps:",
    instantVerificationSteps: [
      "Refresh your page to establish a new database handshake.",
      "Reach our coordinators via the official WhatsApp Community.",
      "Contact our helpdesk at",
    ],
    retryVerification: "Retry Verification",
    whatsappSupport: "WhatsApp Support",
    verifiedBadge: "Nalanda Learning Panel Verified",
    welcomeBack: "Welcome back",
    welcomeDescription:
      "Your academic profile is successfully logged. Track your enrolled programs, billing transactions, and active courses inside this secure workspace.",
    whatsappHeading: "Join the Official Batch WhatsApp Group",
    whatsappDescription:
      "Stay connected with mentor timetables, project submission links, class coordinates, and batch directories. This is our primary immediate channel.",
    joinWhatsapp: "Join WhatsApp Group",
    onboardingHeading: "Student Onboarding Journey",
    registrationStep: "Profile Registration",
    registrationStepDescription:
      "Your details have been successfully verified.",
    enrollmentStep: "Program Enrollment",
    enrollmentStepDescription:
      "Select and enroll in your primary certification track.",
    batchStep: "Batch Allocation",
    batchStepDescription:
      "Awaiting cohort assignment from administration.",
    enrolledProgramsHeading: "My Enrolled Programs & Courses",
    durationModePrefix: "Duration:",
    modePrefix: "Mode:",
    activeEnrollmentVerified: "Active Enrollment Verified",
    activeStatus: "Active",
    noProgramsTitle: "No Enrolled Programs Yet",
    noProgramsDescription:
      "Your core academic registration details have been verified! Explore the learning catalog to purchase and enroll in your selected internship tracks.",
    exploreAndEnroll: "Explore & Enroll Now",
    recommendedHeading: "Recommended For You",
    topMatch: "Top Match",
    basedOnPreference: "Based on your first preference during registration.",
    noticeboardTitle: "Academic Noticeboard",
    latestUpdate: "Latest Update",
    latestUpdateTitle: "Cohort Allocations in Progress",
    latestUpdateDescription:
      "Course content, live lecture links, and project repositories will activate dynamically upon final batch assignment. Keep an eye on your WhatsApp group!",
    systemUpdate: "System Update",
    systemUpdateTitle: "Portal Upgrades Completed",
    systemUpdateDescription:
      "The registration portal has been upgraded for enhanced security and faster processing times.",
    profileSummaryHeading: "My Verified Profile Summary",
    fullName: "Full Student Name",
    registeredEmail: "Registered Email",
    contactWhatsapp: "Contact & WhatsApp",
    collegeUniversity: "College / University",
    degreeSpecialization: "Degree & Specialization",
    primaryTrack: "Primary Track Preference",
    chosenPrograms: "Chosen Program Preferences",
    academicStatusTitle: "Academic Status",
    registrationVerification: "Registration verification",
    verifiedStatus: "Verified",
    digitalCertificate: "Digital certificate",
    issuedOnCompletion: "Issued on completion",
    programDuration: "Program Duration",
    emergencyTitle: "Emergency Reference",
    contactName: "Contact Name",
    relationship: "Relationship",
    emergencyPhone: "Emergency Phone",
    billingTitle: "Billing & Payments",
    internshipTrackPurchase: "Internship Track Purchase",
    orderPrefix: "Order:",
    capturedStatus: "Captured",
    noTransactions: "No transactions recorded yet.",
    helpDeskTitle: "Academic Help Desk",
    helpDeskDescription:
      "For program swap requests, technical problems, or receipt logs:",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
  paymentSuccess: {
    verifyingTitle: "Verifying Enrollment Status...",
    verifyingDescription:
      "Please wait while we confirm your payment signatures and activate your academic profile in our secure database.",
    paymentVerificationFailed: "Payment Verification Failed",
    paymentVerificationFailedDescription:
      "Although the payment window completed, we could not confirm a valid database enrollment for this program.",
    detailsLabel: "Details",
    helplineTitle: "Helpline Support",
    helplinePrefix:
      "If your bank account was debited, do not worry. Call admissions at",
    helplineMiddle: "or email",
    helplineSuffix: "to manually verify your transaction.",
    noCourseId:
      "No Course/Program ID was provided for verification.",
    activeEnrollmentMissing:
      "We could not find an active database enrollment for this program. Your payment might still be processing or failed.",
    communicationFailed:
      "Failed to communicate with our enrollment confirmation servers.",
    networkVerificationError:
      "A network error occurred while verifying your enrollment status.",
    paymentVerificationError: "Payment verification failed.",
    paymentSuccessful: "Payment Successful!",
    successBadge: "Verified Enrollment Activated",
    successDescription:
      "Thank you for enrolling in Nalanda Foundation! Your payment signature was successfully authenticated. Your student profile now has verified active access to this program track.",
    nextStepsTitle: "What to do next?",
    nextStepOne:
      "Go to your Dashboard to join the official WhatsApp student announcement group.",
    nextStepTwo:
      "Course study contents and task guides will activate as final admissions conclude.",
  },
};

const hindiOverrides: DeepPartial<typeof englishMessages> = {
  common: {
    dashboard: "डैशबोर्ड",
    goToDashboard: "डैशबोर्ड पर जाएं",
    goToStudentDashboard: "स्टूडेंट डैशबोर्ड पर जाएं",
    completeRegistration: "पंजीकरण पूरा करें",
    explorePrograms: "प्रोग्राम देखें",
    browsePrograms: "प्रोग्राम देखें",
    browseMorePrograms: "और प्रोग्राम देखें",
    browseAllPrograms: "सभी 12 प्रोग्राम देखें",
    exploreOtherStreams: "अन्य स्ट्रीम देखें",
    register: "रजिस्टर करें",
    signIn: "साइन इन",
    viewDetails: "विवरण देखें",
    viewDetailsAndEnroll: "विवरण देखें और नामांकन करें",
    enrollNow: "अभी नामांकन करें",
    enrollAndPayNow: "अभी नामांकन करें और भुगतान करें",
    processing: "प्रोसेस हो रहा है...",
    retry: "फिर से प्रयास करें",
    backToSignIn: "साइन इन पर वापस जाएं",
    loading: "लोड हो रहा है...",
    success: "सफल",
    validationError: "जांच त्रुटि",
    previousSection: "पिछला सेक्शन",
    nextSection: "अगला सेक्शन",
    verified: "सत्यापित",
    saveFortyPercent: "40% बचत",
  },
  nav: {
    home: "होम",
    about: "हमारे बारे में",
    programs: "प्रोग्राम और इंटर्नशिप",
    services: "सेवाएं",
    certification: "सर्टिफिकेशन",
    contact: "संपर्क",
    languageLabel: "भाषा",
  },
  footer: {
    description:
      "प्राचीन शैक्षणिक विरासत और आधुनिक नवाचार का संगम। 12 प्रीमियम स्किल-आधारित लर्निंग और सर्टिफिकेशन प्रोग्राम देखें, सत्यापित क्रेडेंशियल्स पाएं और अपने करियर को आगे बढ़ाएं।",
    quickLinksTitle: "त्वरित लिंक",
    admissionsHelpTitle: "एडमिशन सहायता",
    about: "हमारे बारे में",
    programs: "प्रोग्राम और इंटर्नशिप",
    services: "हमारी सेवाएं",
    certification: "सर्टिफिकेशन",
    studentDashboard: "स्टूडेंट डैशबोर्ड",
    contactAdmissions: "एडमिशन से संपर्क",
    whatsappGroup: "व्हाट्सऐप ग्रुप",
    email: "ईमेल",
    phone: "फ़ोन",
    rightsReserved: "सभी अधिकार सुरक्षित।",
    initiative: "हेरिटेज अकादमिक पहल",
  },
  hero: {
    visualBadges: [
      "सत्यापित लर्निंग",
      "सर्टिफिकेट सहायता",
      "₹599 शुल्क",
      "करियर स्किल्स",
    ],
    copyBadges: [
      "विरासत-आधारित करियर लर्निंग",
      "सत्यापित प्रोग्राम",
      "सर्टिफिकेट सहायता",
      "₹599 शुल्क",
    ],
    titlePrefix: "प्राचीन ज्ञान,",
    typewriterWords: [
      "आधुनिक करियर कौशल",
      "व्यावहारिक सीख",
      "सत्यापित सर्टिफिकेशन",
      "भविष्य के लिए तैयार विकास",
    ],
    subtitle:
      "नालंदा फाउंडेशन की विरासत के साथ ऐसे प्रीमियम सर्टिफिकेशन और इंटर्नशिप प्रोग्राम देखें जो छात्रों को व्यावहारिक इंडस्ट्री स्किल्स, आत्मविश्वास और करियर-रेडी पोर्टफोलियो बनाने में मदद करें।",
    whatsappCta: "त्वरित अपडेट के लिए हमारे व्हाट्सऐप समुदाय से जुड़ें",
  },
  testimonials: {
    badge: "स्टूडेंट सफलता",
    heading: "हमारे विद्यार्थियों की राय",
    subtitle:
      "उन छात्रों की कहानियां जो व्यावहारिक कौशल, आत्मविश्वास और करियर-रेडी पोर्टफोलियो बना रहे हैं।",
    dotAriaPrefix: "टेस्टिमोनियल पर जाएं",
    previousAria: "पिछला टेस्टिमोनियल",
    nextAria: "अगला टेस्टिमोनियल",
  },
  gallery: {
    badge: "लर्निंग गैलरी",
    heading: "नालंदा कोहोर्ट्स को एक्शन में देखें",
    subtitle:
      "वर्कशॉप, मेंटरशिप चर्चा, स्टूडेंट लर्निंग कोहोर्ट्स, सर्टिफिकेशन मोमेंट्स और प्रैक्टिकल प्रोजेक्ट्स की एक झलक।",
  },
  home: {
    bridge: {
      title: "सीखने के दो युगों को जोड़ते हुए",
      description:
        "हम ऐतिहासिक नालंदा विश्वविद्यालय की समग्र सीखने की परंपरा को आज की डिजिटल अर्थव्यवस्था की प्रोजेक्ट-आधारित स्किल मांग के साथ जोड़ते हैं।",
      learningTracks: "लर्निंग ट्रैक्स",
      verifiedCertificate: "सत्यापित सर्टिफिकेट",
      expertSupport: "एक्सपर्ट सहायता",
    },
    about: {
      badge: "विरासत-आधारित अकादमी",
      heading: "नालंदा फाउंडेशन के बारे में",
      subtitle:
        "प्राचीन सीखने के मूल्यों को आधुनिक, करियर-केंद्रित और प्रोजेक्ट-आधारित शिक्षा के साथ जोड़ा गया है।",
      missionTitle: "हमारा मिशन",
      missionDescription:
        "ऐसी समग्र शिक्षा व्यवस्था बनाना जहां युवा दिमाग सक्रिय, मेंटर-सहायता प्राप्त और प्रोजेक्ट-आधारित लर्निंग के माध्यम से व्यावहारिक इंडस्ट्री स्किल्स, डिजिटल साक्षरता और प्रोफेशनल आत्मविश्वास हासिल करें। हमारा उद्देश्य स्किल-आधारित करियर विकास को हर प्रेरित छात्र तक पहुंचाना है।",
      visionTitle: "हमारा विज़न",
      visionDescription:
        "ऐसे भविष्य-तैयार प्रोफेशनल्स तैयार करना जिनके पास सत्यापित अकादमिक क्रेडेंशियल्स और इंडस्ट्री-ग्रेड पोर्टफोलियो दोनों हों। हम ऐसी कम्युनिटी की कल्पना करते हैं जहां छात्र क्लासरूम की थ्योरी और वास्तविक कार्यान्वयन के बीच की दूरी को मजबूत मेंटरशिप के साथ पाटें।",
      whyHeading: "नालंदा फाउंडेशन क्यों?",
      whyItems: [
        {
          title: "विरासत-आधारित लर्निंग",
          description:
            "ऐतिहासिक सीखने की परंपराओं से प्रेरित गहरी समझ, मजबूत मेंटरशिप और समग्र करियर दृष्टि।",
        },
        {
          title: "व्यावहारिक स्किल डेवलपमेंट",
          description:
            "सिर्फ रटने वाली पढ़ाई से आगे बढ़ें। प्रोडक्शन-ग्रेड कोड, वास्तविक डिज़ाइन प्रोजेक्ट्स और लाइव पोर्टफोलियो बनाएं।",
        },
        {
          title: "सर्टिफिकेशन सहायता",
          description:
            "कोर्स पूरा करने पर मान्य, सत्यापित और शेयर करने योग्य डिजिटल लर्निंग क्रेडेंशियल्स प्राप्त करें।",
        },
        {
          title: "हेल्पलाइन और कोऑर्डिनेटर्स",
          description:
            "हर लर्निंग मॉड्यूल के दौरान सहायता के लिए समर्पित व्हाट्सऐप ग्रुप, स्टूडेंट हेल्पलाइन और कोहोर्ट सपोर्ट।",
        },
        {
          title: "सुलभ प्रोग्राम एक्सेस",
          description:
            "प्रीमियम मेंटरशिप प्रोग्राम्स को आज सिर्फ ₹599 में अधिक छात्रों के लिए सुलभ बनाया गया है।",
        },
        {
          title: "करियर के लिए तैयार",
          description:
            "हर ट्रैक वर्तमान मार्केट ट्रेंड्स, इंटर्नशिप मांग और करियर-रेडीनेस को ध्यान में रखकर बनाया गया है।",
        },
      ],
      valuesBadge: "हमारे मूल मूल्य",
      valuesHeading: "वे स्तंभ जिन पर हम निर्माण करते हैं",
      values: [
        {
          title: "ज्ञान",
          description:
            "सिर्फ सतही जानकारी नहीं, बल्कि गहरी, संरचित और समग्र समझ देना।",
        },
        {
          title: "सेवा",
          description:
            "हर छात्र की शैक्षणिक यात्रा में संवेदनशील और समर्पित सहायता के साथ मार्गदर्शन करना।",
        },
        {
          title: "विकास",
          description:
            "यह सुनिश्चित करना कि हर छात्र अपने व्यावहारिक कौशल में स्पष्ट प्रगति करे।",
        },
        {
          title: "ईमानदारी",
          description:
            "हर ट्रैक में उच्च अकादमिक, सत्यापन और मेंटरशिप मानकों को बनाए रखना।",
        },
      ],
    },
    supportBanner: {
      badge: "एडमिशन सहायता डेस्क",
      heading: "आधिकारिक नालंदा व्हाट्सऐप कम्युनिटी से जुड़ें",
      description:
        "तुरंत सहायता पाएं। बैच कोऑर्डिनेटर्स से जुड़ें, एडमिशन सवालों का समाधान करें, स्लॉट रिमाइंडर्स पाएं और कोर्स अपडेट्स प्राप्त करें।",
      button: "अभी आधिकारिक ग्रुप जॉइन करें",
    },
    features: {
      badge: "प्रीमियम फीचर्स",
      heading: "एक बदला हुआ शैक्षणिक अनुभव",
      subtitle:
        "स्थायी अकादमिक गहराई, मजबूत मेंटरशिप और सर्टिफिकेशन भरोसे पर आधारित भविष्य-तैयार तकनीकी स्किल्स हासिल करें।",
      items: [
        {
          title: "शैक्षणिक उत्कृष्टता",
          description:
            "अनुभवी अकादमिक डायरेक्टर्स द्वारा तैयार पाठ्यक्रम जो थ्योरी और वास्तविक प्रोडक्शन-ग्रेड कार्य के बीच की दूरी कम करते हैं।",
        },
        {
          title: "सत्यापित क्रेडेंशियल्स",
          description:
            "हर सफल कोर्स पूरा होने पर एक सुरक्षित, सत्यापित डिजिटल क्रेडेंशियल लिंक मिलता है जो आपके पोर्टफोलियो को मजबूत करता है।",
        },
        {
          title: "इंटरएक्टिव सपोर्ट",
          description:
            "रजिस्ट्रेशन शुरू होते ही व्हाट्सऐप पर कोहोर्ट लीडर्स और तकनीकी सहायता तक पहुंच पाएं।",
        },
        {
          title: "सब्सिडाइज़्ड प्राइसिंग",
          description:
            "लाइव लेक्चर, कोडबेस और टेम्पलेट्स तक पूरी पहुंच सिर्फ ₹599 में, जो पहले ₹999 था।",
        },
      ],
    },
    programs: {
      badge: "फीचर्ड प्रोग्राम",
      heading: "12 स्किल-आधारित इंटर्नशिप और सर्टिफिकेशन प्रोग्राम देखें",
      subtitle:
        "ऐसे प्रीमियम ट्रैक्स में नामांकन करें जो छात्रों को व्यावहारिक कौशल, लाइव मेंटर्स के साथ काम और मजबूत रिज्यूमे पोर्टफोलियो बनाने में मदद करें।",
      offer: "40% छूट",
      browseAll: "सभी 12 प्रोग्राम देखें",
    },
    services: {
      badge: "हमारा लर्निंग इकोसिस्टम",
      heading: "हमारी लर्निंग सेवाएं",
      subtitle:
        "संरचित प्रोग्राम, मेंटरशिप मार्गदर्शन, सत्यापित सर्टिफिकेशन सहायता और व्यावहारिक करियर निर्माण।",
      items: [
        {
          title: "स्किल-आधारित इंटर्नशिप प्रोग्राम",
          description:
            "मांग वाली स्किल ट्रैक्स के लिए तैयार किए गए संरचित, फ्लेक्सिबल और पूरी तरह डिजिटल इंटर्नशिप प्रोग्राम।",
        },
        {
          title: "सर्टिफिकेशन सहायता",
          description:
            "आपकी प्रोफाइल से जुड़े सुरक्षित, सत्यापित और शेयर करने योग्य डिजिटल सर्टिफिकेट प्राप्त करें।",
        },
        {
          title: "प्रोजेक्ट-आधारित लर्निंग",
          description:
            "ऐसे एंड-टू-एंड सिस्टम बनाना सीखें जो आपकी वास्तविक पकड़ को दिखाएं।",
        },
        {
          title: "मेंटॉरशिप और मार्गदर्शन",
          description:
            "संरचित पाठ्यक्रम दिशा, सक्रिय गाइडेंस और लाइव कोऑर्डिनेटर सहायता पाएं।",
        },
        {
          title: "व्हाट्सऐप कम्युनिटी सपोर्ट",
          description:
            "एडवाइजर्स, साथियों और ट्रैक आयोजकों से तुरंत जुड़ने के लिए रियल-टाइम कोहोर्ट चैनल्स जॉइन करें।",
        },
        {
          title: "करियर पोर्टफोलियो निर्माण",
          description:
            "सैद्धांतिक विचारों को Github रिपॉजिटरी, Figma कैनवस और केस स्टडीज जैसे ठोस आउटपुट में बदलें।",
        },
        {
          title: "डिजिटल साक्षरता प्रशिक्षण",
          description:
            "गैर-तकनीकी छात्रों को आवश्यक कंप्यूटिंग, डॉक्यूमेंट और इंटरनेट टूल्स से सशक्त बनाना।",
        },
        {
          title: "सस्ती छात्र योजनाएं",
          description:
            "उच्च गुणवत्ता वाली शिक्षा को ₹599 जैसी सब्सिडाइज़्ड फीस के साथ अधिक सुलभ बनाना।",
        },
      ],
      workflowBadge: "वर्कफ़्लो गाइड",
      workflowHeading: "यह कैसे काम करता है",
      workflowSubtitle:
        "अपने व्यावहारिक सीखने की शुरुआत करने के लिए इस सरल और संरचित प्रक्रिया का पालन करें।",
      workflowSteps: [
        {
          step: "01",
          title: "रजिस्टर करें",
          description:
            "सिर्फ 2 मिनट में अपनी बेसिक प्रोफाइल डिटेल्स सुरक्षित रूप से भरें।",
        },
        {
          step: "02",
          title: "प्रोग्राम चुनें",
          description:
            "छात्र विकास के लिए तैयार 12 स्किल ट्रैक्स में से अपने विकल्प चुनें।",
        },
        {
          step: "03",
          title: "फीस भरें",
          description:
            "सुरक्षित Razorpay के माध्यम से ₹599 की छात्र फीस जमा करें।",
        },
        {
          step: "04",
          title: "व्हाट्सऐप ग्रुप जॉइन करें",
          description:
            "एक्टिव अकादमिक कोऑर्डिनेटर चैनल्स में तुरंत जुड़ें।",
        },
        {
          step: "05",
          title: "सीखें और बनाएं",
          description:
            "टेम्पलेट्स एक्सेस करें, पोर्टफोलियो बनाएं और अपने सवाल हल करें।",
        },
        {
          step: "06",
          title: "सर्टिफिकेट सहायता पाएं",
          description:
            "अपना सत्यापित कंप्लीशन क्रेडेंशियल प्राप्त करें।",
        },
      ],
    },
    certification: {
      badge: "सत्यापित क्रेडेंशियल्स",
      heading: "सर्टिफिकेशन हाइलाइट्स",
      subtitle:
        "संरचित प्रोग्राम पूरे करें और अपने अकादमिक व करियर प्रोफाइल के लिए सत्यापित लर्निंग क्रेडेंशियल्स बनाएं।",
      items: [
        {
          title: "सत्यापित प्रोग्राम कंप्लीशन",
          description:
            "हर सर्टिफिकेट एक सुरक्षित और सत्यापित क्रेडेंशियल लिंक देता है, जिसे कोई भी खोलकर आपकी भागीदारी की पुष्टि कर सकता है।",
        },
        {
          title: "स्किल ट्रैक पहचान",
          description:
            "आईटी, कंप्यूटर साइंस, ग्राफिक डिज़ाइन, कंटेंट क्रिएशन, रोबोटिक्स और डिजिटल साक्षरता सहित 12 डायनेमिक ट्रैक्स में सर्टिफाइड हों।",
        },
        {
          title: "पोर्टफोलियो सपोर्ट",
          description:
            "हम वास्तविक आउटपुट पर ध्यान देते हैं। आपका सर्टिफिकेट कोड रिपॉजिटरी, डिज़ाइन फाइल्स और प्रैक्टिकल माइलस्टोन्स को दर्शाता है।",
        },
        {
          title: "रिज्यूमे वैल्यू",
          description:
            "अपने रिज्यूमे और LinkedIn पर नालंदा फाउंडेशन की सत्यापित ट्रेनिंग जोड़कर प्रोफाइल मजबूत करें।",
        },
        {
          title: "कम्युनिटी लर्निंग प्रूफ",
          description:
            "एक्टिव कोहोर्ट एंगेजमेंट, पीयर सहयोग और हेल्पलाइन सपोर्ट इंटरैक्शन को दर्शाएं।",
        },
        {
          title: "प्रैक्टिकल प्रोजेक्ट एक्सपोजर",
          description:
            "ऐसा सर्टिफिकेशन प्रूफ जो दिखाए कि आपने एंड-टू-एंड प्रोडक्शन-ग्रेड प्रोजेक्ट्स पूरे किए हैं।",
        },
      ],
      pipelineBadge: "वेरिफिकेशन पाइपलाइन",
      pipelineHeading: "सत्यापन यात्रा",
      pipelineSubtitle:
        "ट्रेनिंग मॉड्यूल पूरे करने और सत्यापित स्टेटस पाने के लिए इस संरचित क्रम का पालन करें।",
      pipelineSteps: [
        {
          step: "01",
          title: "रजिस्टर करें और प्रोफाइल सेटअप करें",
          description:
            "नालंदा डेटाबेस में अपना रिकॉर्ड शुरू करने के लिए अपना स्टूडेंट अकाउंट सुरक्षित रूप से बनाएं।",
        },
        {
          step: "02",
          title: "प्रोग्राम ट्रैक में नामांकन करें",
          description:
            "अपनी पसंदीदा स्किल स्पेशलाइजेशन ट्रैक में ₹599 की छात्र फीस पर नामांकन करें।",
        },
        {
          step: "03",
          title: "लर्निंग एक्टिविटीज पूरी करें",
          description:
            "गाइडेड मॉड्यूल्स पढ़ें, कोड टेम्पलेट्स देखें और कोऑर्डिनेटर सपोर्ट चैनल्स का उपयोग करें।",
        },
        {
          step: "04",
          title: "असाइन्ड प्रोजेक्ट्स जमा करें",
          description:
            "अपनी व्यावहारिक दक्षता दिखाने के लिए ट्रैक प्रोजेक्ट्स बनाएं और जमा करें।",
        },
        {
          step: "05",
          title: "सर्टिफिकेट सहायता प्राप्त करें",
          description:
            "अपना डिजिटल, शेयर करने योग्य और सत्यापित प्रोग्राम कंप्लीशन क्रेडेंशियल प्राप्त करें।",
        },
      ],
      announcementTitle: "महत्वपूर्ण घोषणा",
      announcementDescription:
        "आपके चुने हुए ट्रैक में नामांकन पूरा होते ही कोर्स कंटेंट, कोड प्लेग्राउंड, सपोर्ट टिकट्स और सर्टिफिकेट एक्सेस की जानकारी आपके डैशबोर्ड में सक्रिय हो जाएगी।",
      ctaHeading: "आज ही अपना करियर पोर्टफोलियो मजबूत करें",
      ctaDescription:
        "एक्टिव कोहोर्ट्स से जुड़ें और सिर्फ ₹599 में सुरक्षित, शेयर करने योग्य सत्यापन क्रेडेंशियल्स पाएं।",
    },
    contact: {
      heading: "आधिकारिक एडमिशन और अकादमिक हेल्पलाइन",
      description:
        "रजिस्ट्रेशन, पेमेंट वैलिडेशन या बैच से जुड़े सवालों में दिक्कत हो रही है? तुरंत मार्गदर्शन के लिए हमारी टीम से संपर्क करें।",
      phoneLabel: "हेल्पलाइन फ़ोन",
      emailLabel: "हेल्पलाइन ईमेल",
    },
  },
  programsPage: {
    badge: "नालंदा फाउंडेशन प्रोग्राम और सर्टिफिकेशन",
    heading: "इंटर्नशिप स्ट्रीम्स और प्रोग्राम",
    subtitle:
      "भारत की स्वर्णिम शैक्षणिक विरासत को आधुनिक स्किल्स के साथ जोड़ें। हमारे 12 प्रीमियम मल्टीडिसिप्लिनरी ट्रेनिंग पाथ्स में से चुनें। हर करिकुलम में सत्यापित सर्टिफिकेशन, प्रैक्टिकल प्रोजेक्ट्स और मेंटर गाइडेंस शामिल है।",
    flexibleMode: "फ्लेक्सिबल मोड",
    certificate: "सत्यापित इंटर्नशिप सर्टिफिकेट",
  },
  programDetail: {
    backToPrograms: "प्रोग्राम्स पर वापस जाएं",
    streamSuffix: "स्ट्रीम",
    duration: "प्रोग्राम अवधि",
    internshipMode: "इंटर्नशिप मोड",
    flexible: "फ्लेक्सिबल",
    skillLevel: "स्किल लेवल",
    certification: "सर्टिफिकेशन",
    skillsHeading: "आप कौन-कौन सी मुख्य स्किल्स सीखेंगे",
    portalStatusTitle: "अकादमिक पोर्टल स्टेटस",
    importantNoticeLabel: "महत्वपूर्ण सूचना:",
    portalStatusDescription:
      "नामांकन के तुरंत बाद कोर्स कंटेंट अपलोड किया जाएगा। रजिस्ट्रेशन राउंड पूरा होने पर आपका डैशबोर्ड लाइव लेक्चर डिटेल्स, टास्क लिस्ट, प्रोजेक्ट कोडबेस और स्टूडेंट ग्रुप्स दिखाएगा।",
    totalContribution: "कुल प्रोग्राम शुल्क",
    includedNote: "* इंटरएक्टिव सत्यापित सर्टिफिकेशन और GST शामिल है।",
    paymentSecurityOne: "Razorpay के माध्यम से सुरक्षित टेस्ट-मोड भुगतान।",
    paymentSecurityTwo:
      "अकादमिक एक्सेस अपने आप आपके स्टूडेंट डैशबोर्ड में लॉग हो जाएगा।",
    helpTitle: "एडमिशन सहायता चाहिए?",
    helpDescription:
      "यदि आपको बिलिंग या नामांकन सत्यापन में समस्या हो तो हमारे एडमिशन ऑफिस को {phone} पर कॉल करें।",
    checkoutRetryMessage:
      "अभी आपका रजिस्ट्रेशन सत्यापित नहीं हो सका। कृपया थोड़ी देर बाद फिर प्रयास करें।",
    checkoutErrorMessage:
      "अभी आपका रजिस्ट्रेशन सत्यापित नहीं हो सका या चेकआउट शुरू नहीं हो पाया। कृपया थोड़ी देर बाद फिर प्रयास करें।",
  },
  registrationGate: {
    checkingTitle: "रजिस्ट्रेशन जांचा जा रहा है...",
    checkingDescription:
      "हम आपके Clerk सेशन को सत्यापित कर रहे हैं और देख रहे हैं कि आपका रजिस्ट्रेशन पहले से पूरा है या नहीं।",
    redirectingTitle: "रीडायरेक्ट किया जा रहा है...",
    redirectingDescription:
      "रजिस्ट्रेशन फॉर्म देखने से पहले आपको साइन इन करना होगा।",
    errorTitle: "रजिस्ट्रेशन लोड करने में त्रुटि",
    portalBadge: "नालंदा फाउंडेशन लर्निंग और सर्टिफिकेशन पोर्टल",
    heading: "आधिकारिक रजिस्ट्रेशन पोर्टल",
    description:
      "कृपया नीचे सभी विवरण ध्यान से भरें। चयनित छात्रों को आधिकारिक ऑफर लेटर और डैशबोर्ड पर एनरोलमेंट पैनल मिलेगा।",
    devWarningTitle: "डेवलपमेंट Clerk सेटअप चेतावनी",
    devWarningDescription:
      "यह पेज सत्यापित session-cookie fallback का उपयोग करता है ताकि आप लोकल टेस्टिंग के दौरान रजिस्ट्रेशन फ्लो जारी रख सकें।",
    signedInVerificationPrefix:
      "आपका ब्राउज़र दिखा रहा है कि आप साइन इन हैं, लेकिन ऐप सर्वर उस सेशन को सत्यापित नहीं कर सका।",
    signedInVerificationSuffix: "कृपया दोबारा साइन इन करें और फिर कोशिश करें।",
    statusLoadError:
      "Supabase से आपका रजिस्ट्रेशन स्टेटस लोड नहीं हो सका।",
    networkError:
      "आपका रजिस्ट्रेशन स्टेटस लोड नहीं हो सका। कृपया अपना कनेक्शन जांचें और फिर कोशिश करें।",
  },
  registrationForm: {
    validation: {
      personalRequired: "पर्सनल इंफॉर्मेशन के सभी फ़ील्ड भरना जरूरी है।",
      mobileNumber: "मोबाइल नंबर ठीक 10 अंकों का होना चाहिए।",
      email: "कृपया सही ईमेल पता दर्ज करें।",
      academicRequired: "अकादमिक इंफॉर्मेशन के सभी फ़ील्ड भरना जरूरी है।",
      minimumPrograms:
        "इंटर्नशिप प्रेफरेंसेस में कम से कम 2 प्रोग्राम चुनना जरूरी है।",
      preferencesRequired:
        "कृपया इंटर्नशिप प्रेफरेंसेस के सभी आवश्यक फ़ील्ड पूरे करें।",
      emergencyRequired: "इमरजेंसी कॉन्टैक्ट के सभी फ़ील्ड भरना जरूरी है।",
      emergencyNumber:
        "इमरजेंसी कॉन्टैक्ट नंबर ठीक 10 अंकों का होना चाहिए।",
      consent:
        "आगे बढ़ने के लिए आपको डिक्लेरेशन और टर्म्स स्वीकार करने होंगे।",
    },
    submitSuccess:
      "रजिस्ट्रेशन सफलतापूर्वक सेव हो गया। डैशबोर्ड पर भेजा जा रहा है...",
    submitFailure: "रजिस्ट्रेशन सबमिट नहीं हो सका।",
    networkError: "फॉर्म सबमिट करते समय नेटवर्क त्रुटि हुई।",
    tabs: {
      personal: "पर्सनल इंफॉर्मेशन",
      academic: "अकादमिक प्रोफाइल",
      preferences: "इंटर्नशिप प्रेफरेंसेस",
      emergency: "इमरजेंसी कॉन्टैक्ट्स",
      consent: "कंसेंट और डॉक्यूमेंट्स",
    },
    headers: {
      personal: "1. पर्सनल इंफॉर्मेशन",
      academic: "2. अकादमिक इंफॉर्मेशन",
      preferences: "3. इंटर्नशिप प्रेफरेंसेस",
      emergency: "4. इमरजेंसी कॉन्टैक्ट",
      consent: "5. वैकल्पिक डॉक्यूमेंट्स और डिक्लेरेशन",
    },
    personal: {
      fullNameLabel: "पूरा नाम *",
      fullNamePlaceholder: "अपना पूरा कानूनी नाम दर्ज करें",
      dobLabel: "जन्मतिथि *",
      genderLabel: "लिंग *",
      genderPlaceholder: "लिंग चुनें",
      genderMale: "पुरुष",
      genderFemale: "महिला",
      genderOther: "अन्य",
      guardianLabel: "माता / पिता / अभिभावक का नाम *",
      guardianPlaceholder: "अभिभावक का पूरा नाम दर्ज करें",
      emailLabel: "ईमेल पता *",
      emailPlaceholder: "student@example.com",
      mobileLabel: "मोबाइल नंबर (10 अंक) *",
      mobilePlaceholder: "जैसे 9876543210",
      whatsappLabel: "व्हाट्सऐप नंबर (वैकल्पिक)",
      whatsappPlaceholder: "यदि मोबाइल जैसा है तो खाली छोड़ें",
      addressLabel: "स्थायी पता *",
      addressPlaceholder:
        "घर नंबर, गली, लैंडमार्क आदि सहित पूरा पता दर्ज करें",
      cityLabel: "शहर *",
      cityPlaceholder: "जैसे राजगीर",
      stateLabel: "राज्य *",
      statePlaceholder: "जैसे बिहार",
      pinLabel: "पिन कोड *",
      pinPlaceholder: "6 अंकों का पिन कोड",
    },
    academic: {
      universityLabel: "विश्वविद्यालय का नाम *",
      universityPlaceholder: "जैसे पाटलिपुत्र यूनिवर्सिटी",
      collegeLabel: "कॉलेज का नाम *",
      collegePlaceholder: "जैसे नालंदा कॉलेज",
      degreeLabel: "डिग्री *",
      degreePlaceholder: "जैसे B.Tech / B.Sc / BCA",
      departmentLabel: "डिपार्टमेंट / स्ट्रीम *",
      departmentPlaceholder: "जैसे कंप्यूटर साइंस",
      classLabel: "क्लास / सेमेस्टर *",
      classPlaceholder: "जैसे सेमेस्टर IV / 2nd Year",
      sessionLabel: "अकादमिक सेशन *",
      sessionPlaceholder: "जैसे 2024-2028",
      majorLabel: "मुख्य विषय (वैकल्पिक)",
      majorPlaceholder: "जैसे Physics / Software Eng",
      rollLabel: "यूनिवर्सिटी रोल नंबर *",
      rollPlaceholder: "रोल नंबर",
      registrationLabel: "यूनिवर्सिटी रजिस्ट्रेशन नंबर *",
      registrationPlaceholder: "रजिस्ट्रेशन नंबर",
      courseProgramLabel: "कोर्स प्रोग्राम *",
      courseProgramPlaceholder: "जैसे BCA Honours",
      branchLabel: "ब्रांच स्पेशलाइजेशन (वैकल्पिक)",
      branchPlaceholder: "जैसे Data Analytics",
      cgpaLabel: "CGPA / प्रतिशत (वैकल्पिक)",
      cgpaPlaceholder: "जैसे 8.5 CGPA या 82%",
    },
    preferences: {
      selectProgramsLabel: "इंटर्नशिप प्रोग्राम चुनें (कम से कम 2) *",
      selectedPrefix: "अभी चुने गए:",
      selectedSuffix: "प्रोग्राम (कम से कम 2 जरूरी)",
      firstPreferenceLabel: "पहला पसंदीदा प्रोग्राम *",
      firstPreferencePlaceholder: "पहली पसंद चुनें",
      firstPreferenceHint:
        "यह ऊपर चुने गए प्रोग्राम्स की सूची में से होना चाहिए।",
      preferredModeLabel: "पसंदीदा मोड *",
      preferredModePlaceholder: "मोड चुनें",
      modeOnline: "ऑनलाइन",
      modeHybrid: "हाइब्रिड",
      modeOffline: "ऑफलाइन",
      preferredTimeLabel: "पसंदीदा टाइम स्लॉट (वैकल्पिक)",
      preferredTimePlaceholder: "जैसे 10:00 AM - 01:00 PM",
      laptopLabel: "लैपटॉप / डिवाइस उपलब्धता *",
      availabilityPlaceholder: "उपलब्धता चुनें",
      laptopYes: "हाँ (मेरे पास कार्यशील लैपटॉप है)",
      laptopNo: "नहीं (मेरे पास निजी लैपटॉप नहीं है)",
      internetLabel: "इंटरनेट / Wi‑Fi उपलब्धता *",
      internetYes: "हाँ (मेरे पास स्थिर इंटरनेट है)",
      internetNo: "नहीं (कनेक्टिविटी में दिक्कत होती है)",
      previousInternshipLabel: "पिछली इंटर्नशिप डिटेल्स (वैकल्पिक)",
      previousInternshipPlaceholder: "संस्था का नाम, प्रोफाइल या none",
      skillsLabel: "सीखना चाहते हैं स्किल्स (वैकल्पिक)",
      skillsPlaceholder: "जैसे Next.js, Data Analysis, SEO",
      hearAboutLabel: "आपने हमारे बारे में कहाँ से सुना? (वैकल्पिक)",
      hearAboutPlaceholder: "जैसे Social Media, Friends, College",
      referralLabel: "रेफरल / कूपन कोड (वैकल्पिक)",
      referralPlaceholder: "रेफरल कोड दर्ज करें",
      whyJoinLabel: "आप इस प्रोग्राम में क्यों जुड़ना चाहते हैं? *",
      whyJoinPlaceholder:
        "अपने लक्ष्य, आप क्या हासिल करना चाहते हैं और आप क्यों उपयुक्त हैं, यह बताएं।",
    },
    emergency: {
      nameLabel: "इमरजेंसी कॉन्टैक्ट का पूरा नाम *",
      namePlaceholder: "कॉन्टैक्ट का पूरा नाम दर्ज करें",
      numberLabel: "इमरजेंसी कॉन्टैक्ट नंबर (10 अंक) *",
      numberPlaceholder: "जैसे 9876543210",
      relationshipLabel: "इमरजेंसी कॉन्टैक्ट रिश्ता *",
      relationshipPlaceholder: "जैसे पिता / माता / भाई / चाचा",
    },
    consent: {
      documentsTitle: "डॉक्यूमेंट लिंक (वैकल्पिक)",
      documentsDescription:
        "आप दस्तावेज़ Google Drive, Dropbox या OneDrive पर अपलोड करके उनके public shareable links यहां पेस्ट कर सकते हैं।",
      idCardLabel: "कॉलेज आईडी कार्ड लिंक",
      resumeLabel: "रिज्यूमे / CV लिंक",
      photoLabel: "पासपोर्ट फोटो लिंक",
      declarationTitle: "डिक्लेरेशन और टर्म्स",
      declarationLabel:
        "डिक्लेरेशन *: मैं घोषणा करता/करती हूँ कि इस आवेदन में दी गई सभी जानकारी मेरी जानकारी के अनुसार सही, पूर्ण और सत्य है। गलत दस्तावेज़ पाए जाने पर नालंदा फाउंडेशन इंटर्नशिप पैनल से तत्काल निलंबन हो सकता है।",
      termsLabel:
        "टर्म्स एग्रीमेंट *: मैं Summer Internship Program 2026 के लिए नालंदा फाउंडेशन की अकादमिक पैनल द्वारा तय नियमों, आचार संहिता, फ्लेक्सिबल इंटर्नशिप घंटों और संरचनात्मक नियमों से सहमत हूँ।",
      submit: "सबमिट करें और रजिस्ट्रेशन पूरा करें",
      submitting: "विवरण सबमिट हो रहे हैं...",
    },
  },
  dashboard: {
    connectionNoticeTitle: "डेटाबेस कनेक्शन सूचना",
    connectionNoticeDescription:
      "Supabase से आपकी स्टूडेंट प्रोफाइल जानकारी सत्यापित करते समय कनेक्शन समस्या आई। यह नेटवर्क देरी या सेवा अपडेट के कारण हो सकता है।",
    instantVerificationTitle: "तुरंत जांच के स्टेप्स:",
    instantVerificationSteps: [
      "नया डेटाबेस हैंडशेक बनाने के लिए पेज रीफ्रेश करें।",
      "आधिकारिक व्हाट्सऐप कम्युनिटी के जरिए हमारे कोऑर्डिनेटर्स से संपर्क करें।",
      "हमारी हेल्पडेस्क से संपर्क करें:",
    ],
    retryVerification: "दोबारा जांचें",
    whatsappSupport: "व्हाट्सऐप सहायता",
    verifiedBadge: "नालंदा लर्निंग पैनल सत्यापित",
    welcomeBack: "वापसी पर स्वागत है",
    welcomeDescription:
      "आपकी अकादमिक प्रोफाइल सफलतापूर्वक दर्ज हो गई है। इस सुरक्षित स्पेस में अपने नामांकित प्रोग्राम, भुगतान और सक्रिय कोर्स ट्रैक करें।",
    whatsappHeading: "आधिकारिक बैच व्हाट्सऐप ग्रुप से जुड़ें",
    whatsappDescription:
      "मेंटॉर टाइमटेबल, प्रोजेक्ट सबमिशन लिंक, क्लास कोऑर्डिनेट्स और बैच अपडेट्स से जुड़े रहें। यह हमारा मुख्य त्वरित चैनल है।",
    joinWhatsapp: "व्हाट्सऐप ग्रुप जॉइन करें",
    onboardingHeading: "स्टूडेंट ऑनबोर्डिंग यात्रा",
    registrationStep: "प्रोफाइल रजिस्ट्रेशन",
    registrationStepDescription: "आपके विवरण सफलतापूर्वक सत्यापित हो गए हैं।",
    enrollmentStep: "प्रोग्राम नामांकन",
    enrollmentStepDescription:
      "अपने मुख्य सर्टिफिकेशन ट्रैक का चयन करें और नामांकन करें।",
    batchStep: "बैच आवंटन",
    batchStepDescription: "प्रशासन से कोहोर्ट असाइनमेंट की प्रतीक्षा है।",
    enrolledProgramsHeading: "मेरे नामांकित प्रोग्राम और कोर्स",
    durationModePrefix: "अवधि:",
    modePrefix: "मोड:",
    activeEnrollmentVerified: "सक्रिय नामांकन सत्यापित",
    activeStatus: "सक्रिय",
    noProgramsTitle: "अभी तक कोई नामांकित प्रोग्राम नहीं",
    noProgramsDescription:
      "आपकी मुख्य रजिस्ट्रेशन जानकारी सत्यापित हो चुकी है। अपने चुने हुए ट्रैक्स में नामांकन के लिए लर्निंग कैटलॉग देखें।",
    exploreAndEnroll: "देखें और नामांकन करें",
    recommendedHeading: "आपके लिए सुझाया गया",
    topMatch: "टॉप मैच",
    basedOnPreference: "रजिस्ट्रेशन के दौरान चुनी गई पहली पसंद के आधार पर।",
    noticeboardTitle: "अकादमिक नोटिसबोर्ड",
    latestUpdate: "नवीनतम अपडेट",
    latestUpdateTitle: "कोहोर्ट आवंटन जारी है",
    latestUpdateDescription:
      "अंतिम बैच असाइनमेंट के बाद कोर्स कंटेंट, लाइव लेक्चर लिंक और प्रोजेक्ट रिपॉजिटरी सक्रिय हो जाएंगी। अपने व्हाट्सऐप ग्रुप पर नज़र रखें।",
    systemUpdate: "सिस्टम अपडेट",
    systemUpdateTitle: "पोर्टल अपग्रेड पूरे हुए",
    systemUpdateDescription:
      "रजिस्ट्रेशन पोर्टल को बेहतर सुरक्षा और तेज प्रोसेसिंग के लिए अपडेट किया गया है।",
    profileSummaryHeading: "मेरी सत्यापित प्रोफाइल सारांश",
    fullName: "स्टूडेंट का पूरा नाम",
    registeredEmail: "रजिस्टर्ड ईमेल",
    contactWhatsapp: "कॉन्टैक्ट और व्हाट्सऐप",
    collegeUniversity: "कॉलेज / यूनिवर्सिटी",
    degreeSpecialization: "डिग्री और स्पेशलाइजेशन",
    primaryTrack: "मुख्य ट्रैक पसंद",
    chosenPrograms: "चुने गए प्रोग्राम विकल्प",
    academicStatusTitle: "अकादमिक स्टेटस",
    registrationVerification: "रजिस्ट्रेशन सत्यापन",
    verifiedStatus: "सत्यापित",
    digitalCertificate: "डिजिटल सर्टिफिकेट",
    issuedOnCompletion: "पूरा होने पर जारी होगा",
    programDuration: "प्रोग्राम अवधि",
    emergencyTitle: "इमरजेंसी रेफरेंस",
    contactName: "कॉन्टैक्ट नाम",
    relationship: "रिश्ता",
    emergencyPhone: "इमरजेंसी फ़ोन",
    billingTitle: "बिलिंग और पेमेंट्स",
    internshipTrackPurchase: "इंटर्नशिप ट्रैक खरीद",
    orderPrefix: "ऑर्डर:",
    capturedStatus: "सफल",
    noTransactions: "अभी तक कोई ट्रांज़ैक्शन रिकॉर्ड नहीं है।",
    helpDeskTitle: "अकादमिक हेल्प डेस्क",
    helpDeskDescription:
      "प्रोग्राम बदलाव, तकनीकी समस्याएं या रसीद से जुड़े सवालों के लिए:",
    emailLabel: "ईमेल",
    phoneLabel: "फ़ोन",
  },
  paymentSuccess: {
    verifyingTitle: "नामांकन स्थिति सत्यापित की जा रही है...",
    verifyingDescription:
      "कृपया प्रतीक्षा करें, हम आपके पेमेंट सिग्नेचर की पुष्टि कर रहे हैं और आपकी अकादमिक प्रोफाइल सक्रिय कर रहे हैं।",
    paymentVerificationFailed: "पेमेंट सत्यापन असफल रहा",
    paymentVerificationFailedDescription:
      "भुगतान विंडो पूरी होने के बावजूद हम इस प्रोग्राम के लिए वैध डेटाबेस नामांकन की पुष्टि नहीं कर सके।",
    detailsLabel: "विवरण",
    helplineTitle: "हेल्पलाइन सहायता",
    helplinePrefix:
      "यदि आपके बैंक खाते से राशि कट गई है, चिंता न करें। एडमिशन टीम को",
    helplineMiddle: "पर कॉल करें या",
    helplineSuffix: "पर ईमेल करके अपना ट्रांज़ैक्शन मैन्युअली सत्यापित कराएं।",
    noCourseId:
      "सत्यापन के लिए कोई Course/Program ID उपलब्ध नहीं थी।",
    activeEnrollmentMissing:
      "हमें इस प्रोग्राम के लिए सक्रिय डेटाबेस नामांकन नहीं मिला। आपका भुगतान अभी प्रोसेस में हो सकता है या असफल रहा हो सकता है।",
    communicationFailed:
      "हमारे नामांकन सत्यापन सर्वर से संपर्क नहीं हो सका।",
    networkVerificationError:
      "आपके नामांकन की जांच करते समय नेटवर्क त्रुटि हुई।",
    paymentVerificationError: "पेमेंट सत्यापन असफल रहा।",
    paymentSuccessful: "पेमेंट सफल रहा!",
    successBadge: "सत्यापित नामांकन सक्रिय",
    successDescription:
      "नालंदा फाउंडेशन में नामांकन के लिए धन्यवाद। आपका पेमेंट सिग्नेचर सफलतापूर्वक प्रमाणित हो गया है और अब आपके प्रोफाइल में इस प्रोग्राम का सक्रिय एक्सेस है।",
    nextStepsTitle: "अब आगे क्या करें?",
    nextStepOne:
      "अपने डैशबोर्ड पर जाएं और आधिकारिक स्टूडेंट व्हाट्सऐप अनाउंसमेंट ग्रुप से जुड़ें।",
    nextStepTwo:
      "फाइनल एडमिशन पूरे होते ही कोर्स कंटेंट और टास्क गाइड्स सक्रिय हो जाएंगे।",
  },
};

export type Messages = typeof englishMessages;

function mergeTranslations<T extends Record<string, unknown>>(
  base: T,
  overrides: DeepPartial<T>
): T {
  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(overrides) as Array<keyof T>) {
    const overrideValue = overrides[key];

    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = base[key];

    if (Array.isArray(overrideValue)) {
      result[key as string] = overrideValue;
      continue;
    }

    if (
      overrideValue &&
      typeof overrideValue === "object" &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      result[key as string] = mergeTranslations(
        baseValue as Record<string, unknown>,
        overrideValue as DeepPartial<Record<string, unknown>>
      );
      continue;
    }

    result[key as string] = overrideValue;
  }

  return result as T;
}

export const translations: Record<Language, Messages> = {
  en: englishMessages,
  hi: mergeTranslations(englishMessages, hindiOverrides),
};

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "en" || value === "hi";
}

export function resolveLanguage(value: string | null | undefined): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export function getMessages(language: Language): Messages {
  return translations[language];
}
