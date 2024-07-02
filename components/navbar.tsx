"use client";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16 ">
      <div className="flex items-center">
        {/* <Menu className="block md:hidden" /> */}
        <MobileSidebar />
        <Link href={"/"} className="">
          <h1
            className={cn(
              font.className,
              "hidden md:block text-xl md:text-3xl font-bold text-primary"
            )}
          >
            Companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant={"premium"}>
          Upgrade
          <Sparkles className="size-3 text-white fill-white ml-2" />
        </Button>
        <ModeToggle />
        <div className="size-6">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
