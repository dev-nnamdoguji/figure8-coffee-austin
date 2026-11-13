import { useState } from 'react';
import { MENU_IMAGE, MENU_ITEMS, type MenuCategory } from '../data/roasteryData';
import { ResilientImage } from './ResilientImage';

const CATEGORIES: { key: MenuCategory; label: string }[] = [
  { key: 'all', label: 'All Drinks' },
  { key: 'espresso', label: 'Espresso Bar' },
  { key: 'pourover', label: 'Pour-Over' },
  { key: 'seasonal', label: 'Cold & Seasonal' },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');

  const visibleItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="py-16 lg:py-20 bg-[#FAF7F1] border-b border-[#211510]/12"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Section header + category segmented filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#211510]/14">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#9E522C]">
              Served daily at 1111 Chicon St
            </p>
            <h2
              className="mt-2 font-display font-bold tracking-tight text-[#211510] text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)' }}
            >
              Seasonal Espresso &amp; Pour-Over Menu
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter menu by drink category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EAE2D3] rounded-sm self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] ${
                    isSelected
                      ? 'bg-[#211510] text-[#FAF7F1]'
                      : 'text-[#59483F] hover:text-[#211510]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unboxed 2-column menu layout: no nested cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 cols: clean hairline-divided menu rows */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-[#211510]/12 border-b border-[#211510]/12">
              {visibleItems.map((item) => (
                <li
                  key={item.id}
                  className="py-5 first:pt-1 flex items-start justify-between gap-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h3 className="font-display text-lg font-semibold text-[#211510]">
                        {item.name}
                      </h3>
                      <span className="text-xs text-[#59483F]">
                        {item.categoryLabel}
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        {item.sizeNote}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#59483F] leading-relaxed">
                      {item.originOrPrep}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#9E522C]">
                      Notes: {item.tastingNotes}
                    </p>
                  </div>

                  <div className="shrink-0 text-right pt-0.5">
                    <span className="font-mono text-base font-medium text-[#211510] tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right 5 cols: Editorial photography + unboxed bar notes */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="aspect-[4/3] overflow-hidden bg-[#EAE2D3]">
              <ResilientImage
                src={MENU_IMAGE}
                alt="Hand-poured ceramic V60 dripper and stoneware espresso cup on brushed copper counter"
                fallbackTitle="Pour-Over & Espresso Bar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-[#211510]/14 space-y-4 text-sm text-[#59483F]">
              <div>
                <h3 className="font-semibold text-[#211510]">Milk &amp; House Syrups</h3>
                <p className="mt-1 leading-relaxed">
                  Local Texas Jersey whole milk, Oatly barista oat, and almond milk steamed to
                  order. Vanilla bean and raw piloncillo syrups are steeped in-house each morning.
                </p>
              </div>
              <div className="pt-4 border-t border-[#211510]/10">
                <h3 className="font-semibold text-[#211510]">Morning Pastries</h3>
                <p className="mt-1 leading-relaxed">
                  Cardamom knots, brown-butter croissants, and savory cheddar-chive scones
                  delivered warm at 7:00 AM from East Austin bakers until sold out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
