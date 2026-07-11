import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

import { ProductCollection } from './components/ProductCollection';
import { TrustAndFaq } from './components/TrustAndFaq';
import { SizeGuide } from './components/SizeGuide';
import { EarlyAccess } from './components/EarlyAccess';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

function MainApp() {
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
        />
        
        <Hero 
          onExploreCollection={() => scrollTo('collection')}
          onExploreSpecs={() => handleOpenSpecs()}
        />
      </div>
      
      <main className="flex-grow flex flex-col gap-6 md:gap-8 w-full">
        <ProductCollection 
          onOpenSpecs={handleOpenSpecs}
          onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
        />
        
        <TrustAndFaq />
        
        <SizeGuide />
        
        <EarlyAccess />
      </main>

      <Footer 
        onOpenCollection={() => scrollTo('collection')}
        onOpenSpecs={() => handleOpenSpecs()}
        onOpenSizeGuide={() => scrollTo('sizing-authenticity')}
      />

      <CartDrawer />
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
