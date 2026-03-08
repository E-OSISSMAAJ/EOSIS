// E-OSIS Type Definitions

export interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface OsisMember {
  id: number;
  name: string;
  position: string;
  division: string;
  class: string;
  photo: string;
  bio?: string;
  skills?: string[];
  achievements?: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  category: "event" | "info" | "penting";
  date: string;
  image?: string;
  isImportant?: boolean;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  division: string;
  status: "planning" | "ongoing" | "completed";
  progress: number;
  icon: string;
  photos?: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
}

export interface Statistic {
  id: number;
  label: string;
  value: number;
  icon: string;
}
