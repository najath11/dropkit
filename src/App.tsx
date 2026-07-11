import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

import { ProductCollection } from './components/ProductCollection';
import { TrustAndFaq } from './components/TrustAndFaq';
import { CommunityGallery } from './components/CommunityGallery';
import { SizeGuide } from './components/SizeGuide';
import { EarlyAccess } from './components/EarlyAccess';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';
import { AuthModal } from './components/AuthModal';
import { usePath } from './utils/router';
import type { Product } from './types';

function MainApp() {
  const path = usePath();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { products, refreshProducts } = useProducts();

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const { error } = await supabase.from('products').insert(newProduct);
      if (error) throw error;
      await refreshProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await refreshProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', updatedProduct.id);
      if (error) throw error;
      await refreshProducts();
    } catch (e) {
      console.error(e);
    }
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

  if (path === '/admin') {
    return (
      <AdminPage 
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E5E5E7] p-3 sm:p-4 md:p-6 lg:p-8 gap-6 md:gap-8 justify-center">
      {/* Rounded-Corner Card Hero Section */}
      <div className="w-full max-w-[1400px] mx-auto h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] min-h-[680px] max-h-[850px] rounded-[32px] md:rounded-[40px] bg-mesh-dark border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between shrink-0">
        <Header 
          onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
          onOpenSpecs={() => handleOpenSpecs()}
          onOpenCollection={() => scrollTo('collection')}
          onOpenAdmin={() => {}}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        
        <Hero 
          onExploreCollection={() => scrollTo('collection')}
          onExploreSpecs={() => handleOpenSpecs()}
        />
      </div>
      
      <main className="flex-grow flex flex-col gap-6 md:gap-8 w-full">
        <ProductCollection 
          products={products}
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

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
