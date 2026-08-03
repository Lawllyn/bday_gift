import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import RunawayBtn from './components/RunawayBtn';
import LoadingArea from './components/LoadingArea';
import TypeWriter from './components/TypeWriter';
import PopupModal from './components/PopupModal';
import MusicPlayer from './components/MusicPlayer';
import Moon from './components/Moon'; 
import ShootingStars from './components/ShootingStars'; 
import GuitarCat from './components/GuitarCat'; 
import './style.css'; 

const UCAPAN_TEXT = "Hi, happy birthday!\n\nI hope you have a wonderful day filled with joy and laughter. You deserve all the best on your special day.\n\nMay this year bring you plenty of reasons to smile and endless opportunities to make beautiful memories. Remember to take some time for yourself and enjoy the little things that make life special.";

export default function App() {
  const [step, setStep] = useState('runaway'); // 'runaway' | 'loading' | 'envelope' | 'main'
  const [activePopup, setActivePopup] = useState(null); // 'thanks' | 'sorry' | 'kupon' | null

  // State Fitur Tiup Lilin
  const [isBlownOut, setIsBlownOut] = useState(false);

  // 🔒 Ref untuk mengunci plop.mp3 agar HANYA BUNYI 1 KALI Saja
  const hasPlopPlayedRef = useRef(false);

  // Efek Confetti Ultah
  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    let duration = 4 * 1000;
    let end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // Fungsi untuk memutar plop.mp3 HANYA 1 KALI
  const playPlopSound = () => {
    if (!hasPlopPlayedRef.current) {
      hasPlopPlayedRef.current = true; // Langsung kunci!
      const audio = new Audio('/plop.mp3');
      audio.volume = 0.7;
      audio.play().catch(err => console.log(err));
    }
  };

  // Fungsi Tiup Lilin (Sekaligus Memutar Suara 1x)
  const handleBlowCandle = () => {
    playPlopSound();

    if (!isBlownOut) {
      setIsBlownOut(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    }
  };

  return (
    <React.Fragment>
    
      {/* Background Bintang */}
      <div className="stars"></div>

      {/* 🌠 BINTANG JATUH */}
      <ShootingStars />

      {/* 2. PINK MOON (Otomatis menyesuaikan ukuran & posisi via Moon.jsx) */}
      {(step === 'runaway' || step === 'loading') && (
        <Moon />
      )}

      {/* 1. TOMBOL KABUR */}
      {step === 'runaway' && (
        <RunawayBtn onComplete={() => setStep('loading')} />
      )}

      {/* 2. LOADING SCREEN */}
      {step === 'loading' && (
        <LoadingArea onComplete={() => setStep('envelope')} />
      )}
      
      {/* 3. HALAMAN AMPLOP UTAMA */}
      {step === 'envelope' && (
        <div id="envelope-page" className="page-section" style={{ display: 'flex' }}>
          <p className="pixel-text color-magenta">Letter For You</p>
          <img src="/foto/letternobg.png" alt="Letter" className="main-envelope-img" />
          <div className="btn-group">
            <button className="pixel-btn btn-gray" onClick={() => window.location.reload()}>
              Go Back
            </button>
            <button 
              className="pixel-btn btn-pink" 
              onClick={() => { 
                setStep('main'); 
                triggerConfetti(); 
              }}
            >
              Open It
            </button>
          </div>
        </div>
      )}

      {/* 4. HALAMAN UTAMA (KUE & SURAT) */}
      {step === 'main' && (
        <div className="main-content-wrapper" style={{ display: 'grid' }}>
          
          {/* SISI KIRI: MUSIC PLAYER & KUE */}
          <div className="left-side-panel">
            <MusicPlayer />

            {/* Kue Ultah Interaktif */}
            <div className="cake-wrapper">
              <p className="pixel-text-sub" style={{ fontSize: '9px', color: '#ff80ab', marginBottom: '30px' }}>
                {isBlownOut ? '✨ Wish Granted! ✨' : '👇 Click candle to blow!'}
              </p>
              <div className="cake" onClick={handleBlowCandle} title="Click to blow out the candle!">
                {!isBlownOut && <div className="flame"></div>}
                <div className="candle"></div>
                <div className="layer layer-top"></div>
                <div className="layer layer-middle"></div>
                <div className="layer layer-bottom"></div>
                <div className="plate"></div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: KERTAS SURAT (SUDAH DIBUNGKUS DENGAN WRAPPER TUMPUKAN) */}
          <div className="right-side-panel">
            <div className="paper-stack-wrapper">
              {/* Kertas Belakang 2 (Mekar Kanan) */}
              <div className="paper-layer paper-back-2"></div>

              {/* Kertas Belakang 1 (Mekar Kiri) */}
              <div className="paper-layer paper-back-1"></div>

              {/* Kertas Utama (Depan) */}
              <div className="parchment-container">
                <TypeWriter text={UCAPAN_TEXT} />
                <p className="signature" style={{ color: '#4a3c31', fontWeight: 'bold' }}> ~Lawllyn</p>
              </div>
            </div>
          </div>

          {/* BAGIAN BAWAH: SUB ENVELOPES */}
          <div className="needs-more-section">
            <p className="pixel-text color-magenta" style={{ fontSize: '14px', marginBottom: '20px' }}>
              needs more?
            </p>
            <div className="sub-envelopes">
              <div className="envelope-item" onClick={() => setActivePopup('thanks')}>
                <img src="/foto/news.png" alt="Thanks Envelope" />
                <span>thanks</span>
              </div>
              <div className="envelope-item" onClick={() => setActivePopup('sorry')}>
                <img src="/foto/news.png" alt="Sorry Envelope" />
                <span>sorry</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* POPUP MODALS */}
      {activePopup && (
        <PopupModal 
          type={activePopup} 
          onClose={() => setActivePopup(null)} 
          onOpenKupon={() => setActivePopup('kupon')} 
        />
      )}

      {/* 🐈‍⬛ KUCING IRENG GITARIS */}
      {step !== 'runaway' && (
        <GuitarCat step={step} isFinished={step === 'main'} />
      )}

      {/* FOOTER GARIS */}
      <footer className="pixel-footer">made by Lawllyn</footer>
    </React.Fragment>
  );
}