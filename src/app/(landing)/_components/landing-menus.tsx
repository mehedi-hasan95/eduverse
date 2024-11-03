"use client";

import { Card } from "@/components/ui/card";
import { LANDING_PAGE_MENUS } from "@/constants/menus";
import { useNavigation } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

type Props = {
  oriantation: "Desktop" | "Mobile";
};
export const LandingMenus = ({ oriantation }: Props) => {
  const { section, onSetSection } = useNavigation();

  switch (oriantation) {
    case "Desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 md:flex hidden rounded-xl">
          <Card className="rounded-2xl bg-themeGray border-themeGray bg-clip-padding  backdrop-filter backdrop-blur-4xl bg-opacity-40 flex gap-1">
            {LANDING_PAGE_MENUS.map((item) => (
              <Link
                href={item.path}
                key={item.id}
                {...(item.section && {
                  onClick: () => onSetSection(item.path),
                })}
                className={cn(
                  "rounded-xl flex gap-2 py-2 px-4 items-center text-white hover:bg-[#09090B]",
                  section === item.path && "bg-[#09090B] border-[#27272A]"
                )}
              >
                <item.icon />
                {item.label}
              </Link>
            ))}
          </Card>
        </Card>
      );
    case "Mobile":
      return (
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="bg-themeGray border-themeGray">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col pt-10">
                {LANDING_PAGE_MENUS.map((item) => (
                  <SheetClose key={item.id} asChild>
                    <Link
                      href={item.path}
                      {...(item.section && {
                        onClick: () => onSetSection(item.path),
                      })}
                      className={cn(
                        "rounded-xl flex gap-2 py-2 px-4 items-center text-white",
                        section === item.path && "bg-[#09090B] border-[#27272A]"
                      )}
                    >
                      <item.icon />
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      );
    default:
      return <></>;
  }
};
