-- database_schema.sql
-- Staj Bitirme Projesi (Kültürel Miras Yönetim Sistemi) - SQL Veritabanı Şeması
-- Bu script MySQL, PostgreSQL, SQLite veya SQL Server üzerinde doğrudan çalıştırılabilir.

-- 1. Kültürel Miras Alanları Tablosu (Heritage Sites)
CREATE TABLE IF NOT EXISTS heritage_sites (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    image_url VARCHAR(1024) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Cultural', 'Natural', 'Mixed')),
    year_listed INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. İletişim Mesajları Tablosu (Contact Messages)
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Örnek başlangıç verileri (Seed Data)
INSERT INTO heritage_sites (id, name, description, location, country, image_url, category, year_listed) VALUES
('efes-antik-kenti', 'Efes Antik Kenti', 'Antik dünyanın en önemli ticaret ve kültür merkezlerinden biri olan Efes, Artemis Tapınağı ve Celsus Kütüphanesi ile ünlüdür.', 'İzmir', 'Türkiye', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1000', 'Cultural', 2015),
('gobeklitepe', 'Göbeklitepe', 'İnsanlık tarihinin bilinen en eski tapınağı. Tarihin Sıfır Noktası olarak adlandırılan bu alan, yerleşik hayata geçişle ilgili ezberleri bozmuştur.', 'Şanlıurfa', 'Türkiye', 'https://images.unsplash.com/photo-1605368919619-33ca72f88365?q=80&w=1000', 'Cultural', 2018),
('kapadokya-goreme', 'Kapadokya - Göreme', 'Peribacaları, kaya kiliseleri ve yeraltı şehirleriyle doğa ve tarihin iç içe geçtiği, dünyada eşi benzeri olmayan bir açık hava müzesi.', 'Nevşehir', 'Türkiye', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000', 'Mixed', 1985),
('nemrut-dagi', 'Nemrut Dağı', 'Kommagene Kralı I. Antiochosun tanrılara ve atalarına minnetini göstermek için yaptırdığı devasa heykeller ve anıt mezar.', 'Adıyaman', 'Türkiye', 'https://images.unsplash.com/photo-1596700440422-90924908984d?q=80&w=1000', 'Cultural', 1987),
('pamukkale-hierapolis', 'Pamukkale-Hierapolis', 'Kalsiyum oksit içeren suların oluşturduğu bembeyaz travertenler ve yanı başındaki kutsal antik kent Hierapolis.', 'Denizli', 'Türkiye', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000', 'Mixed', 1988);
