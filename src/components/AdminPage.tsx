import React, { useState, useEffect } from 'react';
import { 
  Lock, ShoppingBag, Plus, Trash2, Edit3, Image as ImageIcon, 
  TrendingUp, DollarSign, Users, Settings, ChevronRight, ArrowLeft,
  Shield, AlertTriangle, Save, ShoppingCart, RefreshCw, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';
import type { Product } from '../types';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (updatedProduct: Product) => void;
}

interface Order {
  id: string;
  email: string;
  name: string;
  date: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
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

  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      let initW = 0;
      let initH = 0;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerRatio = containerW / containerH;

      if (imgRatio > containerRatio) {
        initH = containerH;
        initW = containerH * imgRatio;
      } else {
        initW = containerW;
        initH = containerW / imgRatio;
      }

      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
        initW,
        initH
      });
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

    ctx.fillStyle = '#08090b';
    ctx.fillRect(0, 0, 600, 800);

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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      
      <div className="relative z-10 w-full max-w-md bg-[#0e121f] border border-white/10 rounded-[28px] p-6 flex flex-col items-center gap-6 shadow-2xl">
        <div className="text-center space-y-1">
          <h4 className="font-sans font-black uppercase text-sm text-white">Crop Jersey Photo</h4>
          <p className="text-[9px] text-neutral-400 font-mono">DRAG TO PAN • SLIDE TO ZOOM</p>
        </div>

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
          <div className="absolute inset-0 border border-[#EAEF30]/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-x-0 top-1/3 border-b border-white/10 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/3 border-b border-white/10 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/3 border-r border-white/10 pointer-events-none" />
          <div className="absolute inset-y-0 left-2/3 border-r border-white/10 pointer-events-none" />
        </div>

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

        <div className="flex gap-3 w-full px-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer font-mono"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 py-2 bg-[#EAEF30] text-black hover:opacity-90 text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer font-mono"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onEditProduct
}) => {
  const { isAdmin, login } = useAuth();
  
  // Navigation & Authentication states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active panel tab: 'dashboard' | 'orders' | 'catalog' | 'users' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'catalog' | 'users' | 'settings'>('dashboard');

  // Sales and Order state
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Catalog Management States
  const [catalogSearch, setCatalogSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form inputs for Add/Edit
  const [formName, setFormName] = useState('');
  const [formCodename, setFormCodename] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState<'club' | 'intl'>('club');
  const [formImage, setFormImage] = useState('');
  const [formBackImage, setFormBackImage] = useState('');
  const [formDescription, setFormDescription] = useState('');
  
  // Advanced Form Inputs
  const [formComposition, setFormComposition] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formDragCoef, setFormDragCoef] = useState('');
  const [formReclaimed, setFormReclaimed] = useState('');
  const [formFeatures, setFormFeatures] = useState(''); // Comma-separated list
  const [formDetails, setFormDetails] = useState(''); // Newline-separated list
  const [formColors, setFormColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Official Colorway', hex: '#EAEF30' }
  ]);
  const [formColorName, setFormColorName] = useState('');
  const [formColorHex, setFormColorHex] = useState('#ffffff');
  const [formSizes, setFormSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);

  // Users Database States
  const [users, setUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');

  // Store Configuration Settings
  const [promoCodeActive, setPromoCodeActive] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState('10');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [earlyAccessPhase, setEarlyAccessPhase] = useState(true);

  // Cropping variables
  const [croppingSrc, setCroppingSrc] = useState<string | null>(null);
  const [croppingTarget, setCroppingTarget] = useState<'front' | 'back' | null>(null);

  // Load orders and users on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('dropkit_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed dummy mock orders if none exist
      const mockOrders: Order[] = [
        {
          id: 'DK-794021',
          email: 'customer@gmail.com',
          name: 'Muhammed Salman',
          date: new Date(Date.now() - 4 * 3600000).toISOString(),
          items: [
            {
              id: 'js-01',
              name: 'MADRID 24/25 HOME KIT',
              price: 195,
              quantity: 1,
              size: 'M',
              color: 'Triple White & Gold',
              image: '/assets/jersey_football_madrid_front.png'
            }
          ],
          total: 195,
          status: 'Delivered'
        },
        {
          id: 'DK-321045',
          email: 'guest_user@gmail.com',
          name: 'Sarah Connor',
          date: new Date(Date.now() - 24 * 3600000).toISOString(),
          items: [
            {
              id: 'js-02',
              name: 'ARGENTINA 24/25 HOME KIT',
              price: 220,
              quantity: 2,
              size: 'L',
              color: 'Celeste Blue & White',
              image: '/assets/jersey_football_argentina.png'
            }
          ],
          total: 440,
          status: 'Shipped'
        },
        {
          id: 'DK-109283',
          email: 'njnajath88@gmail.com',
          name: 'Muhammed Najath K',
          date: new Date(Date.now() - 48 * 3600000).toISOString(),
          items: [
            {
              id: 'js-05',
              name: 'BARCELONA 24/25 HOME KIT',
              price: 205,
              quantity: 1,
              size: 'S',
              color: 'Blaugrana Stripes',
              image: '/assets/jersey_football_barca_front.jpg'
            }
          ],
          total: 205,
          status: 'Pending'
        }
      ];
      localStorage.setItem('dropkit_orders', JSON.stringify(mockOrders));
      setOrders(mockOrders);
    }

    // Load registered users
    const savedUsers = localStorage.getItem('dropkit_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const result = await login(emailInput.trim(), passwordInput);
    if (!result.success) {
      setAuthError(result.error || 'Authentication credentials rejected.');
    }
  };

  // Sync orders to localStorage on change
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('dropkit_orders', JSON.stringify(updatedOrders));
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrders(updated);
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      const updated = orders.filter(o => o.id !== orderId);
      saveOrders(updated);
    }
  };

  // Delete User
  const handleDeleteUser = (email: string) => {
    if (window.confirm(`Delete user account associated with ${email}?`)) {
      const updatedUsers = users.filter(u => u.email !== email);
      setUsers(updatedUsers);
      localStorage.setItem('dropkit_users', JSON.stringify(updatedUsers));
    }
  };

  // Image Upload / Cropper Helpers
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
      setFormImage(croppedUrl);
    } else if (croppingTarget === 'back') {
      setFormBackImage(croppedUrl);
    }
    setCroppingSrc(null);
    setCroppingTarget(null);
  };

  // Prepopulate form for editing
  const initiateEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    
    setFormName(product.name);
    setFormCodename(product.codename);
    setFormPrice(product.price.toString());
    setFormCategory(product.category);
    setFormImage(product.image);
    setFormBackImage(product.backImage || '');
    setFormDescription(product.description || '');

    // Advanced attributes
    setFormComposition(product.fabric.composition);
    setFormWeight(product.fabric.weight);
    setFormOrigin(product.fabric.origin);
    setFormDragCoef(product.fabric.dragCoef || '');
    setFormReclaimed(product.fabric.reclaimedPercentage || '');
    setFormFeatures(product.fabric.features.join(', '));
    setFormDetails(product.details.join('\n'));
    setFormColors(product.colors || []);
    setFormSizes(product.sizes || []);
  };

  // Prepopulate form for adding new
  const initiateAdd = () => {
    setEditingProduct(null);
    setIsAddingNew(true);

    setFormName('');
    setFormCodename('');
    setFormPrice('');
    setFormCategory('club');
    setFormImage('');
    setFormBackImage('');
    setFormDescription('');
    setFormComposition('100% Recycled Polyester');
    setFormWeight('110 gsm');
    setFormOrigin('Como, Italy');
    setFormDragCoef('0.320 CdA');
    setFormReclaimed('90%');
    setFormFeatures('Moisture Channels, Anti-cling Deboss, Aerodynamic Fit');
    setFormDetails('Double lockstitch flat seams\nHeat-pressed silicone emblems\nUnderarm micro ventilation grids');
    setFormColors([{ name: 'Official Colorway', hex: '#EAEF30' }]);
    setFormSizes(['S', 'M', 'L', 'XL']);
  };

  const [isUploading, setIsUploading] = useState(false);

  // Form submit handler (both Add & Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice || isUploading) return;

    setIsUploading(true);
    const parsedPrice = parseFloat(formPrice) || 120;
    const detailsArray = formDetails.split('\n').map(d => d.trim()).filter(d => d !== '');
    const featuresArray = formFeatures.split(',').map(f => f.trim()).filter(f => f !== '');

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `custom-${Date.now()}`,
      name: formName.toUpperCase(),
      codename: formCodename || 'Technical Kit Drop',
      price: parsedPrice,
      category: formCategory,
      description: formDescription || 'A technical release engineered to meet professional performance expectations and aerodynamic efficiency.',
      details: detailsArray.length > 0 ? detailsArray : ['Technical active filament composition', 'Laser perforation zones'],
      fabric: {
        composition: formComposition || '100% Recycled Polyamide',
        weight: formWeight || '115 gsm',
        origin: formOrigin || 'Treviso, Italy',
        features: featuresArray.length > 0 ? featuresArray : ['Thermoregulation mesh'],
        dragCoef: formDragCoef || undefined,
        reclaimedPercentage: formReclaimed || undefined
      },
      colors: formColors.length > 0 ? formColors : [{ name: 'Official Colorway', hex: '#EAEF30' }],
      sizes: formSizes.length > 0 ? formSizes : ['S', 'M', 'L', 'XL'],
      image: formImage.trim() || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
      backImage: formBackImage.trim() || undefined
    };

    // Simulate network delay to show the upload bar
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (editingProduct) {
      onEditProduct(productPayload);
      setEditingProduct(null);
    } else {
      onAddProduct(productPayload);
      setIsAddingNew(false);
    }

    // Reset fields
    setFormName('');
    setFormCodename('');
    setFormPrice('');
    setIsUploading(false);
  };

  const handleAddColor = () => {
    if (!formColorName.trim()) return;
    setFormColors([...formColors, { name: formColorName.trim(), hex: formColorHex }]);
    setFormColorName('');
    setFormColorHex('#ffffff');
  };

  const handleRemoveColor = (index: number) => {
    setFormColors(formColors.filter((_, i) => i !== index));
  };

  const handleToggleSize = (size: string) => {
    if (formSizes.includes(size)) {
      setFormSizes(formSizes.filter(s => s !== size));
    } else {
      setFormSizes([...formSizes, size].sort());
    }
  };

  // Sales Calculation helpers
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const unitsSold = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.items.reduce((acc, item) => acc + item.quantity, 0), 0);

  const nonCancelledOrders = orders.filter(o => o.status !== 'Cancelled');
  const avgOrderValue = nonCancelledOrders.length > 0 ? Math.round(totalRevenue / nonCancelledOrders.length) : 0;

  // Filter products by search query
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
    p.codename.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  // Filter users by search query
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Access Restriction Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#08090b] flex items-center justify-center p-4">
        {/* Neon accent orb decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#EAEF30]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="relative w-full max-w-md bg-[#0c101a] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-[#EAEF30]">
              <Lock size={22} />
            </div>
            <h2 className="font-sans font-black uppercase text-xl text-white tracking-wider">RESTRICTED INTERFACE</h2>
            <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">DropKit Operations Terminal</p>
          </div>

          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1.5">
                Authorized Credentials Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="njnajath88@gmail.com"
                className="w-full bg-black/60 border border-white/10 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-xl transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1.5">
                Passcode / Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-white/10 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-xl transition-all"
              />
            </div>

            {authError && (
              <p className="text-[10px] text-red-400 font-mono text-center uppercase tracking-wider bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all rounded-xl font-sans cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#EAEF30]/10"
            >
              Unlock Console
            </button>
          </form>

          <div className="border-t border-white/5 pt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-wider flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft size={10} /> Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Console Dashboard
  return (
    <div className="min-h-screen bg-[#08090b] text-white font-sans flex flex-col">
      {/* Top Console Bar */}
      <header className="border-b border-white/10 bg-[#0c101a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EAEF30]/10 border border-[#EAEF30]/30 flex items-center justify-center text-[#EAEF30]">
            <Shield size={16} />
          </div>
          <div>
            <h1 className="font-sans font-black text-sm uppercase tracking-wider text-white">DropKit Admin Console</h1>
            <p className="text-[8px] text-neutral-400 font-mono tracking-widest uppercase">System Core Version 1.0.4 • Connected</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all text-neutral-300"
          >
            <ArrowLeft size={12} /> Storefront
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#EAEF30] font-bold">Admin Active</span>
          </div>
        </div>
      </header>

      {/* Main Console Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-white/10 bg-[#0c101a] flex flex-col p-4 gap-1">
          <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest px-3 mb-2">Workspace Navigation</div>
          
          <button
            onClick={() => { setActiveTab('dashboard'); setIsAddingNew(false); setEditingProduct(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#EAEF30] text-black font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp size={14} />
              <span>Sales Overview</span>
            </div>
            <ChevronRight size={12} />
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setIsAddingNew(false); setEditingProduct(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#EAEF30] text-black font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart size={14} />
              <span>Order Queue</span>
            </div>
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold font-sans ${activeTab === 'orders' ? 'bg-black text-[#EAEF30]' : 'bg-[#EAEF30] text-black'}`}>
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
            <ChevronRight size={12} />
          </button>

          <button
            onClick={() => { setActiveTab('catalog'); setIsAddingNew(false); setEditingProduct(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'catalog' ? 'bg-[#EAEF30] text-black font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={14} />
              <span>Jersey Catalog</span>
            </div>
            <ChevronRight size={12} />
          </button>

          <button
            onClick={() => { setActiveTab('users'); setIsAddingNew(false); setEditingProduct(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-[#EAEF30] text-black font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users size={14} />
              <span>Users Base</span>
            </div>
            <ChevronRight size={12} />
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setIsAddingNew(false); setEditingProduct(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#EAEF30] text-black font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={14} />
              <span>Configurations</span>
            </div>
            <ChevronRight size={12} />
          </button>

          <div className="mt-auto border-t border-white/5 pt-4 space-y-2">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center justify-between font-mono text-[8px] text-neutral-400 uppercase">
                <span>Current Discount:</span>
                <span className="text-[#EAEF30] font-bold">{promoCodeActive ? `${promoDiscount}%` : 'INACTIVE'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[8px] text-neutral-400 uppercase mt-1">
                <span>Phase Drops:</span>
                <span className="text-white font-bold">{earlyAccessPhase ? 'EARLY LOCK' : 'PUBLIC'}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content workspace panel */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1400px]">
          
          {/* ==================== DASHBOARD PANEL ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black uppercase text-lg text-white">Sales & Performance Analytics</h2>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">SYNC STATUS: NORMAL</div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1 */}
                <div className="bg-[#0c101a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Total Net Revenue</p>
                    <h3 className="font-mono text-2xl font-bold text-[#EAEF30]">₹{totalRevenue}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#EAEF30]/10 border border-[#EAEF30]/20 flex items-center justify-center text-[#EAEF30]">
                    <DollarSign size={18} />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0c101a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Total Orders Logged</p>
                    <h3 className="font-mono text-2xl font-bold text-white">{orders.length}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShoppingCart size={18} />
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0c101a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Jersey Units Dispatched</p>
                    <h3 className="font-mono text-2xl font-bold text-white">{unitsSold}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <ShoppingBag size={18} />
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#0c101a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Average Order Value</p>
                    <h3 className="font-mono text-2xl font-bold text-[#EAEF30]">₹{avgOrderValue}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <TrendingUp size={18} />
                  </div>
                </div>
              </div>

              {/* Chart section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Trend line graph */}
                <div className="lg:col-span-2 bg-[#0c101a] border border-white/10 p-6 rounded-2xl space-y-4">
                  <h4 className="font-sans font-black uppercase text-xs tracking-wider">Weekly Requisition Volume Trend</h4>
                  
                  {/* Custom SVG line plot */}
                  <div className="w-full h-48 bg-black/45 rounded-xl border border-white/5 p-2 relative overflow-hidden flex items-end">
                    <svg viewBox="0 0 500 100" className="w-full h-36 overflow-visible">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EAEF30" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#EAEF30" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area */}
                      <path
                        d="M 10 90 L 90 70 L 170 85 L 250 40 L 330 65 L 410 20 L 490 35 L 490 100 L 10 100 Z"
                        fill="url(#chartGrad)"
                      />
                      {/* Grid lines */}
                      <line x1="10" y1="20" x2="490" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="10" y1="50" x2="490" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="10" y1="80" x2="490" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />

                      {/* Line */}
                      <path
                        d="M 10 90 Q 90 70 170 85 T 250 40 T 330 65 T 410 20 T 490 35"
                        fill="none"
                        stroke="#EAEF30"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Data Dots */}
                      <circle cx="90" cy="70" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                      <circle cx="170" cy="85" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                      <circle cx="250" cy="40" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                      <circle cx="330" cy="65" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                      <circle cx="410" cy="20" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                      <circle cx="490" cy="35" r="4" fill="#08090b" stroke="#EAEF30" strokeWidth="2.5" />
                    </svg>

                    {/* X-axis legends */}
                    <div className="absolute bottom-1.5 inset-x-2 flex justify-between text-[8px] font-mono text-neutral-500 uppercase">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Categories & Alerts */}
                <div className="bg-[#0c101a] border border-white/10 p-6 rounded-2xl space-y-5">
                  <h4 className="font-sans font-black uppercase text-xs tracking-wider">Catalog Allocation Mix</h4>
                  
                  {/* Category Breakdown list */}
                  <div className="space-y-4 font-sans text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase mb-1">
                        <span>Club Collection ({products.filter(p => p.category === 'club').length} Kits)</span>
                        <span>{Math.round((products.filter(p => p.category === 'club').length / products.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#EAEF30] h-full" 
                          style={{ width: `${(products.filter(p => p.category === 'club').length / products.length) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase mb-1">
                        <span>International Collection ({products.filter(p => p.category === 'intl').length} Kits)</span>
                        <span>{Math.round((products.filter(p => p.category === 'intl').length / products.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-400 h-full" 
                          style={{ width: `${(products.filter(p => p.category === 'intl').length / products.length) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">SYSTEM LOG ALERT:</div>
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-xl flex items-start gap-2.5">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      <div className="text-[9px] font-mono leading-relaxed">
                        <span className="font-extrabold uppercase block">Stock Reorder Required</span>
                        PSG and Liverpool kits sizes 'XS' and 'S' dropped below set threshold of {lowStockThreshold} units.
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Orders Overview table */}
              <div className="bg-[#0c101a] border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <h4 className="font-sans font-black uppercase text-xs tracking-wider">Recent System Requests</h4>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-[9px] font-mono text-[#EAEF30] uppercase tracking-wider hover:underline"
                  >
                    View All Orders
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-sans text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 bg-black/20 font-mono text-[9px] text-neutral-400 uppercase">
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Requestor Name</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Items Count</th>
                        <th className="px-6 py-3">Req Total</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-white">{o.id}</td>
                          <td className="px-6 py-4">{o.name}</td>
                          <td className="px-6 py-4 text-neutral-400 font-mono">{new Date(o.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-mono">{o.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                          <td className="px-6 py-4 font-mono font-bold text-[#EAEF30]">₹{o.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] font-bold uppercase ${
                              o.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                              o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              o.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== ORDERS PANEL ==================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black uppercase text-lg text-white">Requisition Order Queue</h2>
                <div className="font-mono text-[9px] text-[#EAEF30] font-bold uppercase">{orders.length} Active System Receipts</div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-20 bg-[#0c101a] border border-white/10 rounded-2xl text-neutral-400 text-xs">
                  No orders have been submitted to the local storefront database registry yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-[#0c101a] border border-white/10 rounded-2xl overflow-hidden">
                      {/* Order Summary Header */}
                      <div className="bg-black/30 px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="font-mono font-bold text-white text-xs">{order.id}</span>
                          <span className="text-neutral-500 text-[10px]">|</span>
                          <span className="text-neutral-400 text-[10px] font-mono">{new Date(order.date).toLocaleString()}</span>
                          <span className="text-neutral-500 text-[10px]">|</span>
                          <span className="text-xs text-neutral-300 font-sans">{order.name} ({order.email})</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Status Badge Dropdown */}
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[8px] text-neutral-400 uppercase">Status:</span>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="bg-black border border-white/10 text-white font-mono text-[10px] px-2 py-1 rounded-md focus:outline-none focus:border-[#EAEF30] cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="w-7 h-7 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 flex items-center justify-center cursor-pointer transition-all"
                            title="Delete Order Record"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Order items lists */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0 gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-10 h-10 object-cover rounded-lg border border-white/10 shrink-0" 
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800';
                                  }}
                                />
                                <div className="min-w-0">
                                  <p className="font-sans font-bold text-xs text-white uppercase truncate leading-none">{item.name}</p>
                                  <p className="font-mono text-[9px] text-neutral-400 mt-1">
                                    SIZE: {item.size} // COLOR: {item.color}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-6 font-mono text-xs">
                                <span className="text-neutral-400">₹{item.price} x {item.quantity}</span>
                                <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order billing total */}
                        <div className="border-t border-white/5 mt-4 pt-4 flex justify-between items-end">
                          <span className="font-mono text-[9px] text-neutral-400 uppercase">Requisition total billing payload:</span>
                          <span className="font-mono text-sm font-bold text-[#EAEF30]">₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== JERSEY CATALOG PANEL ==================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Conditional Form Render: Add/Edit Product */}
              {(isAddingNew || editingProduct) ? (
                <div className="bg-[#0c101a] border border-white/10 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="font-sans font-black uppercase text-sm text-white flex items-center gap-2">
                      <Save size={16} className="text-[#EAEF30]" />
                      {editingProduct ? `Edit System Jersey: ${editingProduct.name}` : 'Introduce New Speedwear Drop'}
                    </h3>
                    <button
                      onClick={() => { setIsAddingNew(false); setEditingProduct(null); }}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md font-mono text-[9px] uppercase tracking-wider cursor-pointer"
                    >
                      Cancel Form
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-5">
                    
                    {/* Basic properties */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Jersey Drop Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. VENICE 24/25 THIRD KIT"
                          className="w-full bg-black/60 border border-white/10 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Codename / Subtitle
                        </label>
                        <input
                          type="text"
                          value={formCodename}
                          onChange={(e) => setFormCodename(e.target.value)}
                          placeholder="e.g. Venezia Arancioneroverde"
                          className="w-full bg-black/60 border border-white/10 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Price in INR (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          placeholder="e.g. 190"
                          className="w-full bg-black/60 border border-white/10 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Fabric Category
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as 'club' | 'intl')}
                          className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg cursor-pointer"
                        >
                          <option value="club">Club Edition</option>
                          <option value="intl">International / Cup Edition</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Product Overview Description
                        </label>
                        <input
                          type="text"
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="Short summary of design and technical release notes..."
                          className="w-full bg-black/60 border border-white/10 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Image Pickers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-white/5 bg-black/35 rounded-xl">
                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Front Side Photo *</span>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            placeholder="Direct image URL (or select device file to crop)"
                            className="w-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                          />
                          <div className="flex items-center gap-3">
                            <div className="relative overflow-hidden px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-[9px] font-mono uppercase cursor-pointer flex items-center gap-1">
                              <ImageIcon size={10} /> Choose Device File
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, 'front')} 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                              />
                            </div>
                            {formImage && (
                              <img src={formImage} className="w-9 h-9 object-cover rounded-md border border-white/10" alt="front preview" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Back Side Photo (Optional)</span>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={formBackImage}
                            onChange={(e) => setFormBackImage(e.target.value)}
                            placeholder="Direct image URL (or select device file to crop)"
                            className="w-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                          />
                          <div className="flex items-center gap-3">
                            <div className="relative overflow-hidden px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-[9px] font-mono uppercase cursor-pointer flex items-center gap-1">
                              <ImageIcon size={10} /> Choose Device File
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, 'back')} 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                              />
                            </div>
                            {formBackImage && (
                              <img src={formBackImage} className="w-9 h-9 object-cover rounded-md border border-white/10" alt="back preview" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Technical fields */}
                    <div className="space-y-4">
                      <h4 className="font-sans font-black uppercase text-[10px] text-white border-b border-white/5 pb-1">Technical Spec Matrix</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5">Composition</label>
                          <input
                            type="text"
                            value={formComposition}
                            onChange={(e) => setFormComposition(e.target.value)}
                            placeholder="e.g. 100% Recycled Poly"
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5">Weight</label>
                          <input
                            type="text"
                            value={formWeight}
                            onChange={(e) => setFormWeight(e.target.value)}
                            placeholder="e.g. 110 gsm"
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5">Fabric Origin</label>
                          <input
                            type="text"
                            value={formOrigin}
                            onChange={(e) => setFormOrigin(e.target.value)}
                            placeholder="e.g. Lombardy, Italy"
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5">Drag Coeff (CdA)</label>
                          <input
                            type="text"
                            value={formDragCoef}
                            onChange={(e) => setFormDragCoef(e.target.value)}
                            placeholder="e.g. 0.315 CdA"
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5">Reclaimed Ratio</label>
                          <input
                            type="text"
                            value={formReclaimed}
                            onChange={(e) => setFormReclaimed(e.target.value)}
                            placeholder="e.g. 92%"
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-1">
                            Aero Features (Comma-Separated Tags)
                          </label>
                          <input
                            type="text"
                            value={formFeatures}
                            onChange={(e) => setFormFeatures(e.target.value)}
                            placeholder="Aero Evaporation, Flat seams, Odor block"
                            className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 mb-1">
                            Details Bullet Points (One per line)
                          </label>
                          <textarea
                            value={formDetails}
                            onChange={(e) => setFormDetails(e.target.value)}
                            rows={3}
                            placeholder="Heat-applied logos&#10;Flat-locked flat cuffs"
                            className="w-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Colors & Sizes editor panels */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-white/5 bg-black/35 rounded-xl">
                      
                      {/* Color list config */}
                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Assigned Colors List</span>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Color Label (e.g., Onyx Black)"
                            value={formColorName}
                            onChange={(e) => setFormColorName(e.target.value)}
                            className="flex-grow bg-black border border-white/10 px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-md"
                          />
                          <input
                            type="color"
                            value={formColorHex}
                            onChange={(e) => setFormColorHex(e.target.value)}
                            className="w-10 h-7 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                          />
                          <button
                            type="button"
                            onClick={handleAddColor}
                            className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[#EAEF30] font-mono text-[10px] rounded-md uppercase"
                          >
                            Add
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {formColors.map((col, index) => (
                            <span 
                              key={index} 
                              className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-white/10 rounded-md text-[10px] font-mono text-neutral-300"
                            >
                              <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: col.hex }} />
                              <span>{col.name}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveColor(index)} 
                                className="text-red-400 hover:text-white ml-0.5 cursor-pointer font-bold"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sizes configuration checkboxes */}
                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Available Sizing Array</span>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                            const active = formSizes.includes(sz);
                            return (
                              <button
                                type="button"
                                key={sz}
                                onClick={() => handleToggleSize(sz)}
                                className={`w-10 py-1.5 border rounded-md font-mono text-xs uppercase tracking-wider cursor-pointer transition-all ${
                                  active 
                                    ? 'bg-[#EAEF30] text-black border-[#EAEF30] font-bold' 
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-col gap-2 relative">
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full py-3 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-70 transition-all cursor-pointer rounded-xl flex items-center justify-center gap-1.5 font-sans"
                      >
                        {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
                        {isUploading ? 'Committing to Catalog...' : 'Commit Changes to Catalog'}
                      </button>

                      {/* Loading Bar under the button */}
                      {isUploading && (
                        <div className="absolute -bottom-3 left-0 right-0 h-1 bg-black/40 rounded-full overflow-hidden">
                          <div className="h-full bg-[#EAEF30] animate-pulse w-full origin-left" style={{ animation: 'progress 1.5s ease-in-out infinite' }}></div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                /* Main product catalog display grid */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <h2 className="font-sans font-black uppercase text-lg text-white">Catalog Manager</h2>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-grow sm:flex-grow-0">
                        <input
                          type="text"
                          placeholder="Search jerseys..."
                          value={catalogSearch}
                          onChange={(e) => setCatalogSearch(e.target.value)}
                          className="w-full sm:w-60 bg-black/60 border border-white/10 px-3.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                        />
                        {catalogSearch && (
                          <button onClick={() => setCatalogSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white font-mono text-xs">
                            &times;
                          </button>
                        )}
                      </div>
                      <button
                        onClick={initiateAdd}
                        className="px-4 py-1.5 bg-[#EAEF30] text-black hover:opacity-90 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Drop
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((p) => {
                      const isCustom = p.id.startsWith('custom-');
                      return (
                        <div 
                          key={p.id}
                          className="bg-[#0c101a] border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-14 h-18 object-cover rounded-lg border border-white/10 shrink-0 bg-black"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800';
                              }}
                            />
                            <div className="min-w-0">
                              <span className="font-mono text-[8px] text-[#EAEF30] font-extrabold uppercase bg-[#EAEF30]/10 border border-[#EAEF30]/20 px-1.5 py-0.5 rounded-md">
                                {p.category === 'club' ? 'Club Edition' : 'Intl Edition'}
                              </span>
                              <h4 className="font-sans font-black text-xs text-white uppercase truncate mt-1.5 leading-none">
                                {p.name}
                              </h4>
                              <p className="font-mono text-[9px] text-neutral-400 mt-1">
                                {p.codename} // <span className="text-[#EAEF30]">₹{p.price}</span>
                              </p>
                              {isCustom && (
                                <p className="text-[8px] font-mono text-purple-400 font-bold uppercase mt-0.5">[ADMIN CUSTOM ADDED]</p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 shrink-0">
                            <button
                              onClick={() => initiateEdit(p)}
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-all"
                              title="Edit product specs"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${p.name} completely from store catalog?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 flex items-center justify-center cursor-pointer transition-all"
                              title="Delete Product"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== USERS BASE PANEL ==================== */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-3">
                <h2 className="font-sans font-black uppercase text-lg text-white">Registered Users Base</h2>
                
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full sm:w-60 bg-black/60 border border-white/10 px-3.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                />
              </div>

              {filteredUsers.length === 0 ? (
                <div className="text-center py-20 bg-[#0c101a] border border-white/10 rounded-2xl text-neutral-400 text-xs">
                  {users.length === 0 ? 'No user registrations found. All users exist in context session.' : 'No users match search criteria.'}
                </div>
              ) : (
                <div className="bg-[#0c101a] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse font-sans text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/5 bg-black/20 font-mono text-[9px] text-neutral-400 uppercase">
                          <th className="px-6 py-3">User Name</th>
                          <th className="px-6 py-3">Registered Email</th>
                          <th className="px-6 py-3">Authorized Password</th>
                          <th className="px-6 py-3">Role Authority</th>
                          <th className="px-6 py-3 text-right">Delete Account</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((u, i) => {
                          const isSelfAdmin = u.email.toLowerCase() === 'njnajath88@gmail.com';
                          return (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-bold text-white uppercase">{u.name}</td>
                              <td className="px-6 py-4 font-mono text-neutral-300">{u.email}</td>
                              <td className="px-6 py-4 font-mono text-neutral-500">•••••••• (md5)</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[8px] font-bold uppercase ${
                                  isSelfAdmin 
                                    ? 'bg-[#EAEF30]/10 border border-[#EAEF30]/20 text-[#EAEF30]' 
                                    : 'bg-white/5 border border-white/10 text-neutral-400'
                                }`}>
                                  {isSelfAdmin ? <Shield size={8} /> : null}
                                  {isSelfAdmin ? 'Admin' : 'Customer'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteUser(u.email)}
                                  disabled={isSelfAdmin}
                                  className={`w-7 h-7 rounded-md inline-flex items-center justify-center cursor-pointer transition-all ${
                                    isSelfAdmin 
                                      ? 'bg-neutral-800/10 text-neutral-600 border border-transparent cursor-not-allowed' 
                                      : 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20'
                                  }`}
                                  title={isSelfAdmin ? 'Cannot delete developer root admin' : 'Delete user account record'}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== CONFIGURATIONS PANEL ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-white/5 pb-3">
                <h2 className="font-sans font-black uppercase text-lg text-white">Storefront System Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Promo Setting Card */}
                <div className="bg-[#0c101a] border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider">Promotion Discount Scheme</h3>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] font-bold uppercase ${
                      promoCodeActive ? 'bg-green-500/10 text-green-400' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {promoCodeActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-xs font-bold">Apply Storefront Markdown</span>
                        <span className="block text-[9px] text-neutral-400 font-mono">ENACTS FLAT DISCOUNT RATE STOREWIDE</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={promoCodeActive}
                        onChange={(e) => setPromoCodeActive(e.target.checked)}
                        className="w-9 h-5 accent-[#EAEF30] cursor-pointer rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">Discount Rate Percentage (%)</label>
                      <input
                        type="number"
                        value={promoDiscount}
                        disabled={!promoCodeActive}
                        onChange={(e) => setPromoDiscount(e.target.value)}
                        className="w-full max-w-[120px] bg-black/60 disabled:opacity-40 border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory Settings Card */}
                <div className="bg-[#0c101a] border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider">Stock Alert Limits</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-xs font-bold">Simulated Early Access Drop Gate</span>
                        <span className="block text-[9px] text-neutral-400 font-mono">LOCKS DROPS AND ENABLES FOOTER ACCESS SYSTEM</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={earlyAccessPhase}
                        onChange={(e) => setEarlyAccessPhase(e.target.checked)}
                        className="w-9 h-5 accent-[#EAEF30] cursor-pointer rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-1">Low Inventory Alert Threshold (Units)</label>
                      <input
                        type="number"
                        value={lowStockThreshold}
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                        className="w-full max-w-[120px] bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#EAEF30] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* simulated notification config */}
              <div className="bg-[#0c101a] border border-white/10 p-6 rounded-2xl space-y-3">
                <h4 className="font-sans font-black uppercase text-xs tracking-wider">System Operations State</h4>
                <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                  The local dashboard is connected directly to local client assets. Modifying these rules changes the display styles, product counts, and billing calculators synchronously.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all localStorage data (restores default product catalog & clears order logs)?')) {
                        localStorage.removeItem('dropkit_products');
                        localStorage.removeItem('dropkit_orders');
                        localStorage.removeItem('dropkit_users');
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <RefreshCw size={12} /> Factory Reset Database
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Embedded Crop Modal Component */}
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
