# 🚀 Navoiyda Bugun - Serverlarni Ishga Tushirish Yo'riqnomasi

## 📋 Talablar

- Node.js (v18+ tavsiya etiladi)
- npm (Node.js bilan birga keladi)
- Terminal/Command Prompt

## 🛑 1. Barcha Serverlarni To'xtatish

Agar serverlar ishlab turgan bo'lsa, avval to'xtating:

```bash
# Barcha Node.js jarayonlarini to'xtatish
pkill -f "vite" || true
pkill -f "nodemon" || true
pkill -f "npm run dev" || true
```

## 🔧 2. Loyihani Tayyorlash

### 2.1 Loyiha katalogiga o'tish

```bash
cd "navoiyda-bugun"
```

### 2.2 Backend dependency'larini o'rnatish

```bash
cd backend
npm install
cd ..
```

### 2.3 Frontend dependency'larini o'rnatish

```bash
cd frontend
npm install
cd ..
```

## 🚀 3. Serverlarni Ishga Tushirish

### Variant 1: Alohida Terminal'larda (Tavsiya etiladi)

#### 3.1 Backend serverni ishga tushirish

Yangi terminal oching va quyidagi buyruqlarni bajaring:

```bash
cd "navoiyda-bugun/backend"
npm run dev
```

**Natija:** Backend server `http://localhost:5001` da ishga tushadi

#### 3.2 Frontend serverni ishga tushirish

Yana yangi terminal oching va quyidagi buyruqlarni bajaring:

```bash
cd "navoiyda-bugun/frontend"
npm run dev
```

**Natija:** Frontend server `http://localhost:3000` da ishga tushadi

### Variant 2: Background'da ishga tushirish

Agar bitta terminalda ishlashni istasangiz:

```bash
# Backend'ni background'da ishga tushirish
cd backend
npm run dev > backend.log 2>&1 &
cd ..

# Frontend'ni background'da ishga tushirish
cd frontend
npm run dev > frontend.log 2>&1 &
cd ..
```

## ✅ 4. Serverlar Holatini Tekshirish

### 4.1 Jarayonlarni tekshirish

```bash
ps aux | grep -E "(vite|nodemon)" | grep -v grep
```

### 4.2 Portlarni tekshirish

```bash
# Backend (port 5001)
lsof -i :5001

# Frontend (port 3000)
lsof -i :3000
```

### 4.3 Health check

```bash
# Backend API test
curl http://localhost:5001/health

# Frontend test (browser'da oching)
open http://localhost:3000
```

## 🌐 5. Dasturga Kirish

### 5.1 URL'lar

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Network orqali**: http://192.168.1.103:3000

### 5.2 Test Login'lar

| Rol               | Username        | Password |
| ----------------- | --------------- | -------- |
| Administrator     | `admin`         | `123456` |
| Asoschi           | `founder`       | `123456` |
| CEO               | `ceo`           | `123456` |
| HR Menejer        | `hr`            | `123456` |
| Loyiha Menejer    | `project`       | `123456` |
| Marketing Menejer | `marketing`     | `123456` |
| Sotuv Menejer     | `sales`         | `123456` |
| Mobilograf        | `mobilographer` | `123456` |
| Brend Yuzi        | `brandface`     | `123456` |
| Ssenarist         | `screenwriter`  | `123456` |
| Xodim             | `employee`      | `123456` |

## 📊 6. Log'larni Ko'rish

### 6.1 Real-time log'lar (agar alohida terminal'da ishga tushirgan bo'lsangiz)

Log'lar terminal'da real-time ko'rinadi.

### 6.2 Background log'lar

```bash
# Backend log'lari
tail -f backend/backend.log

# Frontend log'lari
tail -f frontend/frontend.log

# Sistem log'lari
tail -f backend/logs/combined.log
tail -f backend/logs/error.log
```

## 🛑 7. Serverlarni To'xtatish

### 7.1 Alohida terminal'larda ishga tushirgan bo'lsa

Har bir terminal'da `Ctrl + C` bosing

### 7.2 Background'da ishga tushirgan bo'lsa

```bash
pkill -f "vite"
pkill -f "nodemon"
```

### 7.3 Barcha Node.js jarayonlarini to'xtatish

```bash
pkill -f "node"
```

## 🐛 8. Muammolarni Hal Qilish

### 8.1 Port band bo'lsa

```bash
# Portni band qilgan jarayonni topish
lsof -i :3000
lsof -i :5001

# Jarayonni to'xtatish (PID ni almashtiring)
kill -9 <PID>
```

### 8.2 Dependency muammolari

```bash
# Node modules'ni tozalash va qayta o'rnatish
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### 8.3 Cache tozalash

```bash
npm cache clean --force
```

## 📱 9. Telefon Test Qilish

1. Kompyuter va telefon bir xil Wi-Fi'da bo'lishi kerak
2. Telefon browser'ida: `http://192.168.1.103:3000`
3. Login: `admin` / `123456`
4. Barcha button click'lar avtomatik log'ga yoziladi

## 🔧 10. Development Buyruqlari

```bash
# Backend development
cd backend && npm run dev

# Frontend development
cd frontend && npm run dev

# Backend production
cd backend && npm start

# Dependency o'rnatish
npm install

# Cache tozalash
npm cache clean --force
```

---

## 📞 Yordam

Agar muammo bo'lsa:

1. Terminal'dagi xatolik xabarlarini o'qing
2. Log fayllarini tekshiring
3. Port'lar band emasligini tekshiring
4. Internet ulanishini tekshiring

**Muvaffaqiyat!** 🎉
