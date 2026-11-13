import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/roasteryData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenDelivery: () => void;
}

export function HeroSection({ onOpenDelivery }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="pt-16 min-h-[calc(100vh)] flex flex-col justify-between bg-[#F4EFE6] border-b border-[#211510]/12"
    >
      <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left column: Editorial proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#59483F] flex items-center gap-2">
                <span>1111 Chicon St</span>
                <span aria-hidden="true">·</span>
                <span>East Austin, Texas</span>
              </p>

              <h1
                className="mt-5 font-display font-bold tracking-tight text-[#211510] leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2.35rem, 4.1vw, 3.85rem)' }}
              >
                East Austin coffee, roasted on Chicon.
              </h1>

              <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-[#59483F] max-w-xl">
                Set inside a sunlit corner on Chicon Street, Figure 8 pairs small-batch house roasts
                with a 30-foot brushed copper espresso bar. Pull up a stool indoors or settle under
                the live oaks out back from seven in the morning until seven at night.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FAF7F1] bg-[#211510] hover:bg-[#9E522C] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE6]"
                >
                  <span>Explore Seasonal Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenDelivery}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9E522C] hover:text-[#211510] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
                >
                  <span>Order Beans for Local Delivery</span>
                </button>
              </div>
            </div>

            {/* Quiet structural note without boxes */}
            <div className="mt-10 pt-6 border-t border-[#211510]/12 flex flex-wrap items-baseline justify-between gap-4 text-sm text-[#59483F]">
              <span>
                <strong className="font-semibold text-[#211510]">Today on bar:</strong>{' '}
                Colombia Huila Pink Bourbon &amp; Chicon House Espresso
              </span>
              <span className="font-mono text-xs text-[#59483F] tabular-nums">
                MON–SUN 7:00 AM – 7:00 PM
              </span>
            </div>
          </div>

          {/* Right column: Full-height interior photography */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[540px] max-h-[640px] overflow-hidden bg-[#EAE2D3]">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Inside Figure 8 Coffee Purveyors showing the 30-foot brushed copper espresso bar, tall steel windows, and warm wood ceiling in East Austin"
              loading="eager"
              fallbackTitle="30-Foot Brushed Copper Bar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Full-width 4-column unboxed summary strip */}
        <div className="mt-8 lg:mt-10 pt-6 border-t border-[#211510]/14 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="text-sm font-semibold text-[#211510]">30-Foot Copper Bar</p>
            <p className="mt-1 text-xs leading-relaxed text-[#59483F]">
              Hand-patinated counter built for unhurried espresso and pour-over service.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#211510]">House-Roasted Weekly</p>
            <p className="mt-1 text-xs leading-relaxed text-[#59483F]">
              Small-batch single-origin lots and house espresso roasted every Tuesday and Friday.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#211510]">Same-Day 78702 Drop</p>
            <p className="mt-1 text-xs leading-relaxed text-[#59483F]">
              Local Austin bean delivery by bike and van—free on orders of $35 or more.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#211510]">Patio &amp; Fiber Wi-Fi</p>
            <p className="mt-1 text-xs leading-relaxed text-[#59483F]">
              Shaded live-oak courtyard, indoor outlets, and room to linger all afternoon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
