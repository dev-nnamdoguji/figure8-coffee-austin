import { useState, type FormEvent } from 'react';
import { Check, Minus, Plus, Trash2, X } from 'lucide-react';
import {
  AUSTIN_DELIVERY_ZIPS,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_LOCAL_FEE,
  type CartItem,
} from '../data/roasteryData';

interface DeliveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  defaultZip: string;
}

export function DeliveryDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  defaultZip,
}: DeliveryDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState(defaultZip || '78702');
  const [porchNote, setPorchNote] = useState('');
  const [fulfillmentMode, setFulfillmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    scheduleText: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const qualifiesFree = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee =
    fulfillmentMode === 'pickup' || items.length === 0 || qualifiesFree ? 0 : STANDARD_LOCAL_FEE;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim()) {
      setErrorMsg('Please enter your name for the bag label.');
      return;
    }
    if (fulfillmentMode === 'delivery') {
      if (!streetAddress.trim()) {
        setErrorMsg('Please enter your Austin street address.');
        return;
      }
      const cleanZip = zipCode.replace(/\D/g, '');
      if (!AUSTIN_DELIVERY_ZIPS[cleanZip]) {
        setErrorMsg(
          `ZIP ${cleanZip || zipCode} is outside our East/Central Austin bike & van zone. Switch to Chicon St pickup above.`
        );
        return;
      }
    }

    setErrorMsg('');
    const randomNum = 4100 + Math.floor(Math.random() * 890);
    const scheduleText =
      fulfillmentMode === 'pickup'
        ? 'Ready for bar pickup today at 1111 Chicon St (Mon–Sun 7 AM – 7 PM).'
        : AUSTIN_DELIVERY_ZIPS[zipCode.replace(/\D/g, '')] ??
          'Scheduled for next local Austin porch drop.';

    setConfirmedOrder({
      orderNumber: `F8-${randomNum}`,
      total,
      scheduleText,
    });
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#190F0B]/55 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Local delivery bag"
    >
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F1] text-[#211510] h-full flex flex-col border-l border-[#211510]/15 shadow-xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#211510]/12 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#211510]">Local Delivery Bag</h2>
            <p className="text-xs text-[#59483F] mt-0.5">
              Roasted on Chicon St · Free delivery at ${FREE_DELIVERY_THRESHOLD}+
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close delivery bag"
            className="w-9 h-9 inline-flex items-center justify-center rounded-sm text-[#59483F] hover:text-[#211510] hover:bg-[#EAE2D3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {confirmedOrder ? (
            <div className="py-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#211510]">
                <Check className="w-4 h-4 text-[#9E522C]" />
                <span>Order #{confirmedOrder.orderNumber} Confirmed</span>
              </div>
              <p className="text-sm text-[#59483F] leading-relaxed">
                {confirmedOrder.scheduleText}
              </p>
              <div className="pt-4 border-t border-[#211510]/12 flex justify-between text-sm font-semibold tabular-nums">
                <span>Total Due at Drop / Bar</span>
                <span>${confirmedOrder.total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full mt-4 px-4 py-2.5 text-sm font-semibold text-[#FAF7F1] bg-[#211510] hover:bg-[#9E522C] transition-colors rounded-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#211510]">
                Your delivery bag is empty.
              </p>
              <p className="text-sm text-[#59483F] max-w-xs mx-auto leading-relaxed">
                Add house-roasted whole beans from our Chicon Street roastery for Austin porch
                delivery or bar pickup.
              </p>
              <a
                href="#delivery"
                onClick={onClose}
                className="inline-block mt-2 px-5 py-2.5 text-xs font-semibold text-[#FAF7F1] bg-[#9E522C] hover:bg-[#834222] rounded-sm transition-colors"
              >
                Browse Fresh Roasts
              </a>
            </div>
          ) : (
            <>
              {/* Free delivery progress bar */}
              <div className="pb-4 border-b border-[#211510]/12">
                <p className="text-xs font-medium text-[#211510] tabular-nums">
                  {qualifiesFree
                    ? 'Free East & Central Austin local delivery unlocked.'
                    : `Add $${remainingForFree.toFixed(2)} more for free Austin porch delivery.`}
                </p>
                <div className="mt-2 h-1.5 w-full bg-[#EAE2D3] overflow-hidden rounded-sm">
                  <div
                    className="h-full bg-[#9E522C] transition-transform duration-200 origin-left"
                    style={{
                      transform: `scaleX(${Math.min(1, subtotal / FREE_DELIVERY_THRESHOLD)})`,
                    }}
                  />
                </div>
              </div>

              {/* Itemized List */}
              <ul className="divide-y divide-[#211510]/12">
                {items.map((item, idx) => (
                  <li
                    key={`${item.beanId}-${item.weight}-${item.grind}`}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#211510]">{item.name}</p>
                      <p className="text-xs text-[#59483F] mt-0.5">
                        {item.weight} · {item.grind}
                      </p>
                      <div className="mt-2.5 inline-flex items-center border border-[#211510]/18 rounded-sm">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => onUpdateQty(idx, -1)}
                          className="w-7 h-7 inline-flex items-center justify-center text-[#59483F] hover:text-[#211510] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => onUpdateQty(idx, 1)}
                          className="w-7 h-7 inline-flex items-center justify-center text-[#59483F] hover:text-[#211510] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="font-mono text-sm font-medium text-[#211510] tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#59483F] hover:text-[#9E2A2B] transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Fulfillment toggle + form */}
              <form onSubmit={handleSubmitOrder} noValidate className="pt-4 border-t border-[#211510]/14 space-y-4">
                <div className="grid grid-cols-2 gap-1 p-1 bg-[#EAE2D3] rounded-sm">
                  <button
                    type="button"
                    onClick={() => setFulfillmentMode('delivery')}
                    className={`py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                      fulfillmentMode === 'delivery'
                        ? 'bg-[#211510] text-[#FAF7F1]'
                        : 'text-[#59483F] hover:text-[#211510]'
                    }`}
                  >
                    Austin Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentMode('pickup')}
                    className={`py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                      fulfillmentMode === 'pickup'
                        ? 'bg-[#211510] text-[#FAF7F1]'
                        : 'text-[#59483F] hover:text-[#211510]'
                    }`}
                  >
                    Chicon St Pickup
                  </button>
                </div>

                <div>
                  <label htmlFor="del-name" className="block text-xs font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    id="del-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jordan Alvarez"
                    className="w-full px-3 py-2 text-sm bg-[#F4EFE6] border border-[#211510]/20 rounded-sm focus:outline-none focus:border-[#9E522C]"
                  />
                </div>

                {fulfillmentMode === 'delivery' && (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label htmlFor="del-address" className="block text-xs font-semibold mb-1">
                          Austin Street Address
                        </label>
                        <input
                          id="del-address"
                          type="text"
                          required
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="1408 E Cesar Chavez St"
                          className="w-full px-3 py-2 text-sm bg-[#F4EFE6] border border-[#211510]/20 rounded-sm focus:outline-none focus:border-[#9E522C]"
                        />
                      </div>
                      <div>
                        <label htmlFor="del-zip" className="block text-xs font-semibold mb-1">
                          ZIP
                        </label>
                        <input
                          id="del-zip"
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          required
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[#F4EFE6] border border-[#211510]/20 rounded-sm focus:outline-none focus:border-[#9E522C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="del-note" className="block text-xs font-semibold mb-1">
                        Porch or Gate Note (Optional)
                      </label>
                      <input
                        id="del-note"
                        type="text"
                        value={porchNote}
                        onChange={(e) => setPorchNote(e.target.value)}
                        placeholder="Leave on shaded front porch behind bench"
                        className="w-full px-3 py-2 text-sm bg-[#F4EFE6] border border-[#211510]/20 rounded-sm focus:outline-none focus:border-[#9E522C]"
                      />
                    </div>
                  </>
                )}

                {errorMsg && (
                  <p role="alert" className="text-xs font-medium text-[#9E2A2B]">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-3 border-t border-[#211510]/12 space-y-1.5 text-xs text-[#59483F] tabular-nums">
                  <div className="flex justify-between">
                    <span>Coffee Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {fulfillmentMode === 'pickup'
                        ? 'Chicon St Bar Pickup'
                        : 'Austin Local Courier'}
                    </span>
                    <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#211510]/10 text-sm font-semibold text-[#211510]">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-[#FAF7F1] bg-[#9E522C] hover:bg-[#834222] transition-colors rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211510]"
                >
                  {fulfillmentMode === 'pickup'
                    ? 'Reserve for Bar Pickup'
                    : 'Schedule Local Delivery'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
