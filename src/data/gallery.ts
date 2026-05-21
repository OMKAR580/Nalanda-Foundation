export interface GalleryItem {
  id: string;
  title: string;
  category:
    | "Workshops"
    | "Mentorship"
    | "Student Learning"
    | "Certification"
    | "Projects"
    | "Community";
  caption: string;
  imageSrc: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "workshop-session",
    title: "Workshop Session",
    category: "Workshops",
    caption: "Practical sessions guided by mentors.",
    imageSrc: "/gallery/workshop.png",
    alt: "Nalanda workshop session with students in a guided practical class.",
  },
  {
    id: "mentor-guidance",
    title: "Mentor Guidance",
    category: "Mentorship",
    caption: "Expert support for career-focused learning.",
    imageSrc: "/gallery/mentor.png",
    alt: "Nalanda mentorship discussion with mentor guidance for students.",
  },
  {
    id: "digital-learning",
    title: "Digital Learning",
    category: "Student Learning",
    caption: "Build modern skills through guided digital practice.",
    imageSrc: "/gallery/digital-learning.png",
    alt: "Students using laptops during a Nalanda digital learning cohort.",
  },
  {
    id: "certificate-moment",
    title: "Certificate Moment",
    category: "Certification",
    caption: "Celebrate verified learning achievements.",
    imageSrc: "/gallery/certificate.png",
    alt: "Nalanda students celebrating a certificate achievement moment.",
  },
  {
    id: "practical-project",
    title: "Practical Project",
    category: "Projects",
    caption: "Learn by building portfolio-ready work.",
    imageSrc: "/gallery/project.png",
    alt: "Nalanda students building a practical project for their portfolio.",
  },
  {
    id: "community-learning",
    title: "Community Learning",
    category: "Community",
    caption: "Collaborate with peers and mentors.",
    imageSrc: "/gallery/community.png",
    alt: "Nalanda cohort members learning together in a community session.",
  },
];

export const krishanaGalleryItems: GalleryItem[] = [
  {
    id: "krishana-workshop-session",
    title: "Workshop Session",
    category: "Workshops",
    caption: "Practical hands-on training sessions.",
    imageSrc: "/krishana/gallery/workshop-session.png",
    alt: "Krishana workshop session with students in a guided practical class.",
  },
  {
    id: "krishana-mentor-guidance",
    title: "Mentorship Guidance",
    category: "Mentorship",
    caption: "Expert mentorship for career growth.",
    imageSrc: "/krishana/gallery/mentorship-guidance.png",
    alt: "Krishana mentorship discussion with mentor guidance for students.",
  },
  {
    id: "krishana-practical-projects",
    title: "Practical Projects",
    category: "Projects",
    caption: "Build portfolio projects that stand out.",
    imageSrc: "/krishana/gallery/practical-projects.png",
    alt: "Krishana students building a practical project for their portfolio.",
  },
  {
    id: "krishana-student-success",
    title: "Student Success",
    category: "Certification",
    caption: "Celebrating students achieving milestones.",
    imageSrc: "/krishana/gallery/student-success.png",
    alt: "Krishana students celebrating their success and milestones.",
  },
  {
    id: "krishana-digital-learning",
    title: "Digital Learning",
    category: "Student Learning",
    caption: "Access live interactive digital programs.",
    imageSrc: "/krishana/gallery/digital-learning.png",
    alt: "Students learning with laptops during a digital session.",
  },
  {
    id: "krishana-community-learning",
    title: "Community Learning",
    category: "Community",
    caption: "Collaborate and grow with a peer community.",
    imageSrc: "/krishana/gallery/community-learning.png",
    alt: "Krishana cohort members learning together in a community session.",
  },
  {
    id: "krishana-career-growth",
    title: "Career Growth",
    category: "Mentorship",
    caption: "Empowering career paths and skill development.",
    imageSrc: "/krishana/gallery/career-growth.png",
    alt: "Students discussing digital skills and career growth.",
  },
];

