import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo-entgroup.avif";
const Footer = () => {
  return (
    <footer className="border-t border-border" id="contact">
      {/* Chat CTA */}
      <div className="section-padding bg-surface/50">
        <div className="container max-w-3xl mx-auto text-center">
          <MessageCircle className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            มาแช็ต<span className="text-gradient">กัน!</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            สนใจสินค้าหรือบริการ? ติดต่อเราได้ทันทีผ่าน LINE
          </p>
          <a
            href="https://line.me/R/ti/p/@entgroup?from=page&openQrModal=true&searchId=entgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            เพิ่มเพื่อน LINE @entgroup
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-display font-bold">
          ENT <span className="text-gradient">GROUP</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ENT GROUP Co., Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://www.entgroup.co.th/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            เว็บไซต์หลัก
          </a>
          <a href="https://line.me/R/ti/p/@entgroup" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            LINE
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
