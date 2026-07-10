import React from 'react';

interface FooterProps {
  onOpenSpecs: () => void;
  onOpenSizeGuide: () => void;
  onOpenCollection: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSpecs, onOpenSizeGuide, onOpenCollection }) => {
  return (
    <footer className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-[#0c101a] border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white font-sans">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Brand & Manifesto */}
        <div className="md:col-span-5 space-y-6">
          <div className="font-sans text-lg tracking-tight font-extrabold uppercase text-white">
            <span>DropKit</span>
          </div>
          
          <p className="text-neutral-300 text-xs leading-relaxed max-w-sm">
            We engineer high-performance football kits to withstand intense matches, dynamic sprints, and muscle-warming requirements. We reject fast-fashion templates. Circular, structural, uncompromising.
          </p>

          <div className="font-mono text-[9px] text-neutral-500">
            SYSTEM VERSION: v1.2.04 // STABLE RELEASE
          </div>
        </div>

        {/* Center-Left Column: Technical Specification Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] font-semibold text-white uppercase tracking-widest">
            garment specs
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
            <li>
              <button onClick={onOpenCollection} className="hover:text-[#EAEF30] transition-colors duration-100 cursor-pointer text-left">
                All Kits Collection
              </button>
            </li>
            <li>
              <button onClick={onOpenSpecs} className="hover:text-[#EAEF30] transition-colors duration-100 cursor-pointer text-left">
                Fabric Lab Reports
              </button>
            </li>
            <li>
              <a href="#sizing-authenticity" className="hover:text-[#EAEF30] transition-colors duration-100">
                Fluid Drag CdA Tests
              </a>
            </li>
            <li>
              <a href="#sizing-authenticity" className="hover:text-[#EAEF30] transition-colors duration-100">
                Lombardy Mill Standards
              </a>
            </li>
            <li>
              <button onClick={onOpenSizeGuide} className="hover:text-[#EAEF30] transition-colors duration-100 cursor-pointer text-left">
                Sizing Matrix Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Center-Right Column: Support / Policy */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] font-semibold text-white uppercase tracking-widest">
            Registry & Support
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
            <li>
              <button onClick={onOpenSizeGuide} className="hover:text-[#EAEF30] transition-colors duration-100 cursor-pointer">
                Verify Serial Authenticity
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-[#EAEF30] transition-colors duration-100">
                Crash Replacement Program
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#EAEF30] transition-colors duration-100">
                Lifetime Repair Warranty
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#EAEF30] transition-colors duration-100">
                Developer API Hook
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Technical Environmental Details */}
        <div className="md:col-span-3 space-y-4 font-mono text-[10px] text-neutral-400">
          <h4 className="text-[10px] font-semibold text-white uppercase tracking-widest">
            Environmental Impact
          </h4>
          <p className="leading-relaxed">
            All polyamide textiles are milled under strict ISO 14001 guidelines using post-consumer recycled nylon. Outflow waters are filtered to 0.05 micro-mesh particles.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            <span>Zero-hazardous chemical formulation (OEKO-TEX Compliant)</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4 relative z-10">
        <div>
          © {new Date().getFullYear()} DropKit. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors duration-100">C# / SQL Integration Docs</a>
          <a href="#" className="hover:text-white transition-colors duration-100">Terms of Allocation</a>
          <a href="#" className="hover:text-white transition-colors duration-100">Privacy Registry</a>
        </div>
      </div>
    </footer>
  );
};
