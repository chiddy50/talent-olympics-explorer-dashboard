/** @format */
"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Coins,
  Currency,
  Settings,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { cn } from "@/lib/utils";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (!isMounted) {
    return null;
  }

  return (
    
    <div className={cn(
      !mobileWidth ? "px-5" : "px-3",
      "relative min-w-[90px] border-r pb-10 pt-24"
    )}>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Account Info",
            href: "/account-info",
            icon: Coins,
            variant: "ghost"
          },
          {
            title: "Transaction",
            href: "/orders",
            icon: Currency,
            variant: "ghost"
          },
          {
            title: "Balances",
            href: "/balances",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}
