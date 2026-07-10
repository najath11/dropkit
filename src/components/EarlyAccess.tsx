import React, { useState } from 'react';
import { Send, FileCheck } from 'lucide-react';

export const EarlyAccess: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('Aero-Velocity');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [queueInfo, setQueueInfo] = useState<{ position: number; ticket: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setFormState('submitting');

    // Simulate C# API request to SQL database to register user queue
    setTimeout(() => {
      const generatedQueue = Math.floor(1000 + Math.random() * 8999);
      const generatedTicket = `ARCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      setQueueInfo({
        position: generatedQueue,
        ticket: generatedTicket
      });
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="early-access" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
      
      {/* Background structural graphics */}
      <div className="absolute right-12 top-12 opacity-5 pointer-events-none hidden lg:block select-none text-white/40">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="48" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 0 v100 M0 50 h100" strokeWidth="0.25" />
        </svg>
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Narrative Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            UPCOMING DROP SYSTEM // RAW ALLOCATION
          </span>
          <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
            Secure priority allocation for Drop 04
          </h2>
          
          <div className="text-xs text-neutral-300 space-y-4 leading-relaxed max-w-xl">
            <p>
              We do not mass-produce. Each release is constrained strictly by the milling output of our textile partners in Lombardy and Treviso. Drop 04 will feature our next-generation speed-mesh compound.
            </p>
            <p className="border-l-2 border-[#EAEF30] pl-4 font-mono text-[10px] italic text-neutral-300">
              "Limited yarn runs ensure that thermal stress testing standards are never compromised. Each roll of fabric is serialized."
            </p>
            <p>
              Entering the queue registers your preference in our database. You will receive technical details and a 24-hour advance purchase window before public allocation begins.
            </p>
          </div>
        </div>

        {/* Form Right Column */}
        <div className="lg:col-span-6 border border-white/10 p-6 sm:p-10 bg-white/5 rounded-2xl backdrop-blur-md">
          {formState !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Charles Leclerc"
                    className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@domain.com"
                    className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-2">
                  Preferred Technical Focus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Aero-Velocity', 'Lightweight Mesh', 'Thermal Shield'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFocus(item)}
                      className={`py-2 text-[10px] font-mono border transition-all duration-100 cursor-pointer rounded-lg ${
                        focus === item 
                          ? 'bg-white text-black border-white font-bold' 
                          : 'bg-black/35 text-white border-white/10 hover:border-white/25 hover:bg-black/50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full py-3 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-600 rounded-lg shadow-md"
              >
                {formState === 'submitting' ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping mr-1"></span>
                    Registering Database Allocation...
                  </>
                ) : (
                  <>
                    Request Allocation Access
                    <Send size={12} />
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-6">
              <div className="mx-auto w-12 h-12 bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 rounded-full text-emerald-400">
                <FileCheck size={24} />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-sans text-base font-black uppercase tracking-wider text-white">Queue Registration Verified</h4>
                <p className="text-neutral-300 text-xs max-w-sm mx-auto leading-relaxed">
                  Your interest in the **{focus}** kit drop has been logged in our central database. A secure access token has been allocated.
                </p>
              </div>

              {queueInfo && (
                <div className="max-w-xs mx-auto border border-white/10 bg-black/45 p-4 font-mono text-left text-[11px] space-y-2 rounded-xl">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-400">PASS TOKEN:</span>
                    <span className="font-bold text-[#EAEF30]">{queueInfo.ticket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">QUEUE POSITION:</span>
                    <span className="text-white">#{queueInfo.position}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1.5 text-[9px] text-neutral-400">
                    <span>DATABASE CLOCK:</span>
                    <span>2026-07-08 GMT</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setFormState('idle');
                  setEmail('');
                  setName('');
                }}
                className="text-[10px] font-mono text-neutral-500 hover:text-white underline cursor-pointer"
              >
                Register another athlete
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
