// osmanyazici-staj_mongodb_setup.js
// Bu script'i MongoDB Compass Shell veya mongosh (MongoDB Shell) üzerinde doğrudan çalıştırabilirsiniz.
// Çalıştırıldığında 'osmanyazici_staj' veritabanını oluşturur, şema doğrulayıcılarını (validator) ekler ve ilk veriyi yükler.

// 1. Veritabanı Seçimi / Oluşturulması
use('osmanyazici_staj');

// 2. Eski koleksiyonlar varsa temizle (Temiz başlangıç için)
db.notebooks.drop();
db.messages.drop();

// 3. notebooks Koleksiyonunu Şema Doğrulamasıyla Oluştur
db.createCollection("notebooks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "content"],
      properties: {
        title: {
          bsonType: "string",
          description: "Notebook başlığı - zorunlu alandır."
        },
        description: {
          bsonType: "string",
          description: "Notebook kısa açıklaması (özet) - zorunlu alandır."
        },
        content: {
          bsonType: "string",
          description: "Notebook detaylı içeriği (kod, tarih veya teknik bilgi) - zorunlu alandır."
        },
        image: {
          bsonType: "string",
          description: "Görsel (Base64 kodlanmış resim verisi veya URL) - opsiyonel alandır."
        },
        category: {
          bsonType: "string",
          description: "Notebook kategorisi - varsayılan değer: Standard."
        },
        historyYear: {
          bsonType: "int",
          description: "Zaman çizelgesi yılı - opsiyonel tamsayıdır."
        }
      }
    }
  }
});

// 4. messages Koleksiyonunu Şema Doğrulamasıyla Oluştur
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "message"],
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
          description: "Mesaj konusu - varsayılan değer: Yeni Mesaj."
        },
        message: {
          bsonType: "string",
          description: "Mesaj içeriği - zorunlu alandır."
        },
        isRead: {
          bsonType: "bool",
          description: "Mesajın okunma durumu - varsayılan değer: false."
        }
      }
    }
  }
});

// 5. Test/Başlangıç Verisi Ekleme (Seed data)
db.notebooks.insertMany([
  {
    title: "İlk Not Defteri Kaydı",
    description: "Sistemin kurulduğunu doğrulamak için otomatik oluşturulan başlangıç kaydı.",
    content: "Bu alanda staj defterinizin teknik detayları veya tarihsel olaylar saklanır.",
    category: "Standard",
    historyYear: NumberInt(2026)
  }
]);

print("=================================================================");
print(" OSMANYAZICI-STAJ VERİTABANI VE ŞEMALARI BAŞARIYLA KURULDU ");
print("=================================================================");
