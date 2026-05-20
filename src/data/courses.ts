export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice: number;
  duration: string;
  level: string;
  mode: string;
  certificate: boolean;
  status: 'active' | 'draft';
  image: string;
  skills: string[];
}

export const courses: Course[] = [
  {
    id: "program-1",
    title: "Computer Science & IT Internship",
    slug: "computer-science-it-internship",
    category: "Technology",
    description: "Learn software development, web engineering, coding basics, and advanced database integration.",
    fullDescription: "Dive deep into modern computer applications. This program offers hands-on coding, frontend engineering using React, backend services using Node.js, and solid database foundations. Perfect for aspiring software developers.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL"]
  },
  {
    id: "program-2",
    title: "Robotics, IoT & ROS Internship",
    slug: "robotics-iot-ros-internship",
    category: "Robotics",
    description: "Dive into hardware interfacing, Internet of Things, and Robot Operating System (ROS) fundamentals.",
    fullDescription: "Gain real-world experience in automated engineering. Learn about microcontroller programming, sensor integration, Raspberry Pi boards, Internet of Things (IoT) cloud triggers, and Robot Operating System (ROS) concepts.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    skills: ["IoT", "Arduino", "Raspberry Pi", "ROS", "Python"]
  },
  {
    id: "program-3",
    title: "Graphic Design & Content Creation Internship",
    slug: "graphic-design-content-creation-internship",
    category: "Design",
    description: "Master modern digital design, branding, visual composition, and premium content creation.",
    fullDescription: "Unlock your creative potential. Learn UI design fundamentals, typography, layout, social media branding, video storyboarding, and modern content creation tools like Figma, Illustrator, and editing software.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    skills: ["Figma", "Illustrator", "Branding", "Visual Design", "Editing"]
  },
  {
    id: "program-4",
    title: "Digital Literacy & Computer Skills Internship",
    slug: "digital-literacy-computer-skills-internship",
    category: "Technology",
    description: "Develop critical computer operations, productivity tools usage, and fundamental digital literacy.",
    fullDescription: "Establish a robust foundation for modern corporate ecosystems. Learn standard word processing, spreadsheeting (MS Excel, Google Sheets), email writing etiquette, cloud backups, search algorithms, and cybersecurity basics.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600",
    skills: ["MS Office", "Excel", "Cloud Tools", "Internet Operations", "Digital Security"]
  },
  {
    id: "program-5",
    title: "Accounting & Tally Internship",
    slug: "accounting-tally-internship",
    category: "Business",
    description: "Master standard accounting rules, ledger tracking, financial balance sheets, and Tally ERP.",
    fullDescription: "Gain absolute mastery over professional financial ledger operations. Understand bookkeeping double-entry principles, cashflow calculations, tax compliance processes (GST / TDS), and comprehensive operations in Tally ERP.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    skills: ["Tally ERP", "Bookkeeping", "GST Tax", "Ledger Accounting", "Balance Sheet"]
  },
  {
    id: "program-6",
    title: "Financial Literacy & Personal Finance Internship",
    slug: "financial-literacy-personal-finance-internship",
    category: "Finance",
    description: "Understand personal wealth management, financial indices, investments, and budgeting workflows.",
    fullDescription: "Acquire modern personal finance acumen. Analyze wealth index strategies, inflation impacts, stock market basics, mutual funds, capital gains tax rules, savings protocols, and risk diversification techniques.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600",
    skills: ["Wealth Management", "Tax Planning", "Investment Basics", "Budgeting", "Risk Audits"]
  },
  {
    id: "program-7",
    title: "Entrepreneurship & Startup Development Internship",
    slug: "entrepreneurship-startup-development-internship",
    category: "Business",
    description: "Learn how to pitch ideas, validate market size, design business models, and secure early funding.",
    fullDescription: "Convert your innovative ideas into high-growth commercial models. Focus on Lean Canvas analysis, Minimum Viable Product (MVP) design, customer discovery, pitching mechanics, and angel investment/funding rounds.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    skills: ["Lean Canvas", "Pitch Deck", "Product Validation", "Startup Funding", "Go-To-Market"]
  },
  {
    id: "program-8",
    title: "Communication Skills & Personality Development Internship",
    slug: "communication-skills-personality-development-internship",
    category: "Soft Skills",
    description: "Transform your soft skills, presentation authority, corporate speaking, and interpersonal styles.",
    fullDescription: "Boost your professional charisma. Focus heavily on public speaking, body language syntax, active listening practices, resume copywriting, mock interview tactics, corporate leadership, and team dynamics.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1521791136368-1a86cd27a32d?auto=format&fit=crop&q=80&w=600",
    skills: ["Public Speaking", "Corporate Grooming", "Mock Interviews", "Resume Writing", "Body Language"]
  },
  {
    id: "program-9",
    title: "Teaching & Online Tutoring Internship",
    slug: "teaching-online-tutoring-internship",
    category: "Education",
    description: "Learn pedagogical science, online lecture delivery, structured lesson plans, and teaching tools.",
    fullDescription: "Step into modern academic education roles. Focus on virtual lecturing tools, educational technology, custom curriculum planning, student evaluation analytics, and interactive engagement strategies.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
    skills: ["Pedagogy", "EdTech Tools", "Lesson Planning", "Student Engagement", "Assessments"]
  },
  {
    id: "program-10",
    title: "Agricultural Innovation & Entrepreneurship Internship",
    slug: "agricultural-innovation-entrepreneurship-internship",
    category: "Agriculture",
    description: "Explore modern organic tech, sustainable agricultural innovation, and rural startup models.",
    fullDescription: "Pioneer the next generation of rural agricultural growth. Focus on organic greenhouse designs, hydro/aeroponic models, soil moisture sensors, sustainable supply chain pathways, and modern agro-tech entrepreneurship.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1523741546096-c9eb17250917?auto=format&fit=crop&q=80&w=600",
    skills: ["Agro-Tech", "Hydroponics", "Organic Logistics", "Supply Chain", "Sustainable Startups"]
  },
  {
    id: "program-11",
    title: "Journalism & Mass Communication Internship",
    slug: "journalism-mass-communication-internship",
    category: "Media",
    description: "Master reporting formats, digital editing, mass media research, and storytelling excellence.",
    fullDescription: "Gain practical exposure in reporting under professional digital media metrics. Focus on field news drafting, audio podcast operations, digital video edits, media ethics compliance, and mobile journalism.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600",
    skills: ["News Writing", "Mobile Journalism", "Audio Production", "Media Ethics", "Digital Editing"]
  },
  {
    id: "program-12",
    title: "Mathematics & Statistics Internship",
    slug: "mathematics-statistics-internship",
    category: "Science",
    description: "Apply statistics, probability models, algebra derivations, and analytical data computations.",
    fullDescription: "Bridge pure mathematical theory with production-level analytical solutions. Master regression algorithms, statistical sampling, data visualization in Python, matrix computations, and business probability models.",
    price: 599,
    originalPrice: 999,
    duration: "4 to 8 Weeks",
    level: "Beginner to Advanced",
    mode: "Flexible (Online / Hybrid / Offline)",
    certificate: true,
    status: "active",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600",
    skills: ["Statistical Modeling", "R/Python", "Regression Analysis", "Probability", "Linear Algebra"]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug);
}

export function getCourseFallbackImage(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("tech") || cat.includes("computer") || cat.includes("science")) {
    return "/gallery/digital-learning.png";
  }
  if (cat.includes("robot") || cat.includes("iot") || cat.includes("hardware") || cat.includes("agri")) {
    return "/gallery/project.png";
  }
  if (cat.includes("design") || cat.includes("content") || cat.includes("media") || cat.includes("workshop")) {
    return "/gallery/workshop.png";
  }
  if (cat.includes("finance") || cat.includes("account") || cat.includes("business") || cat.includes("entrepreneur")) {
    return "/gallery/mentor.png";
  }
  if (cat.includes("commun") || cat.includes("teach") || cat.includes("soft") || cat.includes("educ") || cat.includes("peer")) {
    return "/gallery/community.png";
  }
  return "/gallery/certificate.png";
}