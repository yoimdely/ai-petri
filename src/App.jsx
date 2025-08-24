import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  HeartHandshake, Store, Bike, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Calendar, Mountain, Eye
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Ай‑Петри» — Ялта, ул. Кирова | видовые квартиры у моря";

  const meta = [
    { name: "description", content: "ЖК «Ай‑Петри» в Ялте: видовой монолитный дом комфорт‑класса на ул. Кирова. Подземный паркинг, вентилируемые фасады, без отделки/white box. Сдача — IV кв. 2027. ДДУ 214‑ФЗ, эскроу." },
    { property: "og:title", content: "ЖК «Ай‑Петри» — новый дом в Ялте" },
    { property: "og:description", content: "До набережной ~2,5 км, до центра ~3 км. Панорамы моря и гор, планировки от студий до 2‑комн." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-aipetri.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"; // горы + море заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#D9EAE1", backgroundColor: "#FFFFFF", color: "#0E1F17" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #10B981 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#3D5A4E" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#D9EAE1", backgroundColor: "#F3FBF7", color: "#0E1F17" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F6FFFA", color: "#0E1F17", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: зелёные волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E7F6EE 0%, #F6FFFA 45%, #F6FFFA 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#D9EAE1" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#CFE6DB" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: сетка + просторные кнопки */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(246,255,250,0.9)", borderColor: "#D9EAE1" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-3">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0E1F17", color: "#E7F6EE" }}>А</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Ай‑Петри»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#3D5A4E" }}>
                <MapPin size={12} className="inline mr-1" /> Ялта, ул. Кирова
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О проекте", "Фасады и инженерия", "Планировки", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#tech','#plans','#location','#status','#faq'][i]} className="hover:text-emerald-700 whitespace-nowrap transition-colors" style={{ color: "#3D5A4E" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#BFD7CC", color: "#0E1F17" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#10B981", color: "#F6FFFA" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#D9EAE1' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О проекте','#about'],['Фасады и инженерия','#tech'],['Планировки','#plans'],['Локация','#location'],['Сроки','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-emerald-50" style={{ color: '#3D5A4E' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#BFD7CC', color: '#0E1F17' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#10B981', color: '#F6FFFA' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0E1F17", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Ай‑Петри» — видовой дом в Ялте
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#3D5A4E", maxWidth: 640 }}>
              Монолитный дом комфорт‑класса с подземным паркингом и общественными зонами. Вентилируемые фасады, панорамные окна и планировки с акцентом на вид на море и горы. Продажи по ДДУ (214‑ФЗ) с эскроу.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["До 21 этажа", <Building2 size={18} key="b" />],["Подземный паркинг", <ParkingSquare size={18} key="p" />],["Без отделки / white box", <Hammer size={18} key="h" />],["Сдача: IV кв. 2027", <Calendar size={18} key="c" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#D9EAE1", color: "#0E1F17" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#10B981", color: "#F6FFFA" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#BFD7CC", color: "#0E1F17" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#D9EAE1" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(217,234,225,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop" alt="Горы и море Ялты" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="до 21" label="Этажей" sub="монолит‑каркас" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="2,5 км" label="До набережной" sub="~3 км до центра" icon={<MapPin size={18} />} /></div>
          <div className="h-full"><Stat value="Студии–2к" label="Форматы" sub="white box/без отделки" icon={<Ruler size={18} />} /></div>
          <div className="h-full"><Stat value="IV кв. 2027" label="Срок сдачи" sub="1 корпус" icon={<Calendar size={18} />} /></div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#3D5A4E' }}>
              «Ай‑Петри» — новый жилой комплекс комфорт‑класса в Ялте на улице Кирова. Архитектура сдержанная и современная: монолитно‑каркасный корпус со стилобатной частью и панорамным остеклением. Из окон — виды на море, горный массив и центр города.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Фасады', t: 'Вентилируемые фасады с керамогранитом для стабильного микроклимата и выразительного вида.', icon: <Building2 size={18} /> },
                { h: 'Инженерия', t: 'Лифты, современные системы безопасности и контроля доступа.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой формат', t: 'ДДУ по 214‑ФЗ, расчёты через эскроу‑счета.', icon: <ShieldCheck size={18} /> },
                { h: 'Девелопер', t: 'Группа «ИнтерСтрой» (ООО СЗ «Вишнёвый сад»).', icon: <FileText size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#D9EAE1', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0E1F17' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#3D5A4E' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#CFE6DB', borderColor: '#D9EAE1' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Eye size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#3D5A4E' }}>
              <li><MapPin size={14} className="inline mr-2" /> Ялта, ул. Кирова</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Подземный паркинг</li>
              <li><Hammer size={14} className="inline mr-2" /> Отделка: без отделки / white box</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#10B981', color: '#F6FFFA' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ФАСАДЫ И ИНЖЕНЕРИЯ */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#E7F6EE' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Фасады и инженерия</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3D5A4E' }}>
              {[
                { t: 'Вентилируемые фасады с керамогранитом — практично и энергоэффективно', icon: <Building2 size={16} /> },
                { t: 'Панорамное остекление и эргономичные планировочные сетки', icon: <Eye size={16} /> },
                { t: 'Современные лифты, видеонаблюдение, контроль доступа', icon: <ShieldCheck size={16} /> },
                { t: 'Подземный паркинг и места для хранения', icon: <ParkingSquare size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9EAE1' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Mountain size={18} /> Преимущества локации
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#3D5A4E' }}>
              {["Панорамы моря и Ай‑Петри", "Тихая городская улица", "Близость к музею Чехова", "Доступ к набережной и ТЦ"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F6FFFA', borderColor: '#D9EAE1' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировочные решения</h2>
          <p className="mt-3" style={{ color: '#3D5A4E' }}>
            Студии, 1‑ и 2‑комнатные планировки. По запросу отправим PDF‑подборку с этажами, видами и ценами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные форматы для старта/аренды", icon: <Home size={18} /> },
              { t: "1‑комнатные", d: "Кухни‑гостиные, лоджии, панорамы", icon: <Home size={18} /> },
              { t: "2‑комнатные", d: "Просторные гостиные и приватные спальни", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9EAE1' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0E1F17' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3D5A4E' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0EA271' }}>Запросить PDF‑каталог планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СТАТУС И СРОКИ */}
      <section id="status" className="py-14 md:py-20" style={{ backgroundColor: '#E7F6EE' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><FileText size={22} /> Сроки и статус</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Адрес", d: "Республика Крым, Ялта, ул. Кирова", icon: <MapPin size={18} /> },
            { t: "Срок сдачи", d: "Ориентир — IV кв. 2027", icon: <Calendar size={18} /> },
            { t: "Корпуса", d: "1 корпус (строится)", icon: <Building2 size={18} /> },
            { t: "Парковка", d: "Подземный паркинг", icon: <ParkingSquare size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9EAE1' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#0E1F17' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#3D5A4E' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Доступность и расстояния</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3D5A4E' }}>
              {[
                "Набережная — ~2,5 км; центр Ялты — ~3 км",
                "Дом‑музей Чехова — ~650 м; ТЦ «Конфетти» — ~600 м",
                "Магазин — ~140 м; детсад — ~350 м; школа — ~1,1 км",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Bike size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#D9EAE1' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%AF%D0%BB%D1%82%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0&z=15" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Республика Крым, г. Ялта, ул. Кирова." },
              { q: "Какая этажность?", a: "До 21 этажа (монолит‑каркас)." },
              { q: "Какая отделка?", a: "Без отделки / white box — удобно для индивидуального ремонта." },
              { q: "Какой формат сделки?", a: "ДДУ по 214‑ФЗ, расчёты на эскроу‑счёте." },
              { q: "Есть ли паркинг?", a: "Да, предусмотрен подземный паркинг." },
              { q: "Когда сдача?", a: "Ориентир — IV квартал 2027 года." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#D9EAE1' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0E1F17' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#3D5A4E' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г. Ялта, ул. Кирова." } },
            { "@type": "Question", "name": "Какая этажность?", "acceptedAnswer": { "@type": "Answer", "text": "До 21 этажа (монолит‑каркас)." } },
            { "@type": "Question", "name": "Какая отделка?", "acceptedAnswer": { "@type": "Answer", "text": "Без отделки / white box." } },
            { "@type": "Question", "name": "Какой формат сделки?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ 214‑ФЗ, эскроу‑счета." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Подземный паркинг." } },
            { "@type": "Question", "name": "Когда сдача?", "acceptedAnswer": { "@type": "Answer", "text": "IV кв. 2027." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#3D5A4E' }}>
              Пришлём PDF с планировками, этажами и видами, а также условия ипотеки/рассрочки и сроки.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#BFD7CC', color: '#0E1F17' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9EAE1' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0E1F17' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#3D5A4E' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0E1F17' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#3D5A4E' }}>
                  Оставьте контакты — вышлем актуальные предложения по ЖК «Ай‑Петри».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9EAE1' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9EAE1' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9EAE1' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9EAE1' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#10B981', color: '#F6FFFA' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#587C6C' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#587C6C' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#D9EAE1' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#3D5A4E' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Home size={16} /> ЖК «Ай‑Петри»
            </div>
            <p className="mt-2">Республика Крым, г. Ялта, ул. Кирова</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Девелопер: ГК «ИнтерСтрой».</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Ай‑Петри»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Кирова",
          "addressLocality": "Ялта",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#10B981", color: "#F6FFFA", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
