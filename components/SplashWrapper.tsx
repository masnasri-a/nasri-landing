"use client";

import { useState } from "react";
import SplashScreen from "./SplashScreen";

interface SplashWrapperProps {
  children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className={showSplash ? "hidden" : "block"}>{children}</div>
    </>
  );
}
