import React, { useState, useEffect } from 'react';

// 98% : Fokus penantian & alasan loading lama
const YAPPING_98 = [
  { text: "connecting to server...", duration: 2000 },
  { text: "bentar ya, angkanya lagi didorong", duration: 2500 },
  { text: "Waduh kok seret ya? Bentar, lagi didorong angkanya.", duration: 3000 },
  { text: "Jangan di-refresh! ", duration: 2000 },
  { text: "Internet lu aman kok, emang websitenya aja yang males.", duration: 3200 },
  { text: "Loading pixel assest...", duration: 2000 },
  { text: "Dikit lagi... ", duration: 2000 },
  { text: "beneran deh dikit lagi...", duration: 2200 }
];

// 99% : Diawali BAZINGAAA! lalu kepanikan & hitungan mundur
const YAPPING_99 = [
  { text: "BAZINGAAA! ", duration: 1800 },
  { text: "Lah...lah... malah nyangkut di 99%?? 😭", duration: 3000 },
  { text: "Mulai panik gak? Panik lah masa enggak.", duration: 2500 },
  { text: "Tenang, web lagi merangkai kata-kata puitis tingkat dewa.(tapi bo'ong)", duration: 3500 },
  { text: "Ngelag dikit gak ngaruh kok, yang penting jangan di-refresh ya!", duration: 3000 },
  { text: "Ketik rep jika kamu mulai pasrah... canda ding.", duration: 2500 },
  { text: "3...", duration: 1000 },
  { text: "2... ", duration: 1000 },
  { text: "1... ", duration: 1000 }
];

// 💬 List pesan acak khusus saat karakter mun.png diklik!
const LOADING_YAPS = [
  "Sabar ya pepo, lagi diproses nih. Sikik aaaa... ⏳",
  "Pelan-pelan kliknya, nanti mesinnya kaget 🤣",
  "Bentarrr, lagi disiapin dulu tempatnya... ✨",
  "Sabar ya, dikit lagi selesai kok",
  "Jangan di-spam kliknya, kasihan laptopnya 🫣",
  "Lagi muter otak nih, tunggu sebentar ya 🤯"
];

export default function LoadingArea({ onComplete }) {
  const [count, setCount] = useState(0);
  const [yapIndex, setYapIndex] = useState(0);

  // State untuk Pop-up Bubble saat karakter diklik
  const [clickBubbleText, setClickBubbleText] = useState('');
  const [showClickBubble, setShowClickBubble] = useState(false);
  const [bubbleTimer, setBubbleTimer] = useState(null);

  // Fungsi trigger pop-up acak saat karakter mun.png diklik
  const handleAvatarClick = () => {
    const randomIndex = Math.floor(Math.random() * CLICK_MESSAGES.length);
    setClickBubbleText(CLICK_MESSAGES[randomIndex]);
    setShowClickBubble(true);

    // Reset timer kalau diklik terus-terusan
    if (bubbleTimer) clearTimeout(bubbleTimer);

    // Tahan bubble selama 4.5 detik
    const newTimer = setTimeout(() => {
      setShowClickBubble(false);
    }, 4500);

    setBubbleTimer(newTimer);
  };

  // 1. Counter awal dari 0% ke 98% (Diperbaiki pakai setInterval biar smooth & ramah CPU)
  useEffect(() => {
    if (count < 98) {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= 98) {
            clearInterval(timer);
            return 98;
          }
          return prev + 1;
        });
      }, 65); // 65ms per increment (Enteng & tetep berasa ngebut!)

      return () => clearInterval(timer);
    }
  }, []);

  // 2. Jalankan Teks & Naik Persentase Presisi Per Kalimat
  useEffect(() => {
    let timer;

    if (count === 98) {
      if (yapIndex < YAPPING_98.length) {
        timer = setTimeout(() => {
          setYapIndex(prev => prev + 1);
        }, YAPPING_98[yapIndex].duration);
      } else {
        setCount(99);
        setYapIndex(0);
      }
    } else if (count === 99) {
      if (yapIndex < YAPPING_99.length) {
        timer = setTimeout(() => {
          setYapIndex(prev => prev + 1);
        }, YAPPING_99[yapIndex].duration);
      } else {
        setCount(100);
      }
    } else if (count === 100) {
      timer = setTimeout(onComplete, 800);
    }

    return () => clearTimeout(timer);
  }, [count, yapIndex, onComplete]);

  // Helper fungsi buat dapetin kalimat yang aktif
  const getCurrentYapText = () => {
    if (count < 98) return YAPPING_98[0].text;
    if (count === 98) return YAPPING_98[yapIndex]?.text || "";
    if (count === 99) return YAPPING_99[yapIndex]?.text || "";
    return "TADAAAAAAAAA!";
  };

  return (
    <div className="loading-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 🔮 GAMBAR KARAKTER MANTUL DI ATAS COUNTER + INTERAKTIF BUBBLE */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        
        {/* Pop-up Bubble Chat Muncul di Atas Karakter saat Di-tap/Klik */}
        {showClickBubble && (
          <div style={{
            position: 'absolute',
            bottom: '105%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffffff',
            color: '#251f33',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '8px 14px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            zIndex: 10,
            pointerEvents: 'none',
            animation: 'fadeIn 0.2s ease-in-out'
          }}>
            {clickBubbleText}
            {/* Ekor Segitiga Bubble */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: '#ffffff transparent transparent transparent'
            }} />
          </div>
        )}

        <img 
          src="foto/mun.png" 
          alt="Loading Character" 
          className="loading-avatar" 
          onClick={handleAvatarClick}
          style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        />
      </div>

      <div id="loading-counter" style={{ display: 'block' }}>{count}%</div>
      <div id="yapping-box" style={{ display: 'block' }}>{getCurrentYapText()}</div>
    </div>
  );
}