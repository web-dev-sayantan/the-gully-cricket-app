"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

function Refresh({ onRefresh }: { onRefresh: (path: string) => void }) {
  const path = usePathname();
  return (
    <Button onClick={() => onRefresh(path)} variant={"ghost"} size={"sm"}>
      <RefreshCcw className="w-4 h-4" />
    </Button>
  );
}

export default Refresh;
