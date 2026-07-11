import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { navigate } from '../utils/router';

interface HeaderProps {
  onOpenSizeGuide: () => void;
  onOpenSpecs: () => void;
  onOpenCollection: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCollection, onOpenAuth }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isLoggedIn, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUserClick = () => {
    onOpenAuth();
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="absolute top-6 left-0 right-0 z-50 w-full px-4 md:px-12 text-white bg-transparent">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <div className="flex-1 flex justify-start z-50">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="font-sans text-xl tracking-tight font-extrabold uppercase text-white hover:opacity-90 transition-opacity"
          >
            DropKit
          </a>
        </div>

        {/* Navigation - Centered Row */}
        <nav className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-bold uppercase tracking-wider text-white/70 bg-black/40 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
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
          {isAdmin && (
            <button 
              onClick={() => navigate('/admin')} 
              className="text-[#EAEF30] hover:text-white font-bold transition-colors duration-150 cursor-pointer py-1 border-l border-white/15 pl-4"
            >
              Admin Panel
            </button>
          )}
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

          {/* User Icon / Avatar Button */}
          <button 
            onClick={handleUserClick}
            className={`w-9 h-9 rounded-full border backdrop-blur-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer relative ${
              isLoggedIn
                ? isAdmin
                  ? 'border-[#EAEF30]/40 bg-[#EAEF30]/10 text-[#EAEF30]'
                  : 'border-white/20 bg-white/10 text-white'
                : 'border-white/15 bg-black/40 text-white hover:bg-white/10'
            }`}
            aria-label="User Account"
          >
            {isLoggedIn && user ? (
              <span className="text-[10px] font-bold uppercase">{getInitials(user.name)}</span>
            ) : (
              <User size={16} strokeWidth={1.5} />
            )}
            {/* Online indicator */}
            {isLoggedIn && (
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0c101a] ${isAdmin ? 'bg-[#EAEF30]' : 'bg-green-400'}`} />
            )}
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
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                navigate('/');
              }}
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
            {isAdmin && (
              <button 
                onClick={() => {
                  navigate('/admin');
                  setIsMobileMenuOpen(false);
                }} 
                className="w-full text-center text-[#EAEF30] hover:text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer py-2 border border-[#EAEF30]/25 bg-[#EAEF30]/5 rounded-xl mt-2"
              >
                Admin Panel
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
