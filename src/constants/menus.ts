import { BookOpen, CreditCard, Home, LucideIcon } from "lucide-react";

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
