'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  chapter: string;
  title: string;
  subtitle: string;
  onComplete: () => void;
}

export default function SplashScreen({ chapter, title, subtitle, onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide splash after 4 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000); // 4 seconds of display time

    // Callback on complete after exit animation (4s + 1s buffer)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-1000000 flex flex-col items-center justify-center bg-black select-none pointer-events-none"
        >
          {/* Background Ambient Effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-purple-900/10 to-transparent" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center space-y-6"
          >
            {/* Chapter Indicator */}
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-24 h-px bg-red-500 mb-6"
            />

            <h2 className="text-xl md:text-2xl font-mono text-zinc-500 tracking-[0.2em] uppercase">
              {chapter}
            </h2>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
              {title}
            </h1>

            <p className="text-sm md:text-lg text-red-500/80 font-mono mt-4 max-w-lg">
              {subtitle}
            </p>

            {/* Loading/Processing Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute -bottom-32 text-xs text-zinc-700 font-mono flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              LOADING_ASSETS...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
