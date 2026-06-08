import { Shield, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#020617] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Hakkımızda</span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 italic">
            Ortak <span className="text-primary">Mirasımız</span> <br /> Geleceğimizdir
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Biz, insanlığın binlerce yıllık hikayesini, doğanın paha biçilemez sanatını korumak ve gelecek nesillere aktarmak için yola çıktık.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1549114844-3118ad975d93?q=80&w=2000" 
              alt="UNESCO Mission" 
              className="relative z-10 rounded-[3rem] border border-white/5 shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Misyonumuz</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Dünyanın dört bir yanındaki kültürel ve doğal varlıkların korunması sadece bir kurumun değil, tüm insanlığın ortak görevidir. Biz, bu bilinci yaymak ve bu eşsiz değerleri dijital dünyada en etkileyici şekilde sunmak için çalışıyoruz.
            </p>
            <div className="space-y-6">
              {[
                { icon: Shield, title: "Koruma", text: "Tehdit altındaki mirasları dünyaya duyuruyoruz." },
                { icon: Globe, title: "Farkındalık", text: "Kültürel çeşitliliğin önemini her kitleye ulaştırıyoruz." },
                { icon: Award, title: "Sürdürülebilirlik", text: "Doğal yaşamın korunması için destek sağlıyoruz." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/30 border border-white/5 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-8 text-primary">Birlikte Koruyalım</h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-12">
            UNESCO Dünya Mirası listesindeki her durak, insanlığın ortak hafızasıdır. Bu hafızayı diri tutmak ve yarınlara taşımak bizim elimizde.
          </p>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,000+</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">Dünya Mirası</div>
            </div>
            <div className="text-center border-x border-white/10 px-12">
              <div className="text-4xl font-bold text-white mb-2">167+</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">Ülke</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">Hikaye</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
