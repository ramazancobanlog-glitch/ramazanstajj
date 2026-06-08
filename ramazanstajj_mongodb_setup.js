// ramazanstajj_mongodb_setup.js
// Bu script'i MongoDB Compass Shell veya mongosh (MongoDB Shell) üzerinde doğrudan çalıştırabilirsiniz.
// Çalıştırıldığında 'ramazan_staj' veritabanını oluşturur, şema doğrulayıcılarını (validator) ekler ve ilk veriyi yükler.

// 1. Veritabanı Seçimi / Oluşturulması
use('ramazan_staj');

// 2. Eski koleksiyonlar varsa temizle (Temiz başlangıç için)
db.heritagesites.drop();
db.contactmessages.drop();

// 3. heritagesites Koleksiyonunu Şema Doğrulamasıyla Oluştur
db.createCollection("heritagesites", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "location", "country", "imageUrl", "category", "yearListed"],
      properties: {
        name: {
          bsonType: "string",
          description: "Miras alanının adı (Örn: Efes Antik Kenti) - zorunlu alandır."
        },
        description: {
          bsonType: "string",
          description: "Miras alanının açıklaması - zorunlu alandır."
        },
        location: {
          bsonType: "string",
          description: "Bulunduğu şehir / bölge (Örn: İzmir) - zorunlu alandır."
        },
        country: {
          bsonType: "string",
          description: "Ülke adı (Örn: Türkiye) - zorunlu alandır."
        },
        imageUrl: {
          bsonType: "string",
          description: "Görselin internet adresi veya Cloudinary URL'i - zorunlu alandır."
        },
        category: {
          enum: ["Cultural", "Natural", "Mixed"],
          description: "Kategori alanı: Sadece 'Cultural', 'Natural' veya 'Mixed' değerlerini alabilir - zorunlu alandır."
        },
        yearListed: {
          bsonType: "int",
          description: "UNESCO listesine kabul yılı (Örn: 2015) - zorunlu tamsayıdır."
        }
      }
    }
  }
});

// 4. contactmessages Koleksiyonunu Şema Doğrulamasıyla Oluştur
db.createCollection("contactmessages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "subject", "message"],
      properties: {
        name: {
          bsonType: "string",
          description: "Gönderenin adı ve soyadı - zorunlu alandır."
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Gönderenin geçerli e-posta adresi - zorunlu alandır."
        },
        subject: {
          bsonType: "string",
          description: "Mesaj konusu - zorunlu alandır."
        },
        message: {
          bsonType: "string",
          description: "Mesaj içeriği - zorunlu alandır."
        }
      }
    }
  }
});

// 5. Test/Başlangıç Verisi Ekleme (Seed data)
db.heritagesites.insertMany([
  {
    name: "Efes Antik Kenti",
    description: "Antik dünyanın en önemli ticaret ve kültür merkezlerinden biri olan Efes, Artemis Tapınağı ve Celsus Kütüphanesi ile ünlüdür.",
    location: "İzmir",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1000",
    category: "Cultural",
    yearListed: NumberInt(2015)
  },
  {
    name: "Göbeklitepe",
    description: "İnsanlık tarihinin bilinen en eski tapınağı. 'Tarihin Sıfır Noktası' olarak adlandırılan bu alan, yerleşik hayata geçişle ilgili ezberleri bozmuştur.",
    location: "Şanlıurfa",
    country: "Türkiye",
    imageUrl: "https://images.unsplash.com/photo-1605368919619-33ca72f88365?q=80&w=1000",
    category: "Cultural",
    yearListed: NumberInt(2018)
  }
]);

print("===============================================================");
print(" RAMAZANSTAJJ MONGODB VERİTABANI VE ŞEMALARI BAŞARIYLA KURULDU ");
print("===============================================================");
