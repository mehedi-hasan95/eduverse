"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { SystemMode } from "./system-mode";
import { LightMode } from "./light-mode";
import { DarkMode } from "./dark-mode";
import { TextGradient } from "@/components/common/text-gradient";
import { Headdings } from "@/components/common/headdings";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="grid md:grid-cols-5 gap-10 pt-10">
      <TextGradient>
        <div className="lg:col-span-1">
          <Headdings title="Theme Interface" message="Select the theme" />
        </div>
      </TextGradient>
      <div className="lg:col-span-4">
        <div className="flex gap-10 items-center flex-wrap container mx-auto px-6">
          <div onClick={() => setTheme("system")} className="cursor-pointer">
            <SystemMode />
          </div>
          <div onClick={() => setTheme("light")} className="cursor-pointer">
            <LightMode />
          </div>
          <div onClick={() => setTheme("dark")} className="cursor-pointer">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}
