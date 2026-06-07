import dbConnect from './db';
import HeritageSite from '@/models/HeritageSite';

const sampleSites = [
  {
    name: "Efes Antik Kenti",
    description: "Antik dünyanın en önemli ticaret ve kültür merkezlerinden biri olan Efes, Artemis Tapınağı ve Celsus Kütüphanesi ile ünlüdür.",
    location: "İzmir",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1000",
    category: "Cultural",
    yearListed: 2015
  },
  {
    name: "Göbeklitepe",
    description: "İnsanlık tarihinin bilinen en eski tapınağı. 'Tarihin Sıfır Noktası' olarak adlandırılan bu alan, yerleşik hayata geçişle ilgili ezberleri bozmuştur.",
    location: "Şanlıurfa",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1605368919619-33ca72f88365?q=80&w=1000",
    category: "Cultural",
    yearListed: 2018
  },
  {
    name: "Kapadokya - Göreme",
    description: "Peribacaları, kaya kiliseleri ve yeraltı şehirleriyle doğa ve tarihin iç içe geçtiği, dünyada eşi benzeri olmayan bir açık hava müzesi.",
    location: "Nevşehir",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000",
    category: "Mixed",
    yearListed: 1985
  },
  {
    name: "Nemrut Dağı",
    description: "Kommagene Kralı I. Antiochos'un tanrılara ve atalarına minnetini göstermek için yaptırdığı devasa heykeller ve anıt mezar.",
    location: "Adıyaman",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1596700440422-90924908984d?q=80&w=1000",
    category: "Cultural",
    yearListed: 1987
  },
  {
    name: "Pamukkale-Hierapolis",
    description: "Kalsiyum oksit içeren suların oluşturduğu bembeyaz travertenler ve yanı başındaki kutsal antik kent Hierapolis.",
    location: "Denizli",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000",
    category: "Mixed",
    yearListed: 1988
  },
  {
    name: "Safranbolu Şehri",
    description: "Osmanlı kent mimarisinin günümüze kadar en iyi korunan örneklerinden biri. Tarihi konakları ve çarşısıyla ünlüdür.",
    location: "Karabük",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1528657675124-7eb356a4cae0?q=80&w=1000",
    category: "Cultural",
    yearListed: 1994
  },
  {
    name: "Truva Antik Kenti",
    description: "Homeros'un İlyada destanına konu olan efsanevi şehir. 9 katmanlı yerleşim izleriyle 3000 yılı aşan bir geçmişe sahiptir.",
    location: "Çanakkale",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1549114844-3118ad975d93?q=80&w=1000",
    category: "Cultural",
    yearListed: 1998
  }
];

export async function seedDatabase() {
  await dbConnect();
  await HeritageSite.deleteMany({});
  await HeritageSite.insertMany(sampleSites);
  console.log("Database seeded successfully with authentic UNESCO sites!");
}
