"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "py-4 glass-nav" : "py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl overflow-hidden flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all p-1">
                <img src="/logo.png" className="w-full h-full object-contain" alt="UNESCO Logo" />
              </div>
              <span className={`text-xl font-bold tracking-[0.2em] uppercase transition-colors ${scrolled ? "text-white" : "text-white"}`}>
                UNESCO <span className="text-primary">Heritage</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-10 text-sm font-semibold tracking-widest uppercase">
              <Link href="/" className="relative group text-white/70 hover:text-white transition-colors">
                Ana Sayfa
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link href="/#explore" className="relative group text-white/70 hover:text-white transition-colors">
                Dünya Mirasları
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link href="/hakkimizda" className="relative group text-white/70 hover:text-white transition-colors">
                Hakkımızda
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link href="/iletisim" className="bg-primary text-secondary px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1">
                İletişim
              </Link>
              <Link href="/login" className="text-primary hover:text-white border border-primary/30 px-6 py-[10px] rounded-full text-xs font-bold transition-all">
                GİRİŞ
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-[#020617] z-[60] flex flex-col items-center justify-center space-y-8 text-2xl font-serif"
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-white">
            <X size={40} />
          </button>
          <Link onClick={() => setIsOpen(false)} href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link onClick={() => setIsOpen(false)} href="/#explore" className="hover:text-primary transition-colors">Dünya Mirasları</Link>
          <Link onClick={() => setIsOpen(false)} href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
          <Link onClick={() => setIsOpen(false)} href="/iletisim" className="text-primary font-bold">İletişim</Link>
        </motion.div>
      )}
    </nav>
  );
}
