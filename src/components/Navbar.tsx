import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenDelivery: () => void;
  onJumpWholesale: () => void;
}

export function Navbar({ cartCount, onOpenDelivery, onJumpWholesale }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#F4EFE6]/95 backdrop-blur-sm border-b border-[#211510]/12">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#211510] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
        >
          Figure 8 Coffee
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#59483F]"
        >
          <a
            href="#roastery"
            className="hover:text-[#211510] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
          >
            Roastery
          </a>
          <a
            href="#menu"
            className="hover:text-[#211510] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
          >
            Menu
          </a>
          <a
            href="#visit"
            className="hover:text-[#211510] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
          >
            Visit
          </a>
          <a
            href="#wholesale"
            onClick={(e) => {
              e.preventDefault();
              onJumpWholesale();
            }}
            className="hover:text-[#211510] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
          >
            Wholesale
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDelivery}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#FAF7F1] bg-[#9E522C] hover:bg-[#834222] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211510] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE6] tabular-nums"
          >
            {cartCount > 0 ? `Delivery Bag (${cartCount})` : 'Local Delivery'}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#211510] hover:bg-[#EAE2D3] rounded-sm transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#211510]/12 bg-[#F4EFE6] px-6 py-4 flex flex-col gap-3 text-base font-medium text-[#211510]"
        >
          <a
            href="#roastery"
            onClick={handleLinkClick}
            className="py-2 border-b border-[#211510]/10 whitespace-nowrap"
          >
            Roastery
          </a>
          <a
            href="#menu"
            onClick={handleLinkClick}
            className="py-2 border-b border-[#211510]/10 whitespace-nowrap"
          >
            Menu
          </a>
          <a
            href="#visit"
            onClick={handleLinkClick}
            className="py-2 border-b border-[#211510]/10 whitespace-nowrap"
          >
            Visit
          </a>
          <a
            href="#wholesale"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick();
              onJumpWholesale();
            }}
            className="py-2 whitespace-nowrap"
          >
            Wholesale
          </a>
        </nav>
      )}
    </header>
  );
}
