import { Link } from "react-router-dom";
import { Rocket, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlatformInviteBannerProps {
  variant?: "full" | "compact";
}

const PlatformInviteBanner = ({ variant = "full" }: PlatformInviteBannerProps) => {
  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
          <Rocket size={16} className="text-primary" />
          6 ขั้นตอนง่ายๆ จากเลือกสินค้าถึงรับของ
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          ระบบออกแบบมาเพื่อลูกค้าองค์กร ลดขั้นตอนยุ่งยาก ทีมขายคอยช่วยเหลือทุกขั้นตอน
        </p>
        <div className="flex items-center gap-3">
          <Link to="/member-register">
            <Button size="sm" className="gap-1.5 text-xs">
              <UserPlus size={14} /> สมัครสมาชิกฟรี
            </Button>
          </Link>
          <Link to="/platform" className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
            ดูขั้นตอนการใช้งาน <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 md:p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Rocket size={24} className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
            แพลตฟอร์มจัดซื้ออุตสาหกรรม<br className="hidden md:block" />แบบครบวงจร
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
            ตั้งแต่ค้นหาสินค้า เปรียบเทียบสเปก สร้างใบเสนอราคา ติดตามสถานะ จนถึงรับสินค้า
            — ทุกขั้นตอนอยู่บนระบบเดียว มีทีมขายคอยช่วยเหลือตลอดเส้นทาง
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/member-register">
              <Button size="lg" className="gap-2 font-bold">
                <UserPlus size={18} /> สมัครสมาชิกฟรี
              </Button>
            </Link>
            <Link to="/platform">
              <Button variant="outline" size="lg" className="gap-2 font-semibold">
                ดูขั้นตอนการใช้งาน <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInviteBanner;
