import React, { useState } from 'react';
import { Truck, ShieldCheck, RefreshCw, ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "When is the next drop scheduled?",
    answer: "We release limited edition drops every Friday at 6:00 PM EST. Sign up for early access to receive exclusive pre-order passwords and notifications before public launch."
  },
  {
    question: "Are the jerseys player-spec or fan-spec?",
    answer: "Our drops include both Player-Spec (authentic slim fit, heat-sealed emblems, ultra-lightweight fabric) and Fan-Spec (relaxed fit, embroidered logos, standard materials) kits. Specifications are detailed on each product page."
  },
  {
    question: "How should I care for my jerseys?",
    answer: "To ensure longevity of the premium heat-applied numbers, sponsor logos, and graphics, we recommend hand washing inside out in cold water and air drying. Avoid machine washing or tumble drying."
  },
  {
    question: "Can I return or exchange my kit?",
    answer: "Yes! We offer hassle-free returns and exchanges within 30 days of delivery. Items must be in their original condition with tags attached. Custom printed kits with player names/numbers are final sale."
  }
];

export const TrustAndFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="trust-faq" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 w-full space-y-16">
        
        {/* Section 1: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Badge 1: Free Shipping */}
          <div className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#EAEF30]/10 border border-[#EAEF30]/20 flex items-center justify-center text-[#EAEF30] mb-4">
              <Truck size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans font-black uppercase text-sm tracking-wider text-white">Express Delivery</h3>
            <p className="text-neutral-400 text-xs mt-2 max-w-[240px] leading-relaxed">
              Quick, secure shipping on all orders. Free delivery on orders above ₹1,000.
            </p>
          </div>

          {/* Badge 2: Official Quality */}
          <div className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#EAEF30]/10 border border-[#EAEF30]/20 flex items-center justify-center text-[#EAEF30] mb-4">
              <ShieldCheck size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans font-black uppercase text-sm tracking-wider text-white">100% Authentic</h3>
            <p className="text-neutral-400 text-xs mt-2 max-w-[240px] leading-relaxed">
              Direct source premium quality replica kits. Official fabrics, tags, and fit.
            </p>
          </div>

          {/* Badge 3: Easy Returns */}
          <div className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#EAEF30]/10 border border-[#EAEF30]/20 flex items-center justify-center text-[#EAEF30] mb-4">
              <RefreshCw size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans font-black uppercase text-sm tracking-wider text-white">30-Day Guarantee</h3>
            <p className="text-neutral-400 text-xs mt-2 max-w-[240px] leading-relaxed">
              Hassle-free size exchanges or full refund returns. Simple packaging.
            </p>
          </div>

        </div>

        {/* Section 2: FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] text-[#EAEF30] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <HelpCircle size={10} /> FAQ // Customer Support
            </span>
            <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl tracking-tight text-white">
              Got Questions?
            </h2>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`border-b border-white/10 last:border-b-0 transition-colors duration-200 ${
                    isOpen ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wide text-neutral-100 group-hover:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-neutral-400 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`} 
                    />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-40 border-t border-white/5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="p-5 md:p-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans bg-black/10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
