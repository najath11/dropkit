import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

import { ProductCollection } from './components/ProductCollection';
import { TrustAndFaq } from './components/TrustAndFaq';
import { CommunityGallery } from './components/CommunityGallery';
import { SizeGuide } from './components/SizeGuide';
import { EarlyAccess } from './components/EarlyAccess';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { products } from './data/products';
import type { Product } from './types';

function MainApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dropkit_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return products;
  });

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...allProducts];
    setAllProducts(updated);
    localStorage.setItem('dropkit_products', JSON.stringify(updated));
  };

  const handleDeleteProduct = (id: string) => {
    const updated = allProducts.filter((p) => p.id !== id);
    setAllProducts(updated);
    localStorage.setItem('dropkit_products', JSON.stringify(updated));
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSpecs = () => {
    scrollTo('trust-faq');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E5E5E7] p-3 sm:p-4 md:p-6 lg:p-8 gap-6 md:gap-8 justify-center">
      {/* Rounded-Corner Card Hero Section */}
      <div className="w-full max-w-[1400px] mx-auto h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] min-h-[680px] max-h-[850px] rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between shrink-0">
        <Header 
          onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
          onOpenSpecs={() => handleOpenSpecs()}
          onOpenCollection={() => scrollTo('collection')}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
        
        <Hero 
          onExploreCollection={() => scrollTo('collection')}
          onExploreSpecs={() => handleOpenSpecs()}
        />
      </div>
      
      <main className="flex-grow flex flex-col gap-6 md:gap-8 w-full">
        <ProductCollection 
          products={allProducts}
          onOpenSpecs={handleOpenSpecs}
          onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
        />
        
        <TrustAndFaq />
        
        <CommunityGallery />
        
        <SizeGuide />
        
        <EarlyAccess />
      </main>

      <Footer 
        onOpenCollection={() => scrollTo('collection')}
        onOpenSpecs={() => handleOpenSpecs()}
        onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
      />

      <CartDrawer />

      <AdminModal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={allProducts}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

export default App;
