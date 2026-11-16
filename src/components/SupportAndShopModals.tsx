import { useState, type FormEvent } from "react";
import {
  MessageCircle,
  X,
  Send,
  Briefcase,
  Calendar,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import {
  SHOP_PRODUCTS,
  buildWhatsAppUrl,
  type ShopProduct,
} from "../data/siteData";
import { ImageWithFallback } from "./ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

/* ============================================================================
   1. Floating Quick Support Chat Widget
   ============================================================================ */
export function SupportWidget({
  onPrefillContact,
}: {
  onPrefillContact: (msg: string) => void;
}) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const quickActions = [
    {
      label: t.support.quickChat,
      desc: t.support.quickChatDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nasuzumye imishinga yanyu kandi nifuza ko tuganira ku mushinga."
          : "Hi fabu001, I reviewed your portfolio and would like to discuss a project.",
      icon: MessageCircle,
    },
    {
      label: t.support.hireStudio,
      desc: t.support.hireStudioDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nifuza guha ikipe yanyu akazi ko kubaka software yihariye."
          : "Hi fabu001, I would like to hire your engineering team for custom software development.",
      icon: Briefcase,
    },
    {
      label: t.support.bookMeeting,
      desc: t.support.bookMeetingDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nifuza gufata umwanya w'inama yo gusobanura ibyo dukeneye."
          : "Hi fabu001, I would like to book a discovery call to scope our requirements.",
      icon: Calendar,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl w-[310px] overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div>
              <h3 className="font-display text-sm font-bold text-white">
                {t.support.title}
              </h3>
              <p className="text-[11px] text-emerald-400">
                {t.support.status}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close support chat"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-2.5">
            <p className="text-xs text-slate-400 mb-2">
              {t.support.prompt}
            </p>
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onPrefillContact(item.msg);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#2563EB] text-left transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 group-hover:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-white">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {item.desc}
                    </span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 ml-auto shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-4">
            <a
              href={buildWhatsAppUrl("Hi fabu001, I have a question about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.support.startWhatsapp}</span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close support menu" : "Open studio support"}
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}

/* ============================================================================
   2. Digital Shop & Templates Drawer
   ============================================================================ */
interface CartEntry {
  product: ShopProduct;
  qty: number;
}

export function ShopDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [checkedOut, setCheckedOut] = useState(false);

  if (!open) return null;

  const addItem = (product: ShopProduct) => {
    setCheckedOut(false);
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.product.id === id ? { ...c, qty: c.qty + delta } : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const totalUsd = cart.reduce(
    (sum, item) => sum + item.product.priceUsd * item.qty,
    0
  );

  return (
    <div
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex justify-end"
      onClick={onClose}
    >
      <aside
        className="bg-white dark:bg-slate-950 w-full max-w-lg h-full flex flex-col border-l border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
            <div>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                fabu001 Digital Shop
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Commercial starter kits, API modules, and cohort passes
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close shop drawer"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {SHOP_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col sm:flex-row bg-[#F4F6F9] dark:bg-slate-900"
            >
              <div className="sm:w-36 aspect-video sm:aspect-auto shrink-0 bg-slate-100 dark:bg-slate-800">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 bg-white dark:bg-slate-900">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#2563EB] dark:text-blue-400 font-semibold">
                      {product.category}
                    </span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white tabular-nums">
                      ${product.priceUsd}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {product.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addItem(product)}
                  className="self-start px-3.5 py-2 rounded-lg bg-[#0B1120] dark:bg-[#2563EB] hover:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 space-y-4">
          {checkedOut ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Order Request Ready (${totalUsd})</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                Complete fulfillment via WhatsApp or request an invoice link.
              </p>
              <a
                href={buildWhatsAppUrl(
                  `Hi fabu001, I'd like to purchase from fabu001 Shop:\n${cart
                    .map((c) => `- ${c.product.name} x${c.qty} ($${c.product.priceUsd * c.qty})`)
                    .join("\n")}\nTotal: $${totalUsd}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold"
              >
                Complete Purchase via WhatsApp
              </a>
            </div>
          ) : cart.length > 0 ? (
            <>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {cart.map((entry) => (
                  <div
                    key={entry.product.id}
                    className="flex items-center justify-between text-xs gap-2"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      {entry.product.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${entry.product.name}`}
                        onClick={() => updateQty(entry.product.id, -1)}
                        className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="tabular-nums font-mono w-4 text-center text-slate-900 dark:text-slate-100">
                        {entry.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${entry.product.name}`}
                        onClick={() => updateQty(entry.product.id, 1)}
                        className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${entry.product.name}`}
                        onClick={() => updateQty(entry.product.id, -entry.qty)}
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total</span>
                <span className="font-display text-lg font-bold text-slate-950 dark:text-white tabular-nums">
                  ${totalUsd} USD
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCheckedOut(true)}
                className="w-full py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Your cart is empty. Select any kit or training pass above.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

/* ============================================================================
   3. Client Portal Modal
   ============================================================================ */
export function ClientPortalModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [notice, setNotice] = useState("");

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !accessCode.trim()) return;
    setNotice(
      `Portal access request sent for ${email}. Active fabu001 milestone links are issued directly by your project lead.`
    );
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close client portal dialog"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-1">
            fabu001 Client Portal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Access active project milestones, staging previews, and invoices.
          </p>
        </div>

        {notice ? (
          <div className="space-y-4 text-center">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-lg leading-relaxed">
              {notice}
            </p>
            <button
              type="button"
              onClick={() => {
                setNotice("");
                onClose();
              }}
              className="w-full py-3 rounded-lg bg-[#0B1120] dark:bg-[#2563EB] hover:dark:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Client Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB] dark:focus:border-blue-500 text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Reference Code
              </label>
              <input
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="E.g., FB-2026-04"
                className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB] dark:focus:border-blue-500 text-sm font-mono transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide cursor-pointer transition-colors"
            >
              Verify &amp; Open Workspace
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
