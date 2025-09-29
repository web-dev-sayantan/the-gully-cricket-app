"use client";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex items-center rounded-md border">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        className="hover:outline-hidden hover:outline-transparent"
        onClick={() => setTheme("light")}
      >
        <Sun
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "light" && "text-brand-50",
          )}
        />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        className="rounded-none border-l border-r hover:outline-hidden hover:outline-transparent"
        onClick={() => setTheme("dark")}
      >
        <Moon
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "dark" && "text-brand-50",
          )}
        />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        className="hover:outline-hidden hover:outline-transparent"
        size="icon"
        onClick={() => setTheme("system")}
      >
        <LaptopMinimal
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "system" && "text-brand-50",
          )}
        />
      </Button>
    </div>
  );
}
