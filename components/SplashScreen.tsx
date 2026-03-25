"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

// Constants moved outside component to avoid re-creating on each render
const FULL_TEXT = "nasri adzlani portfolio";
const TYPING_SPEED = 100; // milliseconds per character
const DISPLAY_DURATION = 5000; // 5 seconds total

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, TYPING_SPEED);

    // Complete the splash screen after 5 seconds
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade-out animation
    }, DISPLAY_DURATION);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold font-display"
            >
              <span className="gradient-text-orange">{displayedText}</span>
              <span className="inline-block w-0.5 h-8 md:h-12 bg-[var(--accent-orange)] ml-1 animate-pulse" />
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
