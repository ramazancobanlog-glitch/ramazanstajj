// database_schema_mongodb.js
// MongoDB Koleksiyon Yapısı ve Şema Doğrulama (Schema Validation)
// Bu script MongoDB Shell (mongosh) veya MongoDB Compass üzerinde doğrudan çalıştırılabilir.

db = db.getSiblingDB('ramazan_staj'); // Veritabanı adı

// 1. HeritageSites Koleksiyonu Doğrulama Şeması (Validator)
db.createCollection("heritagesites", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "location", "country", "imageUrl", "category", "yearListed"],
      properties: {
        name: {
          bsonType: "string",
          description: "Miras alanının adı - zorunlu string alandır."
        },
        description: {
          bsonType: "string",
          description: "Miras alanının açıklaması - zorunlu string alandır."
        },
        location: {
          bsonType: "string",
          description: "Şehir / Bölge bilgisi - zorunlu string alandır."
        },
        country: {
          bsonType: "string",
          description: "Ülke adı - zorunlu string alandır."
        },
        imageUrl: {
          bsonType: "string",
          description: "Görsel URL adresi - zorunlu string alandır."
        },
        category: {
          enum: ["Cultural", "Natural", "Mixed"],
          description: "Kategori alanı: 'Cultural', 'Natural' veya 'Mixed' olmalıdır."
        },
        yearListed: {
          bsonType: "int",
          description: "UNESCO listesine kabul yılı - zorunlu tamsayı (int) olmalıdır."
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// 2. ContactMessages Koleksiyonu Doğrulama Şeması (Validator)
db.createCollection("contactmessages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "subject", "message"],
      properties: {
        name: {
          bsonType: "string",
          description: "Gönderenin adı - zorunlu string alandır."
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Gönderenin geçerli e-posta adresi - zorunlu string alandır."
        },
        subject: {
          bsonType: "string",
          description: "Mesaj konusu - zorunlu string alandır."
        },
        message: {
          bsonType: "string",
          description: "Mesaj içeriği - zorunlu string alandır."
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
});

print("MongoDB koleksiyonları ve şema doğrulamaları başarıyla oluşturuldu.");
