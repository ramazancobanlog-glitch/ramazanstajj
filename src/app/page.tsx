import dbConnect from "@/lib/db";
import HeritageSite, { IHeritageSite } from "@/models/HeritageSite";
export const dynamic = 'force-dynamic';
import Hero from "@/components/Hero";
import AnimatedQuote from "@/components/AnimatedQuote";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

async function getHeritageSites() {
  await dbConnect();
  const sites = await HeritageSite.find({}).sort({ yearListed: -1 }).lean();
  return JSON.parse(JSON.stringify(sites)) as (IHeritageSite & { _id: string })[];
}

export default async function Home() {
  const sites = await getHeritageSites();

  return (
    <div className="bg-[#020617] text-white">
      <Hero />
      
      <section id="explore" className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Koleksiyon</span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif leading-tight">
              Dünyanın <span className="text-primary italic">Gizemli</span> <br /> 
              Duraklarını Keşfedin
            </h2>
          </div>
          <div className="text-slate-400 text-sm md:text-base max-w-sm mb-2 opacity-80 leading-relaxed">
            UNESCO Dünya Mirası listesinde yer alan, tarihin derinliklerinden gelen eşsiz yapılar ve doğal güzellikler arasından seçilenler.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sites.map((site) => (
            <div key={site._id} className="premium-card rounded-[2rem] overflow-hidden group">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={site.imageUrl} 
                  alt={site.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-6 left-6">
                  <span className="backdrop-blur-md bg-white/10 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                    {site.category}
                  </span>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold mb-1">
                    <MapPin size={14} />
                    <span className="tracking-wide uppercase">{site.country}</span>
                  </div>
                <Link href={`/miras/${site._id}`}>
                  <h3 className="text-2xl font-bold font-serif hover:text-primary transition-colors cursor-pointer">{site.name}</h3>
                </Link>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed opacity-70">
                {site.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Listeye Giriş</span>
                  <span className="text-sm font-bold text-slate-300">{site.yearListed}</span>
                </div>
                <Link href={`/miras/${site._id}`} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all group/btn border border-white/10">
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>

        {sites.length === 0 && (
          <div className="text-center py-32 bg-slate-900/40 rounded-[3rem] border border-dashed border-primary/20 backdrop-blur-sm">
            <Compass className="w-16 h-16 text-primary/20 mx-auto mb-6" />
            <p className="text-slate-400 italic mb-4 text-2xl font-serif">Arşiv Henüz Boş</p>
            <p className="text-sm text-slate-500 mb-10 max-w-sm mx-auto">Veritabanını hazırlamak için lütfen seeding işlemini başlatın.</p>
            <a 
              href="/api/seed" 
              className="inline-flex items-center gap-2 bg-primary text-secondary px-10 py-5 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all font-bold"
            >
              Veritabanını Başlat <ArrowRight size={18} />
            </a>
          </div>
        )}
      </section>
      
      <section className="bg-[#050b1d] py-32 text-center border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedQuote />
        </div>
      </section>

      {/* Discovery Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-12 md:p-24 border border-primary/20 relative overflow-hidden text-center group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8 leading-tight">
              Tarihin <span className="italic">Sırlarını</span> <br /> Birlikte Koruyalım
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light">
              Gelecek nesillere aktarılacak olan bu miras, ancak hepimizin ilgisi ve korumasıyla varlığını sürdürebilir.
            </p>
            <button className="bg-primary hover:bg-white text-secondary px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Hemen Katılın
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
