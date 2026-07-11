import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCollectionProps {
  onOpenSpecs: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, size: string, color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [size, setSize] = useState<string>(product.sizes[0] || 'M');
  const [color, setColor] = useState<string>(product.colors[0]?.name || '');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!product.backImage) return;

    const interval = setInterval(() => {
      setActiveSide((prev) => (prev === 'front' ? 'back' : 'front'));
    }, 2000);

    return () => clearInterval(interval);
  }, [product.backImage]);

  return (
    <div
      className={`group flex flex-col border bg-white/5 hover:shadow-2xl transition-all duration-300 backdrop-blur-md cursor-pointer
        ${expanded ? 'border-[#EAEF30]/30 bg-white/8 shadow-xl shadow-[#EAEF30]/5' : 'border-white/5 hover:border-white/20'}
        p-2 sm:p-5 rounded-2xl sm:rounded-[24px]`}
      onClick={() => {
        if (window.innerWidth < 640) setExpanded(!expanded);
      }}
    >
      {/* Product Image Panel — always visible */}
      <div className="aspect-[3/4] bg-[#080b12] relative overflow-hidden border border-white/5 group/img rounded-xl sm:mb-4">
        <img
          src={product.image}
          alt={`${product.name} Front`}
          className={`absolute inset-0 object-cover w-full h-full contrast-105 transition-all duration-700 ease-in-out ${activeSide === 'back' ? 'opacity-0 scale-[1.05]' : 'opacity-100 scale-100 group-hover:scale-[1.03]'
            }`}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800';
          }}
        />

        {product.backImage && (
          <img
            src={product.backImage}
            alt={`${product.name} Back`}
            className={`absolute inset-0 object-cover w-full h-full contrast-105 transition-all duration-700 ease-in-out ${activeSide === 'back' ? 'opacity-100 scale-100 group-hover:scale-[1.03]' : 'opacity-0 scale-[0.95]'
              }`}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800';
            }}
          />
        )}

        {/* Front/Back Manual Toggle Overlay */}
        {product.backImage && (
          <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-md border border-white/10 p-0.5 rounded-md z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveSide('front');
              }}
              className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${activeSide === 'front'
                  ? 'bg-white text-black font-semibold rounded-md'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              Front
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveSide('back');
              }}
              className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${activeSide === 'back'
                  ? 'bg-white text-black font-semibold rounded-md'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              Back
            </button>
          </div>
        )}

        {/* "Tap to view" hint on mobile — only when collapsed */}
        {!expanded && (
          <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 pointer-events-none">
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Tap for details
            </span>
          </div>
        )}
      </div>

      {/* Product Name & Price — always visible */}
      <div className="flex justify-between items-start mt-2 sm:mb-2">
        <h3 className="font-sans font-black uppercase text-[11px] sm:text-base tracking-tight text-white group-hover:text-[#EAEF30] transition-colors duration-150 leading-tight">
          {product.name}
        </h3>
        <div className="font-mono text-[10px] sm:text-sm font-bold text-[#EAEF30] bg-white/5 border border-white/10 px-1.5 sm:px-2 py-0.5 rounded-md whitespace-nowrap ml-1.5 shrink-0">
          ₹{product.price}
        </div>
      </div>

      {/* Codename — hidden on mobile unless expanded, always on desktop */}
      <p className={`font-mono text-[9px] sm:text-[10px] text-neutral-400 italic mt-0.5 ${expanded ? 'block' : 'hidden sm:block'}`}>
        {product.codename}
      </p>

      {/* Description — hidden on mobile, shown on desktop */}
      <p className="hidden sm:block text-neutral-300 text-xs leading-relaxed mb-4 sm:mb-6 flex-grow mt-3">
        {product.description}
      </p>

      {/* === Expandable Details Section === */}
      {/* On desktop (sm+): always visible. On mobile: only when expanded */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
          ${expanded ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 sm:max-h-[500px] sm:opacity-100 sm:mt-0'}`}
      >
        {/* Mobile description */}
        <p className="sm:hidden text-neutral-300 text-[10px] leading-relaxed mb-3">
          {product.description}
        </p>

        <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-white/10">

          {/* Color Swatch */}
          <div>
            <div className="flex items-center space-x-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setColor(c.name);
                  }}
                  className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center cursor-pointer transition-transform duration-100 ${color === c.name ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  title={c.name}
                >
                  <span
                    className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 rounded-full border border-white/10"
                    style={{ backgroundColor: c.hex }}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <span className="font-mono text-[9px] sm:text-[9px] uppercase tracking-wider text-neutral-400">Select Size</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5 sm:mt-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSize(s);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-[9px] sm:text-[10px] border transition-all duration-100 cursor-pointer rounded-md ${size === s
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-transparent text-white border-white/10 hover:border-white/30'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, size, color);
            }}
            className="w-full py-2.5 sm:py-3 bg-[#EAEF30] text-black border border-transparent text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:bg-transparent hover:text-[#EAEF30] hover:border-[#EAEF30] transition-all duration-200 cursor-pointer rounded-lg shadow-md"
          >
            Allocate to Kit
          </button>

        </div>
      </div>
    </div>
  );
};

export const ProductCollection: React.FC<ProductCollectionProps & { products?: Product[] }> = ({ products: customProducts }) => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<'all' | 'club' | 'intl'>('all');

  const itemsToDisplay = customProducts || products;

  const filteredProducts = itemsToDisplay.filter((product) => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  return (
    <section id="collection" className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden text-white">
      {/* subtle spotlight gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">PRODUCT COLLECTION // v1.3</span>
            <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl mt-2 text-white tracking-tight">
              The Pitch & Legacy Suite
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-1 border border-white/10 p-1 bg-white/5 rounded-full self-start md:self-auto backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${filter === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
            >
              All Kits
            </button>
            <button
              onClick={() => setFilter('club')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${filter === 'club' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
            >
              Club Editions
            </button>
            <button
              onClick={() => setFilter('intl')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${filter === 'intl' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
            >
              World Cup
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
