import getDB from "@/lib/db";

import { MapPin, Calendar, ScrollText, ArrowLeft, Globe, Award, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface IHeritageSite {
  _id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  imageUrl: string;
  category: 'Cultural' | 'Natural' | 'Mixed';
  yearListed: number;
}

async function getSite(id: string): Promise<IHeritageSite | null> {
  try {
    const db = getDB();
    const site = await db.prepare(
      "SELECT id as _id, name, description, location, country, image_url as imageUrl, category, year_listed as yearListed FROM heritage_sites WHERE id = ?"
    ).bind(id).first<IHeritageSite>();
    return site;
  } catch (error) {
    console.error("Error fetching site from D1:", error);
    return null;
  }
}

export default async function HeritageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = await getSite(id);

  if (!site) {
    notFound();
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        
        <div className="absolute top-32 left-0 w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Geri Dön
            </Link>
            
            <div className="flex items-center gap-3 text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              UNESCO DÜNYA MİRASI
            </div>
            <h1 className="text-5xl md:text-8xl font-bold font-serif mb-6 italic leading-tight">
              {site.name}
            </h1>
            
            <div className="flex flex-wrap gap-8 items-center text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary" size={20} />
                <span className="text-lg font-medium">{site.location}, {site.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={20} />
                <span className="text-lg font-medium">{site.yearListed} Yılında Listelendi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[3rem]">
              <h2 className="text-3xl font-bold font-serif mb-8 flex items-center gap-4">
                <ScrollText className="text-primary" />
                Hakkında
              </h2>
              <div className="text-slate-400 text-lg leading-relaxed space-y-6 font-light">
                {site.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Koruma Altında", text: "Uluslararası anlaşmalarla korunmaktadır." },
                { icon: Award, title: "Eşsiz Değer", text: "İnsanlık için üstün evrensel değere sahiptir." },
                { icon: Globe, title: "Kültürel Miras", text: "Ortak dünya mirasımızın bir parçasıdır." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/20 transition-all">
                  <item.icon className="w-10 h-10 text-primary mb-6" />
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-[3rem] sticky top-32">
              <h3 className="text-xl font-bold font-serif mb-6 text-primary">Detaylı Bilgiler</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Kategori</span>
                  <span className="text-lg font-medium text-white">{site.category}</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Ülke</span>
                  <span className="text-lg font-medium text-white">{site.country}</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Konum</span>
                  <span className="text-lg font-medium text-white">{site.location}</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Kaydolma Yılı</span>
                  <span className="text-lg font-medium text-white">{site.yearListed}</span>
                </div>
              </div>
              
              <button className="w-full bg-primary text-secondary font-bold py-5 rounded-2xl mt-10 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2">
                Paylaş <Globe size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
