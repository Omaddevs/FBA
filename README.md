# FBA Connect — Web App (React + Vite)

FBA Academy uchun **SUPER APP** frontend prototipi. Bitta platforma uchta biznes yo'nalishni birlashtiradi: **Education**, **Recruiting** va **Consulting**.

Bu repo — texnik topshiriq (FBA_Connect_TZ) asosida qurilgan **React + Vite web versiya**. Hozircha mock (namuna) ma'lumotlar bilan ishlaydi; real loyihada FastAPI backend (`/api/...`) ga ulanadi.

## Texnik stack

- **React 18 + Vite** (frontend)
- **react-router-dom** — routing
- **recharts** — grafiklar (davomat, dashboard)
- **lucide-react** — ikonkalar
- Toza **CSS** (theme variables, responsive) — tashqi UI kutubxonasiz

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (dist/)
npm run preview  # build'ni ko'rish
```

## Demo login

Login sahifasida **rolni tanlang** (demo rejim). Real loyihada bu telefon/parol → token (web) yoki Telegram `initData` (Mini App) bilan almashtiriladi.

- **O'quvchi** — 5 bo'limli Mini App
- **Hodim rollari** — Super Admin, Admin, SSM, Main/Support Tutor, Sales, SMM, HR

> Har rol faqat o'z ruxsatlariga mos bo'limlarni ko'radi (TZ 7 — permissions matritsasi).

## Funksiyalar

### O'quvchi (Mini App, 5 tab)
- **Asosiy** — coin balans (oltin karta), yangiliklar, mening kursim + boshqa kurslar
- **Marks** — davomat foizi (ring), kalendar (yashil/qizil), rivojlanish grafigi, vazifa/mock
- **Lessons** — kurs xaritasi (modul → dars), video modal, FlexiQuiz vazifa
- **Ranking** — coin/XP reyting, podium, guruh/markaz, haftalik/oylik/umumiy
- **Profile** — 3 tab (Asosiy / Ish-ta'lim / Skills) + **avtomatik ball** + **rivojlanish yo'li**

### HR Ball tizimi (TZ 4) — `src/data/ball.js`
Excel formulasi aynan kodga ko'chirilgan (max 100 ball, 9 komponent). Skill o'zgarganda ball **darrov** qayta hisoblanadi. 6 ta lavozim kategoriyasi va **Underutilized** (potensial − amaldagi) hisoblanadi.

### Hodim paneli
- **Boshqaruv** — rolga qarab guruhlangan kartochkalar + KPI
- **SSM** — drop-out (xavfli o'quvchilar, filtr)
- **O'qituvchi** — guruh natijalari + yo'qlama
- **Sales** — re-enrollment (4 status), yangi o'quvchi
- **SMM** — yangilik yuklash, kurslar marketing
- **HR** — 2 dashboard (Kadrlar / Ish), Underutilized, kadrlar bazasi, **vakansiya tizimi** (mos kadrlarni avtomatik topish + broadcast)
- **Ruxsatlar** — permissions matritsasi, yangi rol yaratish, coin sozlamalari

## Loyiha tuzilishi

```
src/
  data/        ball.js (ball engine), roles.js (permissions), mock.js (namuna data)
  context/     AuthContext.jsx (login/logout, localStorage)
  components/  Layout (sidebar+bottom nav), ui.jsx (KPI, Ring, Avatar)
  pages/
    Login.jsx
    student/   StudentApp + Home, Marks, Lessons, Ranking, Profile
    staff/     StaffApp + Dashboard, SSM, Tutor, Sales, SMM, HR, Permissions
```

## Keyingi qadamlar (backend integratsiya)

1. `src/data/mock.js` o'rniga real API chaqiruvlari (`fetch('/api/...')`).
2. `AuthContext` — token (localStorage) + Telegram `initData` aniqlash.
3. Responsive allaqachon tayyor (desktop sidebar ↔ mobil bottom nav).
