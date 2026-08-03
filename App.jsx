import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import RunawayBtn from './src/components/RunawayBtn';
import LoadingArea from './src/components/LoadingArea';
import TypeWriter from './src/components/TypeWriter';
import PopupModal from './src/components/PopupModal';
import MusicPlayer from './src/components/MusicPlayer';
import Moon from './src/components/Moon'; 
import ShootingStars from './src/components/ShootingStars'; 
import GuitarCat from './src/components/GuitarCat'; 
import './style.css'; 

const UCAPAN_TEXT = "Hi, happy birthday!\n\nI hope you have a wonderful day filled with joy and laughter. You deserve all the best on your special day.\n\nMay this year bring you plenty of reasons to smile and endless opportunities to make beautiful memories. Remember to take some time for yourself and enjoy the little things that make life special.";

export default function App() {
  const [step, setStep] = useState('runaway'); 
  const [activePopup, setActivePopup] = useState(null); 
  const [isBlownOut, setIsBlownOut] = useState(false);

  const hasPlopPlayedRef = useRef(false);

  useEffect(() => {
    const munAvatar = document.querySelector('.avatar-mun');
    if (munAvatar) {
      const handleTap = (e) => {
        e.preventDefault();
        console.log("Avatar mun.png tapped!");
      };
      munAvatar.addEventListener('click', handleTap);
      return () => munAvatar.removeEventListener('click', handleTap);
    }
  }, [step]);

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

  const playPlopSound = () => {
    if (!hasPlopPlayedRef.current) {
      hasPlopPlayedRef.current = true;
      const audio = new Audio(`${import.meta.env.BASE_URL}plop.mp3`);
      audio.volume = 0.7;
      audio.play().catch(err => console.log(err));
    }
  };

  const handleBlowCandle = () => {
    playPlopSound();
    if (!isBlownOut) {
      setIsBlownOut(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    }
  };

  return (
    <React.Fragment>
      <div className="stars"></div>
      <ShootingStars />

      {(step === 'runaway' || step === 'loading') && <Moon />}

      {step === 'runaway' && (
        <RunawayBtn onComplete={() => setStep('loading')} />
      )}

      {step === 'loading' && (
        <LoadingArea onComplete={() => setStep('envelope')} />
      )}
      
      {step === 'envelope' && (
        <div id="envelope-page" className="page-section" style={{ display: 'flex' }}>
          <p className="pixel-text color-magenta">Letter For You</p>
          <img src={`${import.meta.env.BASE_URL}foto/letternobg.png`} alt="Letter" className="main-envelope-img" />
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

      {step === 'main' && (
        <div className="main-content-wrapper" style={{ display: 'grid' }}>
          <div className="left-side-panel">
            <MusicPlayer />
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

          <div className="right-side-panel">
            <div className="paper-stack-wrapper">
              <div className="paper-layer paper-back-2"></div>
              <div className="paper-layer paper-back-1"></div>
              <div className="parchment-container">
                <TypeWriter text={UCAPAN_TEXT} />
                <p className="signature" style={{ color: '#4a3c31', fontWeight: 'bold' }}> ~Lawllyn</p>
              </div>
            </div>
          </div>

          <div className="needs-more-section">
            <p className="pixel-text color-magenta" style={{ fontSize: '14px', marginBottom: '20px' }}>
              needs more?
            </p>
            <div className="sub-envelopes">
              <div className="envelope-item" onClick={() => setActivePopup('thanks')}>
                <img src={`${import.meta.env.BASE_URL}foto/news.png`} alt="Thanks Envelope" />
                <span>thanks</span>
              </div>
              <div className="envelope-item" onClick={() => setActivePopup('sorry')}>
                <img src={`${import.meta.env.BASE_URL}foto/news.png`} alt="Sorry Envelope" />
                <span>sorry</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePopup && (
        <PopupModal 
          type={activePopup} 
          onClose={() => setActivePopup(null)} 
          onOpenKupon={() => setActivePopup('kupon')} 
        />
      )}

      {step !== 'runaway' && (
        <GuitarCat step={step} isFinished={step === 'main'} />
      )}

      <footer className="pixel-footer">made by Lawllyn</footer>
    </React.Fragment>
  );
}