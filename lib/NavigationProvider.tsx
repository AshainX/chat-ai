'use client';

import { createContext } from "react";

interface NavigationContextType{
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  closeMobileNav: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

export function NavigationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}

