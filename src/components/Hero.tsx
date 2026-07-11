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

export const Hero: React.FC<HeroProps> = ({ onExploreCollection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col justify-between bg-transparent flex-grow pt-24 pb-6 md:pt-28 md:pb-8 min-h-[620px] overflow-hidden">
      {/* Background Visual */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src="/assets/dropkit_hero_clean.png" 
          alt="Hero background"
          className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98]"
        />
        {/* Subtle dark radial glow overlay at the far edges to blend */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),rgba(8,9,11,0.45)_85%)] pointer-events-none" />
      </div>

      {/* Legibility scrims (desktop only) - toned down for image brightness */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#08090b]/50 via-[#08090b]/10 to-transparent pointer-events-none z-1" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-[#08090b]/45 via-[#08090b]/5 to-transparent pointer-events-none z-1" />

      {/* Main content area */}
      <div 
        className={`w-full flex-grow relative z-10 px-6 md:px-12 flex flex-col justify-between transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Left Rail (Desktop: absolute, Mobile: static/flow) */}
        <div className="w-full md:absolute md:left-12 md:top-[45%] md:-translate-y-1/2 z-10 md:max-w-[48%] text-left mb-4 md:mb-0">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display uppercase leading-[0.82] tracking-tight text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            ENGINEERED
            <br />
            VICTORY
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display uppercase leading-[0.82] tracking-tight text-[#EAEF30] select-none mt-1 sm:mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            LEGENDARY
            <br />
            STYLE
          </h2>
          <div className="hidden md:block mt-6 text-left">
            <p className="text-xs sm:text-sm font-bold text-white/95 uppercase tracking-widest leading-relaxed font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Authentic Design.
              <br />
              Unrivaled Performance.
            </p>
          </div>
        </div>

        {/* Right Rail (Desktop: absolute, Mobile: static/flow) */}
        <div className="w-full md:absolute md:right-12 md:top-[45%] md:-translate-y-1/2 z-10 md:max-w-sm flex flex-col items-start md:items-end text-left md:text-right mt-2 md:mt-0">
          {/* Top Right Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3 md:mb-5 scale-90 md:scale-100 origin-left md:origin-right">
            <span className="px-2.5 py-0.5 md:px-3.5 md:py-1 bg-white text-black text-[8px] md:text-[9px] uppercase tracking-widest font-extrabold rounded-full shadow-sm">
              Authentic
            </span>
            <span className="px-2.5 py-0.5 md:px-3.5 md:py-1 bg-[#EAEF30] text-black text-[8px] md:text-[9px] uppercase tracking-widest font-extrabold rounded-full shadow-sm">
              Limited Edition
            </span>
            <span className="px-2.5 py-0.5 md:px-3.5 md:py-1 bg-transparent border border-white/30 text-white text-[8px] md:text-[9px] uppercase tracking-widest font-extrabold rounded-full">
              Fan Fav
            </span>
          </div>

          <p className="hidden md:block text-neutral-200 text-xs sm:text-sm font-semibold leading-relaxed max-w-xs whitespace-pre-line font-sans drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            Designed For Every Match, Every Moment,
            and Every Victory. Find Your Fit.
          </p>
          
          <div className="mt-4 md:mt-8">
            <h4 className="text-xl xs:text-2xl sm:text-4xl font-display text-[#EAEF30] uppercase tracking-wider leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              Flash Drop 25% Off
            </h4>
            <p className="text-[8px] sm:text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1.5 font-mono">
              Our All-New International Kits
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div 
        className={`w-full flex flex-row items-center justify-between z-10 gap-4 px-6 md:px-12 pb-2 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Rating Section */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5 shrink-0">
            {avatars.map((url, i) => (
              <img 
                key={i}
                className="w-7 h-7 rounded-full border border-neutral-900 object-cover" 
                src={url} 
                alt="Customer Reviewer" 
              />
            ))}
          </div>
          <div className="flex flex-col justify-center leading-none text-left">
            <span className="text-white font-extrabold text-[10px]">4.8/5 Rated</span>
            <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">15k+ Athletes</span>
          </div>
        </div>

        {/* Scroll button */}
        <div 
          onClick={onExploreCollection}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[8px] uppercase tracking-widest text-neutral-400 group-hover:text-[#EAEF30] transition-colors duration-300 font-bold hidden sm:inline">
            Scroll To Explore
          </span>
          <button 
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
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
        </div>
      </div>
    </section>
  );
};
