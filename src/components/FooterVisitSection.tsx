import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

interface FooterVisitSectionProps {
  onJumpWholesale: () => void;
}

export function FooterVisitSection({ onJumpWholesale }: FooterVisitSectionProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleCopyAddress = () => {
    const address = '1111 Chicon St, Austin, TX 78702';
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(address).catch(() => {});
    }
    setCopiedAddress(true);
    window.setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Enter a valid email address to join the weekly roast list.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <footer
      id="visit"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[#190F0B] text-[#F4EFE6]"
    >
      <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-10 flex-1 flex flex-col justify-between">
        {/* Top half: Closing East Austin Visit Info + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 7 cols: Real Address, Hours, Patio & Wi-Fi */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-xs font-medium text-[#C87A51]">
                East Austin · 1111 Chicon Street
              </p>
              <h2
                className="mt-2 font-display font-bold tracking-tight text-[#FAF7F1] text-balance"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
              >
                Pull up a stool at the copper bar.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#F4EFE6]/14">
              {/* Address & Hours */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C87A51]">
                    Location
                  </h3>
                  <p className="mt-2 text-base font-medium text-[#FAF7F1]">
                    1111 Chicon St
                    <br />
                    Austin, TX 78702
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 font-medium text-[#F4EFE6]/85 hover:text-[#FAF7F1] underline underline-offset-4 cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C87A51]" />
                          <span>Address copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy address</span>
                        </>
                      )}
                    </button>
                    <a
                      href="https://maps.google.com/?q=1111+Chicon+St,+Austin,+TX+78702"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#C87A51] hover:text-[#FAF7F1] underline underline-offset-4"
                    >
                      <span>Directions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F4EFE6]/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C87A51]">
                    Hours
                  </h3>
                  <p className="mt-2 text-base font-medium text-[#FAF7F1] tabular-nums">
                    Mon–Sun: 7:00 AM – 7:00 PM
                  </p>
                  <p className="mt-1 text-xs text-[#F4EFE6]/70">
                    Espresso bar, pour-overs, and patio open all day.
                  </p>
                </div>
              </div>

              {/* Patio & Wi-Fi details */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C87A51]">
                  Patio, Wi-Fi &amp; Seating
                </h3>
                <ul className="space-y-3 text-sm text-[#F4EFE6]/85 leading-relaxed">
                  <li className="pb-3 border-b border-[#F4EFE6]/10">
                    <strong className="block font-semibold text-[#FAF7F1]">
                      Shaded Live-Oak Patio
                    </strong>
                    <span>
                      Fenced outdoor courtyard with cedar benches, morning shade, and water bowls
                      for dogs.
                    </span>
                  </li>
                  <li className="pb-3 border-b border-[#F4EFE6]/10">
                    <strong className="block font-semibold text-[#FAF7F1]">
                      Complimentary Fiber Wi-Fi
                    </strong>
                    <span>
                      Reliable high-speed Wi-Fi across indoor tables and patio, with outlets along
                      the brick wall.
                    </span>
                  </li>
                  <li>
                    <strong className="block font-semibold text-[#FAF7F1]">
                      Bike Racks &amp; Neighborhood Parking
                    </strong>
                    <span>
                      Steel bike racks out front on Chicon and open neighborhood parking along East
                      11th and 12th.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Newsletter Sign-Up Form */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="p-6 sm:p-8 bg-[#241712] border border-[#F4EFE6]/14">
              <p className="text-xs font-medium text-[#C87A51]">Weekly Roast Dispatch</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#FAF7F1]">
                Fresh single-origin drops &amp; seasonal menu notes.
              </h3>
              <p className="mt-2.5 text-sm text-[#F4EFE6]/75 leading-relaxed">
                Sent twice a month from our roastery on Chicon St—never crowded with promos, just
                what just came off the cooling tray and weekend cupping hours.
              </p>

              {newsletterSubscribed ? (
                <div className="mt-6 pt-5 border-t border-[#F4EFE6]/14 space-y-3">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#FAF7F1]">
                    <Check className="w-4 h-4 text-[#C87A51]" />
                    <span>Subscribed to the Weekly Roast Dispatch</span>
                  </p>
                  <p className="text-xs text-[#F4EFE6]/75 leading-relaxed">
                    We added <span className="text-[#FAF7F1] font-medium">{newsletterEmail}</span>.
                    Watch your inbox this Friday for our next single-origin release notes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsletterSubscribed(false);
                      setNewsletterEmail('');
                    }}
                    className="text-xs text-[#C87A51] hover:text-[#FAF7F1] underline underline-offset-4 cursor-pointer"
                  >
                    Update email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate className="mt-6 space-y-3">
                  <label htmlFor="newsletter-email" className="block text-xs font-medium text-[#F4EFE6]/85">
                    Email Address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="you@austin.com"
                      className="flex-1 px-3.5 py-2.5 text-sm bg-[#190F0B] border border-[#F4EFE6]/20 text-[#FAF7F1] placeholder:text-[#F4EFE6]/45 rounded-sm focus:outline-none focus:border-[#C87A51]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-semibold text-[#FAF7F1] bg-[#9E522C] hover:bg-[#834222] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C87A51]"
                    >
                      Join List
                    </button>
                  </div>
                  {newsletterError && (
                    <p role="alert" className="text-xs font-medium text-[#F29C9C]">
                      {newsletterError}
                    </p>
                  )}
                  <p className="text-[11px] text-[#F4EFE6]/55">
                    Unsubscribe anytime. Zero third-party sharing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Quiet bottom footer bar */}
        <div className="mt-12 pt-6 border-t border-[#F4EFE6]/14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F4EFE6]/65">
          <p>© 2026 Figure 8 Coffee Purveyors · 1111 Chicon St, Austin, TX 78702</p>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
            <a href="#roastery" className="hover:text-[#FAF7F1] transition-colors">
              Roastery
            </a>
            <a href="#menu" className="hover:text-[#FAF7F1] transition-colors">
              Menu
            </a>
            <a href="#delivery" className="hover:text-[#FAF7F1] transition-colors">
              Local Delivery
            </a>
            <a
              href="#wholesale"
              onClick={(e) => {
                e.preventDefault();
                onJumpWholesale();
              }}
              className="hover:text-[#FAF7F1] transition-colors"
            >
              Wholesale
            </a>
            <a
              href="mailto:hello@figure8coffeepurveyors.com"
              className="hover:text-[#FAF7F1] transition-colors"
            >
              hello@figure8coffeepurveyors.com
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
