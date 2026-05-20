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
