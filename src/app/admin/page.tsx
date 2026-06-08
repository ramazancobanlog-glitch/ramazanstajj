"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Site {
  _id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  imageUrl: string;
  category: string;
  yearListed: number;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"sites" | "messages">("sites");
  const [sites, setSites] = useState<Site[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSite, setCurrentSite] = useState<Partial<Site> | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "site" | "message" } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "sites") {
      const res = await fetch("/api/admin/heritage");
      const data = await res.json();
      setSites(data);
    } else {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentSite((prev: Partial<Site> | null) => prev ? { ...prev, imageUrl: data.url } : null);
      } else {
        alert("Yükleme hatası: " + (data.error || "Bilinmiyor"));
      }
    } catch {
      alert("Yükleme sırasında bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const method = currentSite?._id ? "PUT" : "POST";
    const body = currentSite?._id 
      ? { id: currentSite._id, ...currentSite } 
      : currentSite;

    const res = await fetch("/api/admin/heritage", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchData();
    }
    setSubmitting(false);
  };

  const confirmDelete = (id: string, type: "site" | "message") => {
    setItemToDelete({ id, type });
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    setSubmitting(true);
    const endpoint = itemToDelete.type === "site" ? "heritage" : "messages";
    const res = await fetch(`/api/admin/${endpoint}?id=${itemToDelete.id}`, { method: "DELETE" });
    if (res.ok) {
      fetchData();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
    setSubmitting(false);
  };

  const openAddModal = () => {
    setCurrentSite({ 
      name: "", description: "", location: "", 
      country: "Türkiye", imageUrl: "", category: "Cultural", 
      yearListed: new Date().getFullYear() 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (site: Site) => {
    setCurrentSite(site);
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary w-12 h-12" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-bold font-serif text-white">Yönetim Paneli</h1>
            <div className="flex gap-6 mt-6">
              <button 
                onClick={() => setActiveTab("sites")}
                className={`pb-2 text-sm font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'sites' ? 'text-primary border-primary' : 'text-slate-600 border-transparent hover:text-slate-400'}`}
              >
                Miras Alanları
              </button>
              <button 
                onClick={() => setActiveTab("messages")}
                className={`pb-2 text-sm font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'messages' ? 'text-primary border-primary' : 'text-slate-600 border-transparent hover:text-slate-400'}`}
              >
                Mesajlar {messages.length > 0 && <span className="ml-2 bg-primary text-secondary text-[10px] px-2 py-0.5 rounded-full">{messages.length}</span>}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === "sites" && (
              <button 
                onClick={openAddModal}
                className="bg-primary text-secondary font-bold px-8 py-4 rounded-2xl flex items-center gap-2 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all"
              >
                <Plus size={20} /> Yeni Alan Ekle
              </button>
            )}
            <button 
              onClick={() => { localStorage.removeItem("admin_auth"); router.push("/login"); }}
              className="px-6 py-4 bg-white/5 text-slate-500 hover:text-white rounded-2xl transition-all text-xs font-bold uppercase tracking-widest"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === "sites" ? (
            sites.map((site) => (
              <div key={site._id} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm hover:border-primary/20 transition-all group">
                <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={site.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={site.name} />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">{site.name}</h3>
                  <p className="text-slate-500 text-sm">{site.location}, {site.country}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => openEditModal(site)}
                    className="p-4 bg-white/5 text-blue-400 rounded-2xl hover:bg-blue-400/10 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => confirmDelete(site._id, "site")}
                    className="p-4 bg-white/5 text-red-500 rounded-2xl hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:border-primary/20 transition-all relative group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 font-serif">{msg.subject}</h3>
                    <div className="flex gap-4 text-xs font-medium">
                      <span className="text-primary">{msg.name}</span>
                      <span className="text-slate-500">{msg.email}</span>
                      <span className="text-slate-600">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => confirmDelete(msg._id, "message")}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5">
                  {msg.message}
                </p>
              </div>
            ))
          )}

          {((activeTab === "sites" && sites.length === 0) || (activeTab === "messages" && messages.length === 0)) && (
            <div className="text-center py-20 bg-slate-900/10 border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-600">Henüz kayıtlı bir veri yok.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && currentSite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-primary/20 p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                <X size={32} />
              </button>
              <h2 className="text-3xl font-bold font-serif text-white mb-8">
                {currentSite._id ? "Alanı Düzenle" : "Yeni UNESCO Alanı"}
              </h2>

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Alan Adı</label>
                  <input
                    type="text"
                    required
                    value={currentSite.name}
                    onChange={(e) => setCurrentSite({...currentSite, name: e.target.value})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                    placeholder="Efes Antik Kenti"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Açıklama</label>
                  <textarea
                    required
                    rows={4}
                    value={currentSite.description}
                    onChange={(e) => setCurrentSite({...currentSite, description: e.target.value})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none resize-none"
                    placeholder="Alanın kısa tarihi ve önemi..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Şehir / Konum</label>
                  <input
                    type="text"
                    required
                    value={currentSite.location}
                    onChange={(e) => setCurrentSite({...currentSite, location: e.target.value})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                    placeholder="İzmir, Selçuk"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Yıl</label>
                  <input
                    type="number"
                    required
                    value={currentSite.yearListed}
                    onChange={(e) => setCurrentSite({...currentSite, yearListed: parseInt(e.target.value)})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Kategori</label>
                  <select
                    value={currentSite.category}
                    onChange={(e) => setCurrentSite({...currentSite, category: e.target.value})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary transition-all outline-none"
                  >
                    <option value="Cultural">Kültürel</option>
                    <option value="Natural">Doğal</option>
                    <option value="Mixed">Karma</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Resim Yükle</label>
                  <label className="flex items-center justify-center w-full bg-slate-800/50 border border-white/10 border-dashed rounded-2xl py-4 px-6 text-slate-400 hover:border-primary hover:text-white transition-all cursor-pointer">
                    {uploading ? <Loader2 className="animate-spin" /> : <Upload size={20} className="mr-2" />}
                    <span>{uploading ? "Yükleniyor..." : "Dosya Seç"}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Resim Önizleme</label>
                  <div className="w-full h-[60px] rounded-2xl border border-white/5 overflow-hidden bg-black/20">
                    {currentSite.imageUrl ? (
                      <img src={currentSite.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700 italic text-xs">Resim Yok</div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-secondary font-bold py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                    {currentSite._id ? "Değişiklikleri Kaydet" : "Sisteme Ekle"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 border border-red-500/20 p-8 rounded-[2.5rem] shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Emin misiniz?</h3>
              <p className="text-slate-400 text-sm mb-8">Bu işlem geri alınamaz. Kayıt kalıcı olarak silinecektir.</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={submitting}
                  className="flex-1 bg-red-500 text-white font-bold py-4 rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <Trash2 size={18} />}
                  {submitting ? "Siliniyor..." : "Evet, Sil"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
