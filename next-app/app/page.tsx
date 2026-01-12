'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Geist_Mono } from 'next/font/google';

const fontMono = Geist_Mono({ subsets: ['latin'] });

export default function Home() {
  const [glitchText, setGlitchText] = useState("The SUT Shattering");
  
  useEffect(() => {
    const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?";
    const originalText = "The SUT Shattering";
    let interval: NodeJS.Timeout;
    
    // Simple glitch effect on interval
    interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const glitched = originalText.split('').map((char, index) => {
          if (Math.random() > 0.8) return chars[Math.floor(Math.random() * chars.length)];
          return char;
        }).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0 pointer-events-none" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center space-y-12">
        
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className={`${fontMono.className} text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-red-600 animate-pulse`}>
            {glitchText}
          </h1>
          <h2 className="text-xl md:text-2xl text-zinc-400 font-light tracking-widest">
            Echoes of the Forbidden Code
          </h2>
          <p className="text-sm text-red-500/80 mt-2">
            (ปฐมบทมิติวิบัติ: เสียงสะท้อนแห่งรหัสต้องห้าม)
          </p>
        </div>

        {/* Story Context */}
        <div className="max-w-2xl bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-purple-500 to-transparent opacity-50" />
          
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className={`${fontMono.className} text-xs uppercase tracking-widest`}>System Alert: Critical Reality Failure</span>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              You are the <span className="text-purple-400 font-bold">Tarnished Student</span>.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Curiosity led you to the forbidden depths of the university's mainframe. Now, a catastrophic glitch has fractured reality itself. The campus you knew is gone—replaced by a distorted dimension of broken code and purple skies.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Only you possess the keys to restore the system. But beware... the <span className="text-red-400">Guardians of the Firewall</span> are watching.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-8">
          <Link href="/page1" 
             className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent border-2 border-purple-500 rounded-none hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-4">
              ENTER THE RIFT
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </Link>
          <p className={`${fontMono.className} text-xs text-zinc-600 mt-4 uppercase`}>
            Caution: High Cognitive Load Detected
          </p>
        </div>

      </div>

      <div className="absolute bottom-4 left-4 text-zinc-800 text-xs font-mono">
        v.6.6.6 | SUT_KERNEL_PANIC
      </div>
    </main>
  );
}

