import React, { useState } from 'react';
import { X, Lock, Unlock, ShoppingBag, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (id: string) => void;
}

interface CropperModalProps {
  src: string;
  onCancel: () => void;
  onSave: (croppedDataUrl: string) => void;
}

const CropperModal: React.FC<CropperModalProps> = ({ src, onCancel, onSave }) => {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0, initW: 0, initH: 0 });

  const containerW = 300;
  const containerH = 400;

  // Load image to get dimensions
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      let initW = 0;
      let initH = 0;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerRatio = containerW / containerH; // 3/4 = 0.75

      if (imgRatio > containerRatio) {
        // Image is wider than portrait container -> fit height, let width overflow
        initH = containerH;
        initW = containerH * imgRatio;
      } else {
        // Image is taller -> fit width, let height overflow
        initW = containerW;
        initH = containerW / imgRatio;
      }

      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
        initW,
        initH
      });
      // Center the image initially
      setPanX((containerW - initW) / 2);
      setPanY((containerH - initH) / 2);
      setImgElement(img);
    };
  }, [src]);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartX(clientX - panX);
    setStartY(clientY - panY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPanX(clientX - startX);
    setPanY(clientY - startY);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    if (!imgElement) return;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background with black
    ctx.fillStyle = '#08090b';
    ctx.fillRect(0, 0, 600, 800);

    // Draw the image scaled up by 2x (since canvas is 600x800 and preview is 300x400)
    ctx.drawImage(
      imgElement,
      panX * 2,
      panY * 2,
      imageSize.initW * zoom * 2,
      imageSize.initH * zoom * 2
    );

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSave(croppedDataUrl);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      
      {/* Cropper Container */}
      <div className="relative z-10 w-full max-w-md bg-[#0e121f] border border-white/10 rounded-[28px] p-6 flex flex-col items-center gap-6 shadow-2xl">
        <div className="text-center space-y-1">
          <h4 className="font-display uppercase text-sm text-white">Crop Jersey Photo</h4>
          <p className="text-[9px] text-neutral-400 font-mono">DRAG TO PAN • SLIDE TO ZOOM</p>
        </div>

        {/* Viewport Box (300x400) */}
        <div 
          className="relative w-[300px] h-[400px] border border-white/20 rounded-xl overflow-hidden bg-black cursor-move select-none"
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => {
            if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={handleEnd}
        >
          {imgElement && (
            <img
              src={src}
              alt="Cropping visual"
              draggable={false}
              className="absolute pointer-events-none select-none max-w-none origin-top-left"
              style={{
                left: `${panX}px`,
                top: `${panY}px`,
                width: `${imageSize.initW * zoom}px`,
                height: `${imageSize.initH * zoom}px`
              }}
            />
          )}
          {/* Aspect Ratio 3:4 Helper Grid Overlays */}
          <div className="absolute inset-0 border border-[#EAEF30]/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-x-0 top-1/3 border-b border-white/10 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/3 border-b border-white/10 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/3 border-r border-white/10 pointer-events-none" />
          <div className="absolute inset-y-0 left-2/3 border-r border-white/10 pointer-events-none" />
        </div>

        {/* Zoom Slider */}
        <div className="w-full space-y-1.5 px-4">
          <div className="flex justify-between text-[9px] font-mono text-neutral-400">
            <span>ZOOM</span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={zoom}
            onChange={(e) => {
              const nextZoom = parseFloat(e.target.value);
              setPanX((prev) => prev - (imageSize.initW * (nextZoom - zoom)) / 2);
              setPanY((prev) => prev - (imageSize.initH * (nextZoom - zoom)) / 2);
              setZoom(nextZoom);
            }}
            className="w-full accent-[#EAEF30]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full px-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 py-2 bg-[#EAEF30] text-black hover:opacity-90 text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

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

  // Active cropping picker state
  const [croppingSrc, setCroppingSrc] = useState<string | null>(null);
  const [croppingTarget, setCroppingTarget] = useState<'front' | 'back' | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCroppingSrc(reader.result);
          setCroppingTarget(target);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCrop = (croppedUrl: string) => {
    if (croppingTarget === 'front') {
      setImage(croppedUrl);
    } else if (croppingTarget === 'back') {
      setBackImage(croppedUrl);
    }
    setCroppingSrc(null);
    setCroppingTarget(null);
  };

  const handleRemovePhoto = (target: 'front' | 'back') => {
    if (target === 'front') {
      setImage('');
    } else {
      setBackImage('');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

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

                {/* Device Image Selectors & Crop Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  
                  {/* Front Photo Picker */}
                  <div className="space-y-1.5">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      Front Photo *
                    </span>
                    {!image ? (
                      <div className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 bg-black/40 hover:bg-black/60 hover:border-white/40 transition-all cursor-pointer relative group aspect-[3/2.2]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileChange(e, 'front')} 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                        <ImageIcon className="text-neutral-400 group-hover:text-white transition-colors mb-2" size={20} />
                        <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-bold text-center">Select Front Jersey Photo</span>
                        <span className="text-[7px] text-neutral-500 mt-1 font-mono text-center">Click to open device gallery / library</span>
                      </div>
                    ) : (
                      <div className="relative border border-white/10 rounded-xl overflow-hidden aspect-[4/3] max-w-[200px] bg-black/40 group">
                        <img src={image} alt="Front Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all">
                          <div className="relative">
                            <button type="button" className="px-2.5 py-1 bg-white text-black font-extrabold uppercase tracking-wider text-[8px] rounded-md hover:bg-neutral-200 cursor-pointer">
                              Replace
                            </button>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, 'front')} 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemovePhoto('front')}
                            className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold uppercase tracking-wider text-[8px] rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Back Photo Picker */}
                  <div className="space-y-1.5">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      Back Photo (Optional)
                    </span>
                    {!backImage ? (
                      <div className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 bg-black/40 hover:bg-black/60 hover:border-white/40 transition-all cursor-pointer relative group aspect-[3/2.2]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileChange(e, 'back')} 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                        <ImageIcon className="text-neutral-400 group-hover:text-white transition-colors mb-2" size={20} />
                        <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-bold text-center">Select Back Jersey Photo</span>
                        <span className="text-[7px] text-neutral-500 mt-1 font-mono text-center">Enables automatic 5s front/back flip</span>
                      </div>
                    ) : (
                      <div className="relative border border-white/10 rounded-xl overflow-hidden aspect-[4/3] max-w-[200px] bg-black/40 group">
                        <img src={backImage} alt="Back Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all">
                          <div className="relative">
                            <button type="button" className="px-2.5 py-1 bg-white text-black font-extrabold uppercase tracking-wider text-[8px] rounded-md hover:bg-neutral-200 cursor-pointer">
                              Replace
                            </button>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, 'back')} 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemovePhoto('back')}
                            className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold uppercase tracking-wider text-[8px] rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
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
                <div className="max-h-[22vh] overflow-y-auto space-y-2 pr-1 border border-white/5 bg-black/20 p-2 rounded-xl font-sans">
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

      {/* Image Cropper Modal */}
      {croppingSrc && (
        <CropperModal
          src={croppingSrc}
          onCancel={() => {
            setCroppingSrc(null);
            setCroppingTarget(null);
          }}
          onSave={handleSaveCrop}
        />
      )}
    </div>
  );
};
