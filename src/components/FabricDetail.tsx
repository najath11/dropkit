import React, { useState } from 'react';
import { products } from '../data/products';
import type { Product } from '../types';
import { Shield, Activity, Layers } from 'lucide-react';

interface FabricDetailProps {
  selectedProduct?: Product;
}

export const FabricDetail: React.FC<FabricDetailProps> = ({ selectedProduct }) => {
  const [activeTab, setActiveTab] = useState<string>(selectedProduct?.id || 'js-01');

  React.useEffect(() => {
    if (selectedProduct) {
      setActiveTab(selectedProduct.id);
    }
  }, [selectedProduct]);

  const currentProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section id="material-specs" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">TEXTILE LAB REPORT // FABRIC AT REST</span>
          <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl mt-2 text-white tracking-tight">
            The Physics of Material Selection
          </h2>
          <p className="text-neutral-300 text-sm mt-4 leading-relaxed">
            Garments are the boundary layer between the athlete and the atmosphere. We select, refine, and stress-test custom-milled Italian polyamides to achieve optimal aerodynamics and thermoregulation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Product Spec Toggles */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider mb-2">Select Garment System</div>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`w-full text-left p-4 border transition-all duration-150 cursor-pointer flex flex-col rounded-xl ${
                  activeTab === p.id 
                    ? 'bg-[#EAEF30] text-black border-[#EAEF30] shadow-md font-semibold' 
                    : 'bg-white/5 border-white/10 text-white hover:border-white/25 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-sans text-xs font-black uppercase tracking-wider">{p.name}</span>
                  <span className="font-mono text-[9px] opacity-70">{p.fabric.weight}</span>
                </div>
                <span className={`font-mono text-[10px] mt-1.5 ${activeTab === p.id ? 'text-black/60 font-semibold' : 'text-neutral-400'}`}>
                  {p.fabric.composition}
                </span>
              </button>
            ))}

            {/* Micro structural schematic drawing representation */}
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-[10px] text-white font-medium uppercase border-b border-white/10 pb-2">
                <Layers size={14} className="text-[#EAEF30]" />
                <span>AeroGrid Structural Weave Section</span>
              </div>
              
              {/* Visual technical structure */}
              <div className="space-y-2.5 font-mono text-[9px] text-neutral-400">
                <div className="flex justify-between">
                  <span>Layer 1 (Outer Face)</span>
                  <span className="text-neutral-300">Hydrophobic Aero-Grid Weave</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-[#EAEF30]"></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Layer 2 (Core Yarn)</span>
                  <span className="text-neutral-300">Elastic Polyamide Tension Core</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-11/12 bg-[#EAEF30]"></div>
                </div>

                <div className="flex justify-between">
                  <span>Layer 3 (Inner Face)</span>
                  <span className="text-neutral-300">Hydrophilic Micro-capillary Channel</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-[#EAEF30]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Fabric Breakdown */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 p-6 sm:p-10 bg-white/5 rounded-2xl backdrop-blur-md">
            
            {/* Detailed Textile Data Grid */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Textile Origin</span>
                <div className="font-sans text-base font-black uppercase tracking-wider text-white mt-1">{currentProduct.fabric.origin}</div>
                <div className="font-mono text-[10px] text-neutral-400 mt-0.5">Milled and constructed under ISO 14001 certification.</div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">GSM Density weight</span>
                <div className="font-sans text-base font-black uppercase tracking-wider text-white mt-1">{currentProduct.fabric.weight}</div>
                <div className="font-mono text-[10px] text-neutral-400 mt-0.5">Optimized grams per square meter for target thermal performance.</div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Ecological Composition</span>
                <div className="font-sans text-base font-black uppercase tracking-wider text-[#EAEF30] mt-1">{currentProduct.fabric.reclaimedPercentage} Circular</div>
                <div className="font-mono text-[10px] text-neutral-400 mt-0.5">{currentProduct.fabric.composition}</div>
              </div>

              {currentProduct.fabric.dragCoef && (
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Aerodynamic drag index</span>
                  <div className="font-sans text-base font-black uppercase tracking-wider text-white mt-1">{currentProduct.fabric.dragCoef}</div>
                  <div className="font-mono text-[10px] text-neutral-400 mt-0.5">Tested in atmospheric wind tunnel at 45km/h wind velocity.</div>
                </div>
              )}
            </div>

            {/* Core Technical Highlights */}
            <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8 space-y-6">
              
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Performance Properties</span>
                <ul className="space-y-3">
                  {currentProduct.fabric.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-[#EAEF30] rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Testing Certificates</span>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <Shield size={16} className="text-[#EAEF30] shrink-0" strokeWidth={1.5} />
                    <span>OEKO-TEX® Standard 100 Non-toxic certified</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <Activity size={16} className="text-[#EAEF30] shrink-0" strokeWidth={1.5} />
                    <span>ISO 9001 Structural tension integrity guaranteed</span>
                  </div>
                </div>
              </div>
              
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
