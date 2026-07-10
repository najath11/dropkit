import React, { useEffect, useState } from 'react';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreSpecs: () => void;
}

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
];

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onExploreSpecs }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col justify-between bg-transparent flex-grow pt-28 pb-6 md:pt-32 md:pb-8 min-h-[600px] overflow-hidden">
      {/* radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

      {/* legibility scrims (desktop only) */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#08090b]/70 via-[#08090b]/30 to-transparent pointer-events-none z-1" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#08090b]/60 via-[#08090b]/20 to-transparent pointer-events-none z-1" />

      {/* Main content area */}
      <div 
        className={`w-full flex-grow relative z-10 px-6 md:px-12 flex flex-col justify-between transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Left Rail (Desktop: absolute, Mobile: static/flow) */}
        <div className="w-full md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2 z-10 md:max-w-[48%] text-left mb-8 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display uppercase leading-[0.85] tracking-tight text-white">
            REIMAGINED
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display uppercase leading-[0.85] tracking-tight text-[#E6B022]">
            KIT CULTURE
          </h2>
          <div className="mt-5 text-left">
            <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest leading-relaxed">
              Kit Evolved.<br />
              Heritage Perfected.
            </p>
          </div>
        </div>

        {/* Center Image Visual */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none">
          <img 
            src="/assets/hero_barca.png" 
            alt="FC Barcelona Blaugrana Edition Mannequin Torso and Football Player Composition"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain md:object-cover scale-110 md:scale-[1.3] translate-y-4 md:translate-y-0 mix-blend-screen"
          />
        </div>

        {/* Right Rail (Desktop: absolute, Mobile: static/flow) */}
        <div className="w-full md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 z-10 md:max-w-sm flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
          <p className="text-neutral-200 text-xs sm:text-sm font-semibold leading-relaxed max-w-xs">
            Engineered For Performance,<br />Styled For Life. Every Thread Counts.
          </p>
          
          <div className="flex items-center gap-2.5 mt-5 justify-start md:justify-end">
            <button 
              onClick={onExploreSpecs}
              className="px-5 py-2 bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow-md cursor-pointer"
            >
              Play
            </button>
            <button 
              onClick={onExploreCollection}
              className="px-5 py-2 bg-[#EAEF30] text-black hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow-md cursor-pointer"
            >
              Collect
            </button>
            <button 
              onClick={onExploreCollection}
              className="px-5 py-2 bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow-md cursor-pointer"
            >
              Live
            </button>
          </div>

          <div className="mt-8">
            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-white uppercase tracking-wider leading-none">
              Kit Drop 30%
            </h4>
            <p className="text-[9px] sm:text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2 font-mono">
              For All New Club Jersey Collection
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div 
        className={`w-full flex flex-col sm:flex-row items-end justify-between z-10 gap-6 px-6 md:px-12 pb-2 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 shrink-0">
                {avatars.map((url, i) => (
                  <img 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover" 
                    src={url} 
                    alt="Customer Reviewer" 
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-white font-extrabold text-xs">4.8/5</span>
                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Star Rated</span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest mt-1">
              9,000+ Fans
            </p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div 
            onClick={onExploreCollection}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <button 
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
              aria-label="Scroll Down"
            >
              <svg 
                className="w-3.5 h-3.5 animate-bounce" 
                style={{ animationDuration: '2.5s' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors duration-300 font-bold">
              Scroll To Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
