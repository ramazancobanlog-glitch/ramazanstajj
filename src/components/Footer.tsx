import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-slate-400 py-16 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl p-2 border border-blue-900/10">
                <img src="/logo.png" className="w-full h-full object-contain" alt="UNESCO Logo" />
              </div>
              <span className="text-2xl font-bold tracking-widest text-gold uppercase font-serif">UNESCO Heritage</span>
            </Link>
            <p className="max-w-md text-base leading-relaxed opacity-80">
              İnsanlığın ortak değerlerini, tarihini ve doğasını korumak için bir aradayız. 
              UNESCO’nun paha biçilemez dünya mirası listesini keşfedin ve korumamıza yardımcı olun.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Menü</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/#explore" className="hover:text-primary transition-colors">Dünya Mirasları</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Sosyal</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all transform hover:-translate-y-1">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all transform hover:-translate-y-1">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all transform hover:-translate-y-1">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
          <p>© {new Date().getFullYear()} UNESCO Heritage. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-primary">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Fixed SVG Icons to avoid import issues
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
