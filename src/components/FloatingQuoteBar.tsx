import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ChevronRight, X } from "lucide-react";
import { useQuoteCart } from "@/hooks/useQuoteCart";

const FloatingQuoteBar = () => {
  const { items, totalItems, clearCart } = useQuoteCart();
  const location = useLocation();

  // Hide on my-account and admin pages
  const hiddenPaths = ["/my-account", "/admin", "/quote-builder"];
  const shouldHide = hiddenPaths.some((p) => location.pathname.startsWith(p));

  if (items.length === 0 || shouldHide) return null;

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(Math.round(n));

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 bg-primary text-primary-foreground rounded-full shadow-2xl px-5 py-3">
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} />
          <span className="font-bold text-sm">{totalItems} รายการ</span>
          {subtotal > 0 && (
            <span className="text-sm opacity-80">฿{formatPrice(subtotal)}</span>
          )}
        </div>

        <Link
          to="/my-account"
          onClick={() => {
            // Set tab to quote_create via sessionStorage
            try { sessionStorage.setItem("ent_myaccount_tab", "quote_create"); } catch {}
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-foreground text-primary text-sm font-bold hover:opacity-90 transition-opacity"
        >
          สร้างใบเสนอราคา <ChevronRight size={14} />
        </Link>

        <button
          onClick={clearCart}
          className="p-1.5 hover:bg-primary-foreground/20 rounded-full transition-colors"
          title="ล้างรายการ"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default FloatingQuoteBar;
