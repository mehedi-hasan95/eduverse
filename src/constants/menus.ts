import { BookOpen, CreditCard, Home, LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3,
  FaLaravel,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
type Menus = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  section?: boolean;
};

export const LANDING_PAGE_MENUS: Menus[] = [
  {
    id: "1",
    icon: Home,
    label: "Home",
    path: "/",
    section: true,
  },
  {
    id: "2",
    icon: BookOpen,
    label: "Category",
    path: "#category",
    section: true,
  },
  {
    id: "3",
    icon: CreditCard,
    label: "Price",
    path: "#price",
    section: true,
  },
];

type Category = {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  path: string;
};

export const CATEGORY_MENUS: Category[] = [
  {
    id: "1",
    label: "Next.Js",
    icon: RiNextjsFill,
    path: "next.js",
  },
  {
    id: "2",
    label: "React",
    icon: FaReact,
    path: "react",
  },
  {
    id: "3",
    label: "Tailwind",
    icon: RiTailwindCssFill,
    path: "tailwind",
  },
  {
    id: "4",
    label: "Javascript",
    icon: IoLogoJavascript,
    path: "javascript",
  },
  {
    id: "5",
    label: "Typescript",
    icon: SiTypescript,
    path: "typescript",
  },
  {
    id: "6",
    label: "WordPress",
    icon: FaWordpress,
    path: "wordpress",
  },
  {
    id: "7",
    label: "HTML",
    icon: FaHtml5,
    path: "html",
  },
  {
    id: "8",
    label: "CSS",
    icon: FaCss3,
    path: "css",
  },
  {
    id: "9",
    label: "Laravel",
    icon: FaLaravel,
    path: "laravel",
  },
];
