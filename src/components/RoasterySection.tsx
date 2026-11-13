import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { PATIO_IMAGE, ROASTERY_IMAGE } from '../data/roasteryData';
import { ResilientImage } from './ResilientImage';

interface RoasterySectionProps {
  activeTab: 'philosophy' | 'wholesale';
  onTabChange: (tab: 'philosophy' | 'wholesale') => void;
}

export function RoasterySection({ activeTab, onTabChange }: RoasterySectionProps) {
  const [businessName, setBusinessName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [weeklyVolume, setWeeklyVolume] = useState('25–50 lbs / week');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleWholesaleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = businessName.trim();
    const trimmedEmail = contactEmail.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your cafe, restaurant, or office name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address so our roaster can reply.');
      return;
    }

    setErrorMsg('');
    setSubmittedRef(trimmedName);
  };

  return (
    <section
      id="roastery"
      className="py-16 lg:py-20 bg-[#F4EFE6] border-b border-[#211510]/12"
    >
      <div id="wholesale" className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Top editorial row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#211510]/14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#9E522C]">
              Roastery &amp; East Austin Roots
            </p>
            <h2
              className="mt-2 font-display font-bold tracking-tight text-[#211510] text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)' }}
            >
              Small-batch roasting for our corner of East Austin.
            </h2>
          </div>

          {/* Clean tab switch between Roastery Story and Wholesale Program */}
          <div
            role="tablist"
            aria-label="Roastery and wholesale information"
            className="inline-flex items-center gap-1 p-1 bg-[#EAE2D3] rounded-sm self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'philosophy'}
              onClick={() => onTabChange('philosophy')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] ${
                activeTab === 'philosophy'
                  ? 'bg-[#211510] text-[#FAF7F1]'
                  : 'text-[#59483F] hover:text-[#211510]'
              }`}
            >
              Roasting Philosophy
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'wholesale'}
              onClick={() => onTabChange('wholesale')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] ${
                activeTab === 'wholesale'
                  ? 'bg-[#211510] text-[#FAF7F1]'
                  : 'text-[#59483F] hover:text-[#211510]'
              }`}
            >
              Wholesale Partners
            </button>
          </div>
        </div>

        {activeTab === 'philosophy' ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left column: Roaster image + neighborhood patio */}
            <div className="lg:col-span-6 space-y-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#EAE2D3]">
                <ResilientImage
                  src={ROASTERY_IMAGE}
                  alt="Freshly roasted whole coffee beans cooling in a cast-iron tray beside burlap green coffee sacks"
                  fallbackTitle="Small-Batch Roasting on Chicon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[16/9] overflow-hidden bg-[#EAE2D3]">
                <ResilientImage
                  src={PATIO_IMAGE}
                  alt="Shaded East Austin neighborhood patio under a spreading live oak tree with cedar benches and native agave"
                  fallbackTitle="East Austin Live-Oak Patio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right column: Plain-spoken philosophy and neighborhood texture */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:pt-2">
              <div className="space-y-5 text-base leading-relaxed text-[#59483F]">
                <h3 className="font-display text-2xl font-semibold text-[#211510]">
                  Roasted to taste clear, sweet, and honest.
                </h3>
                <p>
                  We buy seasonal green coffee in small lots from growers we work with year after
                  year across Colombia, Ethiopia, Guatemala, and Chiapas. Rather than roasting dark
                  to mask flaws or dropping beans too early, we aim for full sweetness and crisp
                  clarity in the cup—whether pulled as a morning cortado or brewed slowly as a V60.
                </p>
                <p>
                  Out front on Chicon Street, neighbors drop by on foot with their dogs, bikes lean
                  against the steel racks, and the 30-foot brushed copper bar stays lively from the
                  first 7 AM pour until early evening. Inside you will find bright daylight, fiber
                  Wi-Fi, and outlets along the wall; outside, a shaded live-oak patio built for
                  unhurried Austin mornings.
                </p>
              </div>

              {/* Clean 3-row unboxed ledger */}
              <dl className="divide-y divide-[#211510]/12 border-t border-b border-[#211510]/12">
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <dt className="text-sm font-semibold text-[#211510]">Roast Schedule</dt>
                  <dd className="text-sm text-[#59483F]">
                    Tuesdays &amp; Fridays in 15 kg batches · Rested 48 hours before bar service
                  </dd>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <dt className="text-sm font-semibold text-[#211510]">Water &amp; Calibration</dt>
                  <dd className="text-sm text-[#59483F]">
                    Remineralized Austin water balanced daily for sweet extraction
                  </dd>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <dt className="text-sm font-semibold text-[#211510]">Neighborhood Atmosphere</dt>
                  <dd className="text-sm text-[#59483F]">
                    Dog-friendly patio · Fiber Wi-Fi · Indoor counter seating
                  </dd>
                </div>
              </dl>

              <div>
                <button
                  type="button"
                  onClick={() => onTabChange('wholesale')}
                  className="text-sm font-semibold text-[#9E522C] hover:text-[#211510] underline underline-offset-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E522C] rounded-sm"
                >
                  Serve Figure 8 beans at your restaurant or office →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <h3 className="font-display text-2xl font-semibold text-[#211510]">
                East Austin Wholesale Program
              </h3>
              <p className="text-base leading-relaxed text-[#59483F]">
                We supply fresh-roasted espresso blends, rotating single-origin filter coffees, and
                barista dial-in support for independent cafes, bakeries, restaurants, and studios
                across Greater Austin.
              </p>
              <dl className="divide-y divide-[#211510]/12 border-t border-b border-[#211510]/12 text-sm">
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="font-semibold text-[#211510]">Minimum Order</dt>
                  <dd className="text-[#59483F] tabular-nums">10 lbs / week (5 lb bags)</dd>
                </div>
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="font-semibold text-[#211510]">Austin Van Drop</dt>
                  <dd className="text-[#59483F]">Every Wednesday &amp; Friday morning</dd>
                </div>
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="font-semibold text-[#211510]">Staff Training</dt>
                  <dd className="text-[#59483F]">Included quarterly on Chicon St</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F1] p-6 sm:p-8 border border-[#211510]/12">
              {submittedRef ? (
                <div className="py-6 space-y-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#211510]">
                    <Check className="w-4 h-4 text-[#9E522C]" />
                    <span>Wholesale sample request received for {submittedRef}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#59483F]">
                    Our head roaster will follow up at <span className="font-medium text-[#211510]">{contactEmail}</span> within one business day to schedule a cupping on Chicon Street or drop off sample bags.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setBusinessName('');
                      setContactEmail('');
                      setNotes('');
                    }}
                    className="text-xs font-semibold text-[#9E522C] underline underline-offset-4 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWholesaleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="ws-business"
                        className="block text-xs font-semibold text-[#211510] mb-1.5"
                      >
                        Business or Office Name
                      </label>
                      <input
                        id="ws-business"
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Eastside Bakery"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] placeholder:text-[#59483F]/60 rounded-sm focus:outline-none focus:border-[#9E522C]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ws-email"
                        className="block text-xs font-semibold text-[#211510] mb-1.5"
                      >
                        Work Email
                      </label>
                      <input
                        id="ws-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="buyer@eastsidebakery.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] placeholder:text-[#59483F]/60 rounded-sm focus:outline-none focus:border-[#9E522C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ws-volume"
                      className="block text-xs font-semibold text-[#211510] mb-1.5"
                    >
                      Estimated Weekly Volume
                    </label>
                    <select
                      id="ws-volume"
                      value={weeklyVolume}
                      onChange={(e) => setWeeklyVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] rounded-sm focus:outline-none focus:border-[#9E522C]"
                    >
                      <option>10–25 lbs / week</option>
                      <option>25–50 lbs / week</option>
                      <option>50+ lbs / week</option>
                      <option>Office cold brew &amp; batch program</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ws-notes"
                      className="block text-xs font-semibold text-[#211510] mb-1.5"
                    >
                      Coffee Program Notes (Optional)
                    </label>
                    <textarea
                      id="ws-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Espresso bar setup, batch brewer, or sample preferences..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#211510]/20 text-[#211510] placeholder:text-[#59483F]/60 rounded-sm focus:outline-none focus:border-[#9E522C]"
                    />
                  </div>

                  {errorMsg && (
                    <p role="alert" className="text-xs font-medium text-[#9E2A2B]">
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-semibold text-[#FAF7F1] bg-[#9E522C] hover:bg-[#834222] transition-colors rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211510]"
                    >
                      Request Sample Cupping
                    </button>
                    <button
                      type="button"
                      onClick={() => onTabChange('philosophy')}
                      className="text-xs font-medium text-[#59483F] hover:text-[#211510] underline underline-offset-4 cursor-pointer"
                    >
                      Back to Roasting Story
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
