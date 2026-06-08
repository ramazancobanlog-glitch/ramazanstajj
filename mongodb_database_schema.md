# UNESCO Kültürel Miras Yönetim Sistemi - MongoDB Veritabanı Şema Dokümantasyonu

Bu doküman, projede kullanılan MongoDB NoSQL veritabanı yapısını, koleksiyonları (collections), alanları (fields) ve veri tiplerini detaylı bir şekilde açıklamaktadır. Sınıf genelinde benzer projeler için doğrudan paylaşılabilir ve staj/bitirme raporlarına eklenebilir.

---

## 1. Veritabanı Mimarisi Hakkında Genel Bilgi
Projede ilişkisel veri tabanları (SQL) yerine **NoSQL (Document-based)** tabanlı **MongoDB** kullanılmıştır. MongoDB tercih edilmesinin temel nedenleri:
* **Esnek Şema (Schemaless):** Alanların dinamik olarak genişletilebilmesi.
* **Yüksek Performans:** JSON benzeri (BSON) doküman yapısı sayesinde hızlı okuma ve yazma işlemleri.
* **Mongoose ODM:** Node.js / Next.js ortamında veritabanı şemalarını uygulama seviyesinde doğrulamak (validation) için Mongoose kütüphanesinden yararlanılmıştır.

---

## 2. Koleksiyonlar ve Şema Detayları

Veritabanında **2 ana koleksiyon** bulunmaktadır:
1. `heritagesites` (Kültürel Miras Alanları)
2. `contactmessages` (İletişim/Bize Ulaşın Mesajları)

### 2.1. `heritagesites` Koleksiyonu
Sistemdeki UNESCO Dünya Mirası sitelerinin bilgilerini tutar.

| Alan Adı (Field) | Veri Tipi (BSON / Mongoose) | Zorunlu (Required) | Açıklama / Kısıtlamalar |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | Evet | MongoDB tarafından otomatik atanan benzersiz kimlik (Primary Key). |
| `name` | String | Evet | Miras alanının adı (Örn: "Efes Antik Kenti"). |
| `description` | String | Evet | Miras alanı hakkında detaylı açıklama metni. |
| `location` | String | Evet | Alanın bulunduğu şehir veya bölge (Örn: "İzmir"). |
| `country` | String | Evet | Ülke adı (Örn: "Türkiye"). |
| `imageUrl` | String | Evet | Alana ait görselin Cloudinary veya web adresi URL'i. |
| `category` | String | Evet | Kategori türü. Sadece şu 3 değerden birini alabilir: `Cultural`, `Natural`, `Mixed`. |
| `yearListed` | Number (Int32) | Evet | UNESCO Dünya Mirası Listesi'ne kabul edildiği yıl (Örn: 2015). |
| `createdAt` | Date | Otomatik | Dokümanın oluşturulma zaman damgası (Timestamps). |
| `updatedAt` | Date | Otomatik | Dokümanın son güncellenme zaman damgası (Timestamps). |

#### Örnek JSON Dokümanı (`heritagesites`):
```json
{
  "_id": {"$oid": "648f12a4b87e2a44fcd56789"},
  "name": "Efes Antik Kenti",
  "description": "Antik dünyanın en önemli ticaret ve kültür merkezlerinden biri olan Efes, Artemis Tapınağı ve Celsus Kütüphanesi ile ünlüdür.",
  "location": "İzmir",
  "country": "Türkiye",
  "imageUrl": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1000",
  "category": "Cultural",
  "yearListed": 2015,
  "createdAt": {"$date": "2026-06-07T10:00:00.000Z"},
  "updatedAt": {"$date": "2026-06-07T10:00:00.000Z"}
}
```

---

### 2.2. `contactmessages` Koleksiyonu
Ziyaretçilerin iletişim formu üzerinden gönderdikleri mesajları depolar.

| Alan Adı (Field) | Veri Tipi (BSON / Mongoose) | Zorunlu (Required) | Açıklama / Kısıtlamalar |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | Evet | MongoDB tarafından otomatik atanan benzersiz kimlik. |
| `name` | String | Evet | Mesajı gönderen kişinin adı ve soyadı. |
| `email` | String | Evet | İletişim e-posta adresi (Regex e-posta format doğrulaması). |
| `subject` | String | Evet | Mesajın konusu / başlığı. |
| `message` | String | Evet | Mesajın detaylı içeriği. |
| `createdAt` | Date | Otomatik | Mesajın sisteme ulaştığı tarih ve saat (Varsayılan: `Date.now`). |

#### Örnek JSON Dokümanı (`contactmessages`):
```json
{
  "_id": {"$oid": "648f1352b87e2a44fcd5678a"},
  "name": "Ahmet Yılmaz",
  "email": "ahmet.yilmaz@example.com",
  "subject": "İş Birliği Hakkında",
  "message": "Merhaba, sitenizdeki kültürel miras alanları görsellerini kendi projemde kullanabilir miyim?",
  "createdAt": {"$date": "2026-06-07T10:30:15.000Z"}
}
```

---

## 3. Mongoose Kod Tanımlamaları (Uygulama Seviyesi Şema)

Projede veritabanı bağlantısı ve doğrulamaları gerçekleştiren TypeScript modelleri şu şekildedir:

### 3.1. Miras Alanı Şeması (`src/models/HeritageSite.ts`)
```typescript
import mongoose, { Schema, model, models } from 'mongoose';

export interface IHeritageSite {
  name: string;
  description: string;
  location: string;
  country: string;
  imageUrl: string;
  category: 'Cultural' | 'Natural' | 'Mixed';
  yearListed: number;
}

const HeritageSiteSchema = new Schema<IHeritageSite>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ['Cultural', 'Natural', 'Mixed'], required: true },
  yearListed: { type: Number, required: true },
}, { timestamps: true });

const HeritageSite = models.HeritageSite || model<IHeritageSite>('HeritageSite', HeritageSiteSchema);
export default HeritageSite;
```

### 3.2. Mesaj Şeması (`src/models/ContactMessage.ts`)
```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
```

---

## 4. Temel MongoDB Sorguları (Hocanın Sorabileceği Sorular)

Hoca veya jüri *"Veritabanında şu sorguyu nasıl çalıştırırsınız?"* diye sorarsa, MongoDB Shell (`mongosh`) veya Compass üzerinde çalıştırılabilecek temel sorgu kalıpları şunlardır:

* **Tüm Kültürel Miras Alanlarını Listeleme:**
  ```javascript
  db.heritagesites.find({});
  ```
* **Kategoriye Göre Filtreleme (Sadece Kültürel Alanlar):**
  ```javascript
  db.heritagesites.find({ category: "Cultural" });
  ```
* **2000 Yılından Sonra Listelenen Alanları Bulma:**
  ```javascript
  db.heritagesites.find({ yearListed: { $gt: 2000 } });
  ```
* **Yeni Mesaj Ekleme Sorgusu:**
  ```javascript
  db.contactmessages.insertOne({
    name: "Ayşe Demir",
    email: "ayse@mail.com",
    subject: "Destek",
    message: "Harika bir çalışma olmuş, tebrikler.",
    createdAt: new Date()
  });
  ```
