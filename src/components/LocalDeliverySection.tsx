import { useState } from 'react';
import { Check, MapPin, Plus } from 'lucide-react';
import {
  AUSTIN_DELIVERY_ZIPS,
  FREE_DELIVERY_THRESHOLD,
  ROAST_BEANS,
  type BagWeight,
  type GrindOption,
  type RoastBean,
} from '../data/roasteryData';

interface LocalDeliverySectionProps {
  onAddToCart: (bean: RoastBean, weight: BagWeight, grind: GrindOption) => void;
  onOpenDrawer: () => void;
  cartCount: number;
  verifiedZip: string;
  onVerifiedZipChange: (zip: string) => void;
}

const WEIGHT_OPTIONS: BagWeight[] = ['12 oz', '2 lb'];
const GRIND_OPTIONS: GrindOption[] = ['Whole Bean', 'Espresso', 'Pour-Over', 'Drip'];

export function LocalDeliverySection({
  onAddToCart,
  onOpenDrawer,
  cartCount,
  verifiedZip,
  onVerifiedZipChange,
}: LocalDeliverySectionProps) {
  const [zipInput, setZipInput] = useState(verifiedZip || '78702');
  const [zipFeedback, setZipFeedback] = useState<string>(
    AUSTIN_DELIVERY_ZIPS[verifiedZip || '78702'] ?? ''
  );
  const [zipEligible, setZipEligible] = useState<boolean>(
    Boolean(AUSTIN_DELIVERY_ZIPS[verifiedZip || '78702'])
  );

  // Per-bean local selection state
  const [weights, setWeights] = useState<Record<string, BagWeight>>({});
  const [grinds, setGrinds] = useState<Record<string, GrindOption>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleZipCheck = () => {
    const clean = zipInput.replace(/\D/g, '').slice(0, 5);
    setZipInput(clean);

    if (clean.length !== 5) {
      setZipEligible(false);
      setZipFeedback('Enter a 5-digit Austin ZIP code to check local bike or van drop timing.');
      return;
    }

    const match = AUSTIN_DELIVERY_ZIPS[clean];
    if (match) {
      setZipEligible(true);
      setZipFeedback(match);
      onVerifiedZipChange(clean);
    } else {
      setZipEligible(false);
      setZipFeedback(
        `ZIP ${clean} is outside our local bike/van zone—free pickup is ready daily at 1111 Chicon St.`
      );
    }
  };

  const handleAdd = (bean: RoastBean) => {
    const weight = weights[bean.id] ?? '12 oz';
    const grind = grinds[bean.id] ?? 'Whole Bean';
    onAddToCart(bean, weight, grind);
    setRecentlyAddedId(bean.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === bean.id ? null : curr));
    }, 1600);
  };

  return (
    <section
      id="delivery"
      className="py-16 lg:py-20 bg-[#FAF7F1] border-b border-[#211510]/12"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Top bar: Heading + Austin ZIP Route Checker */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#211510]/14">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#9E522C]">
              Austin Local Delivery · Free over ${FREE_DELIVERY_THRESHOLD}
            </p>
            <h2
              className="mt-2 font-display font-bold tracking-tight text-[#211510] text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)' }}
            >
              House-roasted beans to your Austin porch.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#59483F] leading-relaxed">
              Every bag is roasted on Chicon Street and dropped by bicycle or electric van across
              East and Central Austin—no stale warehouse shipping.
            </p>
          </div>

          {/* Inline ZIP Checker */}
          <div className="w-full lg:w-auto lg:min-w-[380px]">
            <label
              htmlFor="austin-zip-input"
              className="block text-xs font-semibold text-[#211510] mb-1.5"
            >
              Check Austin Delivery Route
            </label>
            <div className="flex items-stretch gap-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-[#59483F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="austin-zip-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleZipCheck();
                    }
                  }}
                  placeholder="78702"
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-mono tabular-nums bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] rounded-sm focus:outline-none focus:border-[#9E522C]"
                />
              </div>
              <button
                type="button"
                onClick={handleZipCheck}
                className="px-4 py-2.5 text-sm font-semibold text-[#FAF7F1] bg-[#211510] hover:bg-[#9E522C] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C]"
              >
                Check ZIP
              </button>
            </div>
            {zipFeedback && (
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  zipEligible ? 'text-[#211510] font-medium' : 'text-[#59483F]'
                }`}
              >
                {zipEligible && (
                  <span className="text-[#9E522C] font-semibold mr-1.5">Available:</span>
                )}
                {zipFeedback}
              </p>
            )}
          </div>
        </div>

        {/* 2x2 Architectural Grid of House Roasts (unboxed, hairline dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-[#211510]/12">
          {ROAST_BEANS.map((bean, index) => {
            const selectedWeight = weights[bean.id] ?? '12 oz';
            const selectedGrind = grinds[bean.id] ?? 'Whole Bean';
            const currentPrice = selectedWeight === '12 oz' ? bean.price12oz : bean.price2lb;
            const justAdded = recentlyAddedId === bean.id;

            return (
              <article
                key={bean.id}
                className={`py-8 flex flex-col justify-between gap-6 ${
                  index >= 2 ? 'md:border-t md:border-[#211510]/12' : ''
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-[#211510]">
                      {bean.name}
                    </h3>
                    <span className="font-mono text-lg font-medium text-[#211510] tabular-nums shrink-0">
                      ${currentPrice.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-[#59483F]">
                    <span>{bean.origin}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{bean.process}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{bean.roastLevel} Roast</span>
                  </p>

                  <p className="mt-3 text-sm text-[#211510] leading-relaxed">
                    Tasting notes: <span className="text-[#59483F]">{bean.tastingNotes}</span>
                  </p>
                  <p className="mt-1 text-xs text-[#9E522C] font-medium">{bean.roastSchedule}</p>
                </div>

                {/* Inline bag configuration controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Bag weight segmented buttons */}
                    <div
                      role="group"
                      aria-label={`Bag weight for ${bean.name}`}
                      className="inline-flex items-center p-0.5 bg-[#EAE2D3] rounded-sm"
                    >
                      {WEIGHT_OPTIONS.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWeights((prev) => ({ ...prev, [bean.id]: w }))}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors tabular-nums whitespace-nowrap cursor-pointer ${
                            selectedWeight === w
                              ? 'bg-[#211510] text-[#FAF7F1]'
                              : 'text-[#59483F] hover:text-[#211510]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>

                    {/* Grind dropdown */}
                    <label className="sr-only" htmlFor={`grind-${bean.id}`}>
                      Grind setting for {bean.name}
                    </label>
                    <select
                      id={`grind-${bean.id}`}
                      value={selectedGrind}
                      onChange={(e) =>
                        setGrinds((prev) => ({
                          ...prev,
                          [bean.id]: e.target.value as GrindOption,
                        }))
                      }
                      className="px-2.5 py-1.5 text-xs font-medium bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] rounded-sm focus:outline-none focus:border-[#9E522C]"
                    >
                      {GRIND_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(bean)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] ${
                      justAdded
                        ? 'bg-[#211510] text-[#FAF7F1]'
                        : 'bg-[#9E522C] hover:bg-[#834222] text-[#FAF7F1]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Delivery</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom bar action to inspect bag */}
        <div className="pt-6 border-t border-[#211510]/14 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#59483F]">
            Need a custom grind or recurring weekly porch drop? Mention it in your delivery note at
            checkout.
          </p>
          <button
            type="button"
            onClick={onOpenDrawer}
            className="text-sm font-semibold text-[#211510] hover:text-[#9E522C] underline underline-offset-4 transition-colors cursor-pointer tabular-nums"
          >
            {cartCount > 0
              ? `Review Delivery Bag (${cartCount} ${cartCount === 1 ? 'bag' : 'bags'}) →`
              : 'Open Local Delivery Bag →'}
          </button>
        </div>
      </div>
    </section>
  );
}
