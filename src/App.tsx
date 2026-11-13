import { useEffect, useState } from 'react';
import { DeliveryDrawer } from './components/DeliveryDrawer';
import { FooterVisitSection } from './components/FooterVisitSection';
import { HeroSection } from './components/HeroSection';
import { LocalDeliverySection } from './components/LocalDeliverySection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { RoasterySection } from './components/RoasterySection';
import type { BagWeight, CartItem, GrindOption, RoastBean } from './data/roasteryData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [verifiedZip, setVerifiedZip] = useState('78702');
  const [roasteryTab, setRoasteryTab] = useState<'philosophy' | 'wholesale'>('philosophy');

  const totalBags = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  const handleAddToCart = (bean: RoastBean, weight: BagWeight, grind: GrindOption) => {
    const unitPrice = weight === '12 oz' ? bean.price12oz : bean.price2lb;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.beanId === bean.id && item.weight === weight && item.grind === grind
      );
      if (existingIdx !== -1) {
        return prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          beanId: bean.id,
          name: bean.name,
          weight,
          grind,
          unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item, idx) =>
          idx === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleJumpDelivery = () => {
    if (totalBags > 0) {
      setDrawerOpen(true);
      return;
    }
    const el = document.getElementById('delivery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpWholesale = () => {
    setRoasteryTab('wholesale');
    const el = document.getElementById('roastery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#211510]">
      <Navbar
        cartCount={totalBags}
        onOpenDelivery={handleJumpDelivery}
        onJumpWholesale={handleJumpWholesale}
      />

      <main>
        <HeroSection onOpenDelivery={handleJumpDelivery} />
        <MenuSection />
        <RoasterySection activeTab={roasteryTab} onTabChange={setRoasteryTab} />
        <LocalDeliverySection
          onAddToCart={handleAddToCart}
          onOpenDrawer={() => setDrawerOpen(true)}
          cartCount={totalBags}
          verifiedZip={verifiedZip}
          onVerifiedZipChange={setVerifiedZip}
        />
      </main>

      <FooterVisitSection onJumpWholesale={handleJumpWholesale} />

      <DeliveryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        defaultZip={verifiedZip}
      />
    </div>
  );
}
