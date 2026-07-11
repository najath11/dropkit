import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSizeGuide: () => void;
  onOpenSpecs: () => void;
  onOpenCollection: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSpecs, onOpenCollection }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-6 left-0 right-0 z-50 w-full px-4 md:px-12 text-white bg-transparent">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <div className="flex-1 flex justify-start z-50">
          <a 
            href="#" 
            className="font-sans text-xl tracking-tight font-extrabold uppercase text-white hover:opacity-90 transition-opacity"
          >
            DropKit
          </a>
        </div>

        {/* Navigation - Centered Row */}
        <nav className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-bold uppercase tracking-wider text-white/70 bg-black/40 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
          <a 
            href="#"
            className="bg-white text-black px-4 py-1.5 rounded-full font-bold transition-all duration-150"
          >
            Home
          </a>
          <button 
            onClick={onOpenCollection} 
            className="text-white/60 hover:text-white transition-colors duration-150 cursor-pointer py-1"
          >
            Teams
          </button>
          <a 
            href="#early-access" 
            className="text-white/60 hover:text-white transition-colors duration-150 py-1"
          >
            Drops
          </a>
          <div className="relative py-1">
            <button 
              onClick={onOpenCollection} 
              className="text-white/60 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Kits
            </button>
            {/* Yellow New Badge */}
            <span className="absolute -top-1.5 -right-6 px-1.5 py-0.5 text-[8px] font-extrabold bg-brand-yellow text-black rounded-full uppercase leading-none scale-90 rotate-[12deg] tracking-wide">
              New
            </span>
          </div>
        </nav>

        {/* Utility Actions */}
        <div className="flex-1 flex items-center justify-end space-x-3 z-50">
          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-9 h-9 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={16} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 font-mono text-[9px] bg-brand-yellow text-black font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Icon Button */}
          <button 
            className="w-9 h-9 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="User Account"
          >
            <User size={16} strokeWidth={1.5} />
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown (Floating style) */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-3 items-center w-full bg-black/95 rounded-[24px] border border-white/10 p-5 shadow-2xl backdrop-blur-lg absolute left-0 right-0 top-14 mx-auto max-w-[95%] z-50">
            <a 
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-wider"
            >
              Home
            </a>
            <button 
              onClick={() => {
                onOpenCollection();
                setIsMobileMenuOpen(false);
              }} 
              className="w-full text-center text-white/70 hover:text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer py-1.5"
            >
              Teams
            </button>
            <a 
              href="#early-access" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center text-white/70 hover:text-white font-bold text-[10px] uppercase tracking-wider py-1.5"
            >
              Drops
            </a>
            <div className="relative w-full flex flex-col items-center">
              <button 
                onClick={() => {
                  onOpenCollection();
                  setIsMobileMenuOpen(false);
                }} 
                className="text-white/70 hover:text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer py-1.5"
              >
                Kits
              </button>
              <span className="absolute top-1.5 right-[35%] px-1.5 py-0.5 text-[8px] font-extrabold bg-brand-yellow text-black rounded-full uppercase leading-none scale-90 rotate-[12deg]">
                New
              </span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
