import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Sheet */}
        <div className="w-screen max-w-md bg-[#0c101a]/95 border-l border-white/10 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 backdrop-blur-lg">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="font-sans font-black uppercase text-base tracking-wider text-white">Allocated Kit Systems</h2>
              <p className="font-mono text-[9px] text-neutral-400 tracking-tight mt-0.5">
                SPEEDWEAR REQUISITION CHECKLIST
              </p>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-[#EAEF30] transition-colors duration-150 cursor-pointer text-white"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Items Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <p className="text-neutral-400 text-xs">Allocations empty. Review the speedwear suite to assign kits.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="font-mono text-[10px] uppercase text-white hover:text-[#EAEF30] underline cursor-pointer"
                >
                  Return to Suite
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 border border-white/10 bg-white/5 rounded-xl p-4">
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-black/45 border border-white/10 shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover filter grayscale contrast-105"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-grow flex flex-col justify-between text-white">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans text-xs font-black uppercase tracking-wider text-white">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-[#EAEF30]">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                      
                      <div className="font-mono text-[9px] text-neutral-400 mt-1 space-x-2">
                        <span>SIZE: {item.selectedSize}</span>
                        <span>|</span>
                        <span>COLOR: {item.selectedColor}</span>
                      </div>
                    </div>

                    {/* Quantity Adjustment Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <div className="flex items-center space-x-2.5">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-5 h-5 border border-white/10 hover:border-white text-neutral-400 hover:text-white rounded-md flex items-center justify-center cursor-pointer transition-all duration-100 bg-white/5"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-mono text-xs text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-5 h-5 border border-white/10 hover:border-white text-neutral-400 hover:text-white rounded-md flex items-center justify-center cursor-pointer transition-all duration-100 bg-white/5"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-neutral-400 hover:text-[#C24A3F] transition-colors duration-150 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Subtotal / Checkout) */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/45 space-y-4">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                ALLOCATION SUMMARY
              </div>
              
              <div className="flex justify-between items-end">
                <span className="font-sans text-xs font-black uppercase tracking-wider text-white">Requisition Total</span>
                <span className="font-mono text-lg font-bold text-[#EAEF30]">
                  ₹{cartTotal}
                </span>
              </div>
              
              <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                Taxes, freight, and custom duties calculated during secure processing. Allocations are reserved in database registry for 20 minutes.
              </p>

              <button
                className="w-full py-3.5 bg-[#EAEF30] text-black hover:opacity-90 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2 rounded-lg shadow-md"
                onClick={() => alert('Allocation secure workflow initiated. (Connected to checkout API)')}
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
