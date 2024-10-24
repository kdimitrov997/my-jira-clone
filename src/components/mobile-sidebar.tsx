"use client";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const MobileSidebar = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button>

        </Button>
      </SheetTrigger>
    </Sheet>
  );
};