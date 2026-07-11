import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    checkoutCart
  } = useCart();

  const { user, isLoggedIn } = useAuth();
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutError('');
    let email = '';
    let name = '';

    if (isLoggedIn && user) {
      email = user.email;
      name = user.name;
    } else {
      if (!guestName.trim() || !guestEmail.trim()) {
        setCheckoutError('Please enter guest details or sign in.');
        return;
      }
      if (!guestEmail.includes('@')) {
        setCheckoutError('Please enter a valid email address.');
        return;
      }
      email = guestEmail.trim();
      name = guestName.trim();
    }

    const result = checkoutCart(email, name);
    if (result.success && result.orderId) {
      setOrderSuccessId(result.orderId);
      // Reset guest fields
      setGuestName('');
      setGuestEmail('');
    } else {
      setCheckoutError(result.error || 'Failed to complete checkout.');
    }
  };

  const handleCloseSuccess = () => {
    setOrderSuccessId(null);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={orderSuccessId ? handleCloseSuccess : () => setIsCartOpen(false)}
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
              onClick={orderSuccessId ? handleCloseSuccess : () => setIsCartOpen(false)}
              className="p-1 hover:text-[#EAEF30] transition-colors duration-150 cursor-pointer text-white"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Items Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderSuccessId ? (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 h-full">
                <CheckCircle size={56} className="text-[#EAEF30] animate-bounce" />
                <div className="space-y-2">
                  <h3 className="font-display uppercase text-lg text-white">Allocation Secured</h3>
                  <p className="text-[10px] text-[#EAEF30] font-mono tracking-widest uppercase">ORDER ID: {orderSuccessId}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xs font-sans">
                  Your kit allocation is registered successfully. An automated invoice details check and dispatch scheduling has been added to our queue.
                </p>
                <button
                  onClick={handleCloseSuccess}
                  className="w-full max-w-[200px] py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all rounded-lg font-mono cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
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
          {!orderSuccessId && cartItems.length > 0 && (
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
              
              {/* User authentication check / Guest info form */}
              {isLoggedIn && user ? (
                <div className="flex items-center justify-between text-neutral-300 font-mono text-[9px] border border-white/10 bg-white/5 px-3 py-2 rounded-lg">
                  <span>CHECKING OUT AS:</span>
                  <span className="text-[#EAEF30] font-bold uppercase">{user.name}</span>
                </div>
              ) : (
                <div className="space-y-2 border border-white/10 bg-white/5 p-3 rounded-lg">
                  <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                    Guest Requisition Details:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="bg-black/60 border border-white/10 px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-[#EAEF30] rounded-md font-mono"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="bg-black/60 border border-white/10 px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-[#EAEF30] rounded-md font-mono"
                    />
                  </div>
                </div>
              )}

              {checkoutError && (
                <p className="text-[10px] text-red-400 font-mono text-center uppercase tracking-wider">
                  {checkoutError}
                </p>
              )}

              <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                Taxes, freight, and custom duties calculated during secure processing. Allocations are reserved in database registry for 20 minutes.
              </p>

              <button
                className="w-full py-3.5 bg-[#EAEF30] text-black hover:opacity-90 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2 rounded-lg shadow-md"
                onClick={handleCheckout}
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

