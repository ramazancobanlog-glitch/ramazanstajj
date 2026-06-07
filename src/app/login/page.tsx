"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple auth check as requested
    if (username === "ramazan" && password === "ramazan1627") {
      // In a real app we'd use JWT/NextAuth, 
      // but for this project scope we'll use a simple localStorage/cookie flag
      localStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Hatalı kullanıcı adı veya şifre!");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-primary/20 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-white mb-2">Yönetim Paneli</h1>
          <p className="text-slate-400 text-sm italic">Lütfen yetkili girişi yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2 ml-1">Kullanıcı Adı</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary transition-all outline-none"
                placeholder="ramazan"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2 ml-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-3 rounded-xl">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-secondary font-bold py-4 rounded-2xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all transform active:scale-95 mb-2"
          >
            Giriş Yap
          </button>
          <div className="text-center text-xs text-slate-500 mt-2">
            Giriş Bilgileri: <span className="text-slate-300">ramazan</span> / <span className="text-slate-300">ramazan1627</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
