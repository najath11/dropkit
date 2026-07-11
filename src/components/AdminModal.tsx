import React, { useState } from 'react';
import { X, Lock, Unlock, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Form states for new product
  const [name, setName] = useState('');
  const [codename, setCodename] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'club' | 'intl'>('club');
  const [image, setImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '123') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    // Use default Unsplash athletic stock photo if no image provided
    const defaultFrontImg = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800';
    
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: name.toUpperCase(),
      codename: codename || 'Special Limited Release',
      price: parseFloat(price) || 150,
      category,
      description: description || 'A special collection technical kit engineered to meet the highest standards of professional comfort and legacy aesthetic.',
      details: [
        'Advanced active filament thermoregulation design',
        'Custom heat-applied emblems and graphics',
        'Double-needle lockstitch flat seams',
        'Engineered for maximum fit recovery and zero skin friction'
      ],
      fabric: {
        composition: '95% Recycled Polyamide, 5% Bio-Elastane',
        weight: '110 gsm',
        origin: 'Lombardy, Italy',
        features: ['Aero-velocity mesh cooling panels', 'Moisture channeling filament pattern'],
        dragCoef: '0.318 CdA',
        reclaimedPercentage: '95%'
      },
      colors: [
        { name: 'Official Club Colorway', hex: '#EAEF30' },
        { name: 'Shadow Black', hex: '#111111' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      image: image.trim() || defaultFrontImg,
      backImage: backImage.trim() || undefined
    };

    onAddProduct(newProduct);

    // Reset Form
    setName('');
    setCodename('');
    setPrice('');
    setCategory('club');
    setImage('');
    setBackImage('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main Panel */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0c101a] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-black/40">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Unlock className="text-[#EAEF30] w-5 h-5" />
            ) : (
              <Lock className="text-neutral-500 w-5 h-5" />
            )}
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
              {isAuthenticated ? 'DropKit Admin Console' : 'Authentication Required'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {!isAuthenticated ? (
            /* Login Screen */
            <form onSubmit={handleLogin} className="max-w-sm mx-auto py-12 space-y-5 text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Lock size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-display uppercase text-lg text-white">Enter Console PIN</h3>
                <p className="text-[10px] text-neutral-400 font-mono">AUTHORIZED PERSONNEL ONLY</p>
              </div>

              <div className="space-y-2">
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full bg-black border border-white/10 px-4 py-2.5 text-center text-xs font-mono text-white tracking-widest focus:outline-none focus:border-white rounded-lg"
                />
                {authError && (
                  <p className="text-red-500 font-mono text-[9px] uppercase tracking-wider">
                    Invalid PIN Code. Access Denied.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer rounded-lg font-sans"
              >
                Authenticate Session
              </button>
            </form>
          ) : (
            /* Admin Panel Dashboard */
            <div className="space-y-8">
              
              {/* Product Form */}
              <form onSubmit={handleAddProduct} className="space-y-4">
                <h3 className="font-display uppercase text-base text-white border-b border-white/5 pb-2 flex items-center gap-2">
                  <Plus size={16} className="text-[#EAEF30]" /> Add New Kit Drop
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Jersey Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. ITALY 24/25 HOME KIT"
                      className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Codename / Subtitle
                    </label>
                    <input
                      type="text"
                      value={codename}
                      onChange={(e) => setCodename(e.target.value)}
                      placeholder="e.g. Azzurri Special Edition"
                      className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Price (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 210"
                      className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as 'club' | 'intl')}
                      className="w-full bg-black/60 border border-white/10 px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    >
                      <option value="club">Club Edition</option>
                      <option value="intl">International / World Cup</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Front Image URL (Unsplash/Web Link)
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Leave blank for a premium default image"
                      className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                      Back Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={backImage}
                      onChange={(e) => setBackImage(e.target.value)}
                      placeholder="Paste back image URL for 5s auto-rotation"
                      className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                    Product Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Describe the fabric specs and release design..."
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white rounded-lg resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer rounded-lg flex items-center justify-center gap-1.5 font-sans"
                >
                  <ShoppingBag size={14} /> Publish Drop to Storefront
                </button>
              </form>

              {/* Manage/Delete Products List */}
              <div className="space-y-3">
                <h3 className="font-display uppercase text-base text-white border-b border-white/5 pb-2 flex items-center gap-2">
                  <ShoppingBag size={16} className="text-[#EAEF30]" /> Manage Catalog ({products.length} Products)
                </h3>
                <div className="max-h-[30vh] overflow-y-auto space-y-2 pr-1 border border-white/5 bg-black/20 p-2 rounded-xl">
                  {products.map((p) => {
                    const isCustom = p.id.startsWith('custom-');
                    return (
                      <div 
                        key={p.id}
                        className="flex items-center justify-between bg-black/40 border border-white/5 p-2 rounded-lg gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-8 h-8 object-cover rounded-md border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-mono text-[10px] text-white font-bold truncate leading-none">
                              {p.name}
                            </p>
                            <p className="font-mono text-[8px] text-neutral-400 mt-1">
                              {p.codename} // ₹{p.price} {isCustom && <span className="text-[#EAEF30] font-extrabold ml-1">[ADMIN ADDED]</span>}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                            isCustom 
                              ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20' 
                              : 'bg-neutral-800/10 text-neutral-500 border border-transparent cursor-not-allowed'
                          }`}
                          disabled={!isCustom}
                          title={isCustom ? 'Delete custom product' : 'Cannot delete default catalog items'}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
