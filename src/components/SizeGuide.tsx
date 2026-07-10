import React, { useState } from 'react';
import { Ruler, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const SizeGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'size' | 'auth'>('size');
  const [serialNumber, setSerialNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'loading' | 'valid' | 'invalid';
    message?: string;
    details?: any;
  }>({ status: 'idle' });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setVerificationResult({ status: 'loading' });

    // Simulate C# backend verification response delay
    setTimeout(() => {
      const formattedCode = serialNumber.toUpperCase().replace(/\s/g, '');
      if (formattedCode === 'AF-9801-XTR2' || formattedCode === 'AF-9801-XTR1') {
        setVerificationResult({
          status: 'valid',
          message: 'Holographic Serial Validated',
          details: {
            model: 'AÉRO / ARCHIVE FC-01 Madrid Club Edition',
            origin: 'Lombardy, Italy (Milled in Varese)',
            batch: 'Batch 2026/08F',
            ownership: 'Unregistered (Ready for activation)'
          }
        });
      } else {
        setVerificationResult({
          status: 'invalid',
          message: 'Unverified Serial Identifier',
          details: 'The entered security sequence does not match AÉRO / ARCHIVE registry databases. Please contact support if your garment contains the holographic microthread.'
        });
      }
    }, 1200);
  };

  return (
    <section id="sizing-authenticity" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        {/* Tabs Selector */}
        <div className="flex border-b border-white/10 mb-10">
          <button
            onClick={() => setActiveTab('size')}
            className={`pb-4 text-xs font-mono uppercase tracking-widest border-b-2 transition-all duration-150 mr-8 cursor-pointer ${
              activeTab === 'size' 
                ? 'border-[#EAEF30] text-[#EAEF30] font-semibold' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Ruler size={14} />
              Sizing Metrics
            </span>
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`pb-4 text-xs font-mono uppercase tracking-widest border-b-2 transition-all duration-150 cursor-pointer ${
              activeTab === 'auth' 
                ? 'border-[#EAEF30] text-[#EAEF30] font-semibold' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} />
              Authenticity & Registry
            </span>
          </button>
        </div>

        {activeTab === 'size' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Sizing Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display uppercase text-xl md:text-2xl text-white tracking-tight">Precision Sizing Metrics</h3>
                <p className="text-neutral-300 text-xs mt-2">
                  Measurements refer to physical body dimensions. For jerseys designed to stretch under high speed, we recommend choosing your normal size for a compression fit.
                </p>
              </div>

              {/* Sizing Table */}
              <div className="overflow-x-auto border border-white/10 bg-white/5 rounded-2xl">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-neutral-300">
                      <th className="p-3.5 font-medium">Size</th>
                      <th className="p-3.5 font-medium">Chest (cm / in)</th>
                      <th className="p-3.5 font-medium">Waist (cm / in)</th>
                      <th className="p-3.5 font-medium">Hips (cm / in)</th>
                      <th className="p-3.5 font-medium">Recommended Height</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-200">
                    <tr>
                      <td className="p-3.5 font-semibold">XS</td>
                      <td className="p-3.5">84 - 88 cm / 33 - 35"</td>
                      <td className="p-3.5">70 - 74 cm / 27 - 29"</td>
                      <td className="p-3.5">88 - 92 cm / 34 - 36"</td>
                      <td className="p-3.5">162 - 168 cm</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">S</td>
                      <td className="p-3.5">88 - 92 cm / 35 - 36"</td>
                      <td className="p-3.5">74 - 78 cm / 29 - 31"</td>
                      <td className="p-3.5">92 - 96 cm / 36 - 38"</td>
                      <td className="p-3.5">168 - 174 cm</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="p-3.5 font-semibold">M</td>
                      <td className="p-3.5">92 - 96 cm / 36 - 38"</td>
                      <td className="p-3.5">78 - 82 cm / 31 - 32"</td>
                      <td className="p-3.5">96 - 100 cm / 38 - 39"</td>
                      <td className="p-3.5">174 - 180 cm</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">L</td>
                      <td className="p-3.5">96 - 100 cm / 38 - 39"</td>
                      <td className="p-3.5">82 - 86 cm / 32 - 34"</td>
                      <td className="p-3.5">100 - 104 cm / 39 - 41"</td>
                      <td className="p-3.5">180 - 186 cm</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">XL</td>
                      <td className="p-3.5">100 - 104 cm / 39 - 41"</td>
                      <td className="p-3.5">86 - 90 cm / 34 - 35"</td>
                      <td className="p-3.5">104 - 108 cm / 41 - 43"</td>
                      <td className="p-3.5">186 - 192 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Fit Profile Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
              <h4 className="font-sans text-sm font-black uppercase tracking-wider text-white">Fit Profile Systems</h4>
              
              <div className="space-y-4 text-xs">
                <div className="pb-4 border-b border-white/10">
                  <span className="font-mono text-[9px] font-bold text-[#EAEF30] uppercase tracking-wider block">Fit A // Player Cut</span>
                  <p className="text-neutral-300 mt-1 leading-relaxed">
                    Slim-fit, streamlined athletic cut engineered exactly like the kits worn on-pitch by professional athletes. Focuses on minimal excess fabric to prevent opponent grabbing and maximize speed.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider block">Fit B // Fan Cut</span>
                  <p className="text-neutral-300 mt-1 leading-relaxed">
                    Standard supporter drape, slightly relaxed through the chest and waist for casual streetwear comfort. Perfect for standing in the terraces or normal everyday use.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Security Elements */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="font-display uppercase text-xl md:text-2xl text-white tracking-tight">The Cryptographic Registry</h3>
                <p className="text-neutral-300 text-xs mt-2">
                  AÉRO / ARCHIVE garments are engineered with dual physical-digital cryptographic tracking to deter counterfeits and verify textile credentials.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-white/10 bg-white/5 rounded-2xl space-y-2">
                  <div className="font-mono text-[10px] font-semibold uppercase text-white">01 // Holographic Thread</div>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Milled directly into the side-hem label, a proprietary light-diffracting thread reflects coordinates referencing our Treviso production plant.
                  </p>
                </div>

                <div className="p-5 border border-white/10 bg-white/5 rounded-2xl space-y-2">
                  <div className="font-mono text-[10px] font-semibold uppercase text-white">02 // Pocket Identifier</div>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Woven into the inner security sleeve pocket is a unique 12-character alpha-numeric registry key, which acts as the garment's digital passport.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Serial Number Verification Form */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="font-sans text-sm font-black uppercase tracking-wider text-white mb-4">Validate Garment Passport</h4>
              
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label htmlFor="serial" className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    12-Digit Security Code
                  </label>
                  <input
                    type="text"
                    id="serial"
                    placeholder="e.g., AF-9801-XTR2"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white uppercase rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verificationResult.status === 'loading'}
                  className="w-full py-2.5 bg-[#EAEF30] text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 disabled:bg-neutral-800 disabled:text-neutral-600 transition-colors duration-150 cursor-pointer rounded-lg font-bold shadow-md"
                >
                  {verificationResult.status === 'loading' ? 'Checking Database...' : 'Run Registry Lookup'}
                </button>
              </form>

              {/* Verification Response States */}
              {verificationResult.status !== 'idle' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  {verificationResult.status === 'loading' && (
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono animate-pulse">
                      <span className="w-1.5 h-1.5 bg-[#EAEF30] rounded-full animate-ping"></span>
                      <span>Accessing distributed database registry...</span>
                    </div>
                  )}

                  {verificationResult.status === 'valid' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
                        <CheckCircle2 size={16} />
                        <span>{verificationResult.message}</span>
                      </div>
                      <div className="bg-black/45 border border-white/10 p-4 font-mono text-[10px] space-y-2 text-neutral-200 rounded-xl">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-neutral-400">MODEL:</span>
                          <span className="font-semibold">{verificationResult.details.model}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-neutral-400">PROVENANCE:</span>
                          <span>{verificationResult.details.origin}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-neutral-400">BATCH CODE:</span>
                          <span>{verificationResult.details.batch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">OWNER:</span>
                          <span className="text-[#EAEF30] font-semibold">{verificationResult.details.ownership}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {verificationResult.status === 'invalid' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#C24A3F] font-mono">
                        <AlertCircle size={16} />
                        <span>{verificationResult.message}</span>
                      </div>
                      <p className="bg-black/45 border border-white/10 p-4 font-mono text-[10px] text-neutral-300 leading-relaxed rounded-xl">
                        {verificationResult.details}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 text-[9px] font-mono text-neutral-500 text-center">
                Prototype Serial Code: <span className="underline select-all">AF-9801-XTR2</span>
              </div>

            </div>

          </div>
        )}
      </div>
    </section>
  );
};
