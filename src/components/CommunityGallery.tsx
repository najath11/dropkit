import React from 'react';
import { Camera, Heart, ArrowUpRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  imageUrl: string;
  handle: string;
  likes: string;
  kitFeatured: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
    handle: "@najath_k",
    likes: "1.4k",
    kitFeatured: "AÉRO / ARCHIVE FC-01"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
    handle: "@kick.culture",
    likes: "942",
    kitFeatured: "AÉRO / ARCHIVE INT-02"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=600",
    handle: "@kop_fits",
    likes: "2.1k",
    kitFeatured: "AÉRO / ARCHIVE FC-03"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
    handle: "@studiokits",
    likes: "879",
    kitFeatured: "AÉRO / ARCHIVE INT-04"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
    handle: "@streetwear_daily",
    likes: "1.8k",
    kitFeatured: "AÉRO / ARCHIVE FC-05"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    handle: "@kit_hype",
    likes: "1.2k",
    kitFeatured: "AÉRO / ARCHIVE FC-01"
  }
];

export const CommunityGallery: React.FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="community-gallery" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden text-white">
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 w-full space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[9px] text-[#EAEF30] uppercase tracking-widest flex items-center gap-1.5">
              <Camera size={10} /> Styled by the Community
            </span>
            <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl tracking-tight text-white">
              On the Streets
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-lg">
              Check out how the community styles their DropKit kits. Tag <span className="text-[#EAEF30] font-bold">#DropKitFits</span> on Instagram to be featured.
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <span>Follow @DropKit</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-[#080b12]"
            >
              {/* Image */}
              <img 
                src={item.imageUrl} 
                alt={`Community style by ${item.handle}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                {/* Social handle */}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-wide uppercase text-neutral-300">
                    {item.handle}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-300">
                    <Heart size={10} className="text-rose-500 fill-rose-500" />
                    <span>{item.likes}</span>
                  </div>
                </div>

                {/* Styled item link */}
                <div 
                  onClick={scrollToCollection}
                  className="w-full mt-auto p-2 bg-white/10 hover:bg-[#EAEF30] hover:text-black border border-white/10 hover:border-[#EAEF30] text-center rounded-lg cursor-pointer transition-all duration-200"
                >
                  <span className="block text-[8px] font-bold uppercase tracking-widest leading-none">
                    Shop Kit
                  </span>
                  <span className="block text-[7px] font-mono tracking-tight opacity-75 mt-0.5 truncate">
                    {item.kitFeatured}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
