import React, { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { HelpCircle, SlidersHorizontal } from 'lucide-react';

interface ProductCollectionProps {
  onOpenSpecs: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

interface ProductCardProps {
  product: Product;
  onOpenSpecs: (product: Product) => void;
  onOpenSizeGuide: () => void;
  addToCart: (product: Product, size: string, color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenSpecs, onOpenSizeGuide, addToCart }) => {
  const [size, setSize] = useState<string>(product.sizes[0] || 'M');
  const [color, setColor] = useState<string>(product.colors[0]?.name || '');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  return (
    <div 
      className="group flex flex-col border border-white/5 bg-white/5 p-5 hover:shadow-2xl hover:border-white/20 transition-all duration-300 rounded-[24px] backdrop-blur-md"
      onMouseEnter={() => {
        if (product.backImage) {
          setActiveSide('back');
        }
      }}
      onMouseLeave={() => {
        setActiveSide('front');
      }}
    >
      {/* Product Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="font-mono text-[9px] text-neutral-400 tracking-widest">
            REF: {product.id.toUpperCase()} // {product.fabric.weight}
          </span>
          <h3 className="font-sans font-black uppercase text-base tracking-tight text-white group-hover:text-[#EAEF30] transition-colors duration-150">
            {product.name}
          </h3>
          <p className="font-mono text-[10px] text-neutral-400 italic mt-0.5">
            {product.codename}
          </p>
        </div>
        <div className="font-mono text-sm font-bold text-[#EAEF30] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
          ₹{product.price}
        </div>
      </div>

      {/* Product Image Panel */}
      <div className="aspect-square bg-[#080b12] relative overflow-hidden mb-6 border border-white/5 group/img rounded-xl">
        <img
          src={product.image}
          alt={`${product.name} Front`}
          className={`absolute inset-0 object-cover w-full h-full filter grayscale group-hover:grayscale-0 contrast-105 transition-all duration-700 ease-in-out ${
            activeSide === 'back' ? 'opacity-0 scale-[1.05]' : 'opacity-100 scale-100 group-hover:scale-[1.03]'
          }`}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800';
          }}
        />
        
        {product.backImage && (
          <img
            src={product.backImage}
            alt={`${product.name} Back`}
            className={`absolute inset-0 object-cover w-full h-full filter grayscale group-hover:grayscale-0 contrast-105 transition-all duration-700 ease-in-out ${
              activeSide === 'back' ? 'opacity-100 scale-100 group-hover:scale-[1.03]' : 'opacity-0 scale-[0.95]'
            }`}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800';
            }}
          />
        )}
        
        {product.fabric.dragCoef && (
          <div className="absolute top-3 left-3 bg-black/85 text-[#EAEF30] text-[9px] font-mono px-2 py-0.5 tracking-wider uppercase z-10 border border-white/10 rounded-md">
            Aero: {product.fabric.dragCoef}
          </div>
        )}
        
        {/* Front/Back Manual Toggle Overlay */}
        {product.backImage && (
          <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-md border border-white/10 p-0.5 rounded-md z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveSide('front');
              }}
              className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                activeSide === 'front' 
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
              className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                activeSide === 'back' 
                  ? 'bg-white text-black font-semibold rounded-md' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Back
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-neutral-300 text-xs leading-relaxed mb-6 flex-grow">
        {product.description}
      </p>

      {/* Tech Spec Quick Buttons */}
      <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/10 text-[11px] font-mono">
        <button
          onClick={() => onOpenSpecs(product)}
          className="text-white/80 hover:text-brand-yellow transition-colors duration-150 flex items-center gap-1.5 cursor-pointer"
        >
          <SlidersHorizontal size={12} />
          Fabric Composition Specs
        </button>
        
        <button
          onClick={onOpenSizeGuide}
          className="text-neutral-400 hover:text-white transition-colors duration-150 flex items-center gap-1 cursor-pointer"
        >
          Size Chart
          <HelpCircle size={12} />
        </button>
      </div>

      {/* Swatch & Size Selectors */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        
        {/* Color Swatch */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Colorway: {color}</span>
          <div className="flex items-center space-x-2 mt-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer transition-transform duration-100 ${
                  color === c.name ? 'border-white scale-110' : 'border-transparent'
                }`}
                title={c.name}
              >
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-white/10" 
                  style={{ backgroundColor: c.hex }}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Select Size</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-8 h-8 flex items-center justify-center font-mono text-[10px] border transition-all duration-100 cursor-pointer rounded-md ${
                  size === s 
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
          onClick={() => addToCart(product, size, color)}
          className="w-full py-3 bg-[#EAEF30] text-black border border-transparent text-xs font-bold tracking-wider uppercase hover:bg-transparent hover:text-[#EAEF30] hover:border-[#EAEF30] transition-all duration-200 cursor-pointer rounded-lg shadow-md"
        >
          Allocate to Kit
        </button>
        
      </div>
    </div>
  );
};

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onOpenSpecs, onOpenSizeGuide }) => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<'all' | 'club' | 'intl'>('all');

  const filteredProducts = products.filter((product) => {
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
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                filter === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Kits
            </button>
            <button
              onClick={() => setFilter('club')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                filter === 'club' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Club Editions
            </button>
            <button
              onClick={() => setFilter('intl')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                filter === 'intl' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              World Cup
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onOpenSpecs={onOpenSpecs}
              onOpenSizeGuide={onOpenSizeGuide}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
