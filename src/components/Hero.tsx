"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549114844-3118ad975d93?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>
      
      {/* Scrollable Grain / Noise Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1 }}
          className="text-primary font-bold uppercase mb-6 block text-sm md:text-base"
        >
          Dünya Mirasını Keşfedin
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-9xl font-bold text-white mb-8 leading-none font-serif"
        >
          Zamanın <br />
          <span className="gold-gradient italic">Efsaneleri</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          İnsanlığın ortak mirası olan büyüleyici durakları, binlerce yıllık hikayeleri ile yeniden keşfedin.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a 
            href="#explore" 
            className="group relative px-10 py-5 bg-primary text-secondary font-bold rounded-full overflow-hidden transition-all hover:pr-14"
          >
            <span className="relative z-10">Yolculuğa Başlayın</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all font-serif">→</span>
          </a>
          <a 
            href="/miraslar" 
            className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Koleksiyonu Gör
          </a>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/20 rounded-full animate-float opacity-30 blur-sm pointer-events-none" />
      <div className="absolute bottom-1/4 right-20 w-48 h-48 border border-primary/10 rounded-full animate-float opacity-20 blur-md pointer-events-none" style={{ animationDelay: "-2s" }} />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-3 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Aşağı Kaydır</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
