"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#020617] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">İletişim</span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 italic">
            Bizimle <span className="text-primary">Bağlantı</span> Kurun
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-light">
            Dünya mirasını koruma yolculuğumuzda bize katılın veya her türlü sorunuz için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {/* Contact Info Cells */}
          {[
            { icon: Mail, title: "E-posta", value: "info@unescoheritage.com", color: "blue" },
            { icon: Phone, title: "Telefon", value: "+90 (212) 555 0000", color: "green" },
            { icon: MapPin, title: "Merkez", value: "İstanbul, Türkiye", color: "red" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] text-center hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/10 group-hover:bg-primary/20 transition-all">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{item.title}</h4>
              <p className="text-xl font-bold text-white font-serif">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold font-serif mb-4">Mesajınız Alındı!</h2>
                  <p className="text-slate-400 mb-8">En kısa sürede size geri dönüş yapacağız. İlginiz için teşekkürler.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="bg-primary text-secondary px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Adınız Soyadınız</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                        placeholder="Ramazan Çoban"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">E-posta Adresi</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                        placeholder="ramazan@mail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Konu</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                      placeholder="Miras koruma hakkında..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Mesajınız</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none resize-none"
                      placeholder="Sorunuzu veya önerinizi buraya yazın..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm bg-red-400/10 py-3 rounded-xl text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-primary text-secondary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
                  >
                    {status === "submitting" ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    {status === "submitting" ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
