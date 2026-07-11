import React, { useEffect, useState } from 'react';
import { ArrowRight, Flame, ShieldCheck, Wind, Shirt } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreSpecs?: () => void;
}

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
];

const slides = [
  {
    id: 1,
    image: "/hero_players_close.png",
    subLabel: "Wear Your Passion.",
    headline: (
      <>
        Legends<br />
        Live Here
        <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#EAEF30] ml-1 md:ml-2"></span>
      </>
    ),
    desc1: "Authentic Jerseys. Elite Performance.",
    desc2: "Rep your club. Own your style.",
  },
  {
    id: 2,
    image: "/hero_slide_2.png",
    subLabel: "Engineered For Greatness.",
    headline: (
      <>
        Unrivaled<br />
        Performance
        <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-white ml-1 md:ml-2"></span>
      </>
    ),
    desc1: "Advanced Tech. Supreme Comfort.",
    desc2: "Dominate the pitch in style.",
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreCollection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Initial mount animation
    const timer = setTimeout(() => setIsVisible(true), 150);
    
    // Auto slider interval
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[750px] max-h-[1080px] flex flex-col bg-[#08090b] overflow-hidden pt-[100px] md:pt-[150px] pb-8 md:pb-6">
      {/* ── Background Images (Slider) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt="Hero Background"
            className={`absolute inset-0 w-full h-[75vh] md:h-full object-cover object-[65%_top] md:object-[65%_center] transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-90' : 'opacity-0'
            }`}
            draggable={false}
          />
        ))}

        {/* Gradients to blend text & layout over the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/80 to-transparent w-full md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/60 to-transparent h-full md:via-[#08090b]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/80 via-transparent to-transparent h-[30vh]" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 flex flex-col flex-1 justify-between w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-16">

        {/* ── Top Left: Headline & CTA ── */}
        <div
          className={`flex flex-col items-start max-w-xl xl:max-w-2xl transition-all duration-[1200ms] ease-out z-20 relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Slider Text Content */}
          <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[420px] xl:h-[460px]">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-start transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                {/* Sub-label */}
                <span className="text-[#EAEF30] font-sans font-semibold tracking-[0.2em] text-[10px] md:text-sm uppercase mb-3 md:mb-5">
                  {slide.subLabel}
                </span>

                {/* Main Title */}
                <h1 className="font-display text-[3.5rem] leading-[0.88] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] uppercase tracking-tight text-white select-none">
                  {slide.headline}
                </h1>

                {/* Subtitle */}
                <div className="mt-4 md:mt-8 space-y-1">
                  <p className="text-white text-xs md:text-base lg:text-lg font-medium tracking-wide">
                    {slide.desc1}
                  </p>
                  <p className="text-neutral-400 text-xs md:text-base lg:text-lg font-medium tracking-wide">
                    {slide.desc2}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons and Slide Indicators */}
          <div className="flex flex-col w-full sm:w-auto mt-2 md:mt-0 relative z-30">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 md:gap-4 bg-[#EAEF30] text-black px-4 md:pl-6 md:pr-2 py-3 md:py-2.5 rounded-full font-bold text-[11px] md:text-sm uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                <span>Shop Now</span>
                <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-black text-[#EAEF30] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </button>
              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 bg-black/20 backdrop-blur-md text-white px-4 md:px-8 py-3.5 rounded-full font-bold text-[11px] md:text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
              >
                Explore Kits
              </button>
            </div>
            
            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-8 bg-[#EAEF30]' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Spacer for Mobile Players visibility ── */}
        <div className="h-[10vh] min-h-[60px] md:hidden w-full" />

        {/* ── Bottom Sections ── */}
        <div
          className={`mt-auto w-full flex flex-col gap-4 md:gap-8 transition-all duration-[1200ms] delay-300 ease-out z-20 relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Trust Badges Container */}
          <div className="w-full bg-[#0d0e12]/80 backdrop-blur-xl border border-white/[0.06] rounded-[24px] md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none py-5 md:py-0 px-4 md:px-0">
            <div className="flex flex-row flex-wrap justify-between md:justify-start items-center gap-y-4 gap-x-2 md:gap-12 text-white/80">
              <div className="flex items-center gap-2 md:gap-3 flex-col md:flex-row text-center md:text-left flex-1 min-w-[30%]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-white" size={16} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-[9px] md:text-xs font-bold uppercase tracking-wider">Authentic</span>
                  <span className="text-neutral-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-0.5">100% Original</span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 flex-col md:flex-row text-center md:text-left flex-1 min-w-[30%]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                  <Wind className="text-white" size={16} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-[9px] md:text-xs font-bold uppercase tracking-wider">Performance</span>
                  <span className="text-neutral-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-0.5">Built to Perform</span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 flex-col md:flex-row text-center md:text-left flex-1 min-w-[30%]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                  <Shirt className="text-white" size={16} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-[9px] md:text-xs font-bold uppercase tracking-wider">Exclusive</span>
                  <span className="text-neutral-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-0.5">Limited Drops</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Cards Glass Panel */}
          <div className="w-full bg-[#0d0e12]/80 backdrop-blur-xl border border-white/[0.06] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col md:flex-row">
            
            {/* Column 1 */}
            <div
              onClick={onExploreCollection}
              className="group flex-1 flex flex-row items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 border-b md:border-b-0 md:border-r border-white/[0.06]"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full">
                <img
                  src="/new_season_card.png"
                  alt="New Season"
                  className="w-10 h-10 md:w-16 md:h-16 rounded-xl object-cover shrink-0 border border-white/10 shadow-lg"
                />
                <div className="flex flex-col w-full">
                  <span className="text-white text-[9px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wider leading-tight">
                    New Season.<br className="md:hidden" /> New Kits.
                  </span>
                  <span className="text-neutral-400 text-[8px] sm:text-[9px] md:text-xs mt-1 md:mt-1.5 leading-tight">
                    Discover the 24/25 collection.
                  </span>
                </div>
              </div>
              <div className="hidden md:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all duration-300 shrink-0">
                <ArrowRight size={18} />
              </div>
              <div className="md:hidden mt-3 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50">
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Column 2 */}
            <div
              onClick={onExploreCollection}
              className="group flex-1 flex flex-row items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 border-b md:border-b-0 md:border-r border-white/[0.06]"
            >
              <div className="flex flex-row md:flex-row items-center gap-3 md:gap-4 w-full">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-[#EAEF30]/10 flex items-center justify-center shrink-0">
                  <Flame className="text-[#EAEF30]" size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <span className="text-white text-[10px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wider leading-tight">
                    Flash Drop
                  </span>
                  <span className="text-neutral-400 text-[9px] sm:text-[9px] md:text-xs mt-1 leading-tight">
                    Up to 25% off on selected kits.
                  </span>
                </div>
              </div>
              <div className="hidden md:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all duration-300 shrink-0">
                <ArrowRight size={18} />
              </div>
              <div className="md:hidden mt-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Column 3 */}
            <div
              onClick={onExploreCollection}
              className="group flex-1 flex flex-row items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex flex-row md:flex-row items-center gap-3 md:gap-4 w-full">
                <div className="flex -space-x-1.5 md:-space-x-2.5 shrink-0 pl-1">
                  {avatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Athlete"
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#0d0e12] md:border-2 object-cover"
                      style={{ zIndex: 4 - i }}
                    />
                  ))}
                </div>
                <div className="flex flex-col ml-2 md:ml-1 w-full text-left">
                  <span className="text-white text-[10px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wider leading-tight">
                    Join 15K+<br className="hidden md:block" /> Athletes
                  </span>
                  <span className="text-neutral-400 text-[9px] sm:text-[9px] md:text-xs mt-1 leading-tight">
                    Who trust Dropkit.
                  </span>
                </div>
              </div>
              <div className="hidden md:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all duration-300 shrink-0">
                <ArrowRight size={18} />
              </div>
              <div className="md:hidden mt-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                <ArrowRight size={12} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
