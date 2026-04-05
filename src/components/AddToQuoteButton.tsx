import { useState } from "react";
import { FileText, Check, ShoppingCart, Loader2 } from "lucide-react";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { useToast } from "@/hooks/use-toast";

interface AddToQuoteButtonProps {
  model: string;
  category: string;
  productName: string;
  qty?: number;
  variant?: "primary" | "outline" | "compact";
  className?: string;
}

const AddToQuoteButton = ({
  model,
  category,
  productName,
  qty = 1,
  variant = "primary",
  className = "",
}: AddToQuoteButtonProps) => {
  const { addProduct, items } = useQuoteCart();
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isInCart = items.some((item) => item.model.toLowerCase() === model.toLowerCase());

  const handleAdd = async () => {
    if (isInCart) {
      toast({ title: `${model} อยู่ในรายการแล้ว`, description: "ไปที่ 'สร้างใบเสนอราคา' เพื่อปรับจำนวน" });
      return;
    }
    setAdding(true);
    try {
      await addProduct(model, category, productName, qty);
      setAdded(true);
      toast({
        title: `เพิ่ม ${model} ลงใบเสนอราคาแล้ว`,
        description: "กดปุ่มด้านล่างเพื่อดูรายการทั้งหมด",
      });
      setTimeout(() => setAdded(false), 2000);
    } catch {
      toast({ title: "เกิดข้อผิดพลาด", variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleAdd}
        disabled={adding}
        className={`flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors ${className}`}
      >
        {adding ? (
          <Loader2 size={14} className="animate-spin" />
        ) : added || isInCart ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <ShoppingCart size={14} />
        )}
        {isInCart ? "อยู่ในรายการแล้ว" : added ? "เพิ่มแล้ว!" : "เพิ่มลงใบเสนอราคา"}
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <button
        onClick={handleAdd}
        disabled={adding}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary/30 text-sm font-bold text-primary hover:bg-primary/5 transition-colors disabled:opacity-60 ${className}`}
      >
        {adding ? (
          <Loader2 size={16} className="animate-spin" />
        ) : added || isInCart ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <ShoppingCart size={16} />
        )}
        {isInCart ? "อยู่ในรายการแล้ว" : added ? "เพิ่มแล้ว!" : "เพิ่มลงใบเสนอราคา"}
      </button>
    );
  }

  // Primary (default)
  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 flex-1 ${className}`}
    >
      {adding ? (
        <Loader2 size={16} className="animate-spin" />
      ) : added || isInCart ? (
        <Check size={16} />
      ) : (
        <FileText size={16} />
      )}
      {isInCart ? "อยู่ในรายการแล้ว" : added ? "เพิ่มแล้ว!" : "ขอใบเสนอราคา"}
    </button>
  );
};

export default AddToQuoteButton;
