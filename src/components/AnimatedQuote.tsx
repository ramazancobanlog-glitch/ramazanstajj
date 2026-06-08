"use client";

import { motion } from "framer-motion";

export default function AnimatedQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="border-l-4 border-r-4 border-primary px-8 py-12"
    >
      <p className="text-2xl md:text-3xl italic text-slate-200 mb-8 font-serif leading-relaxed">
        &ldquo;Bütün insanlığın ortak mirası, bizlere emanet edilmiş paha biçilemez bir hazinedir.&rdquo;
      </p>
      <cite className="text-primary font-bold tracking-widest uppercase text-sm">— UNESCO Heritage Guide</cite>
    </motion.div>
  );
}
