import React, { useState, useEffect, useRef } from 'react';

export default function GuitarCat({ step, isFinished }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [idleMessage, setIdleMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const [showHint, setShowHint] = useState(true);

  const posXRef = useRef(45); // Posisi horizontal (%)
  const keysPressed = useRef({});
  const catContainerRef = useRef(null);

  // 1. Cek Ukuran Layar (Mobile / Desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  

  // 2. Timer Hilangkan Hint Otomatis setelah 4 Detik
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(false);
    }, 4000);

    return () => clearTimeout(hintTimer);
  }, []);

  // 3. Timer Pop-up Idle Envelope
  useEffect(() => {
    let showTimer;
    let hideTimer;

    if (step === 'envelope') {
      showTimer = setTimeout(() => {
        setIdleMessage("Betah banget disini... mau buka suratnya gak? 🙄");
        
        hideTimer = setTimeout(() => {
          setIdleMessage(null);
        }, 4000);
      }, 5000);
    } else {
      setIdleMessage(null);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [step]);

  // 4. Timer Pop-up Finish
  const [showFinishBubble, setShowFinishBubble] = useState(false);
  useEffect(() => {
    if (isFinished) {
      setShowFinishBubble(true);
      const timer = setTimeout(() => {
        setShowFinishBubble(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  // 5. Smooth Movement Loop (Desktop Only)
  useEffect(() => {
    if (isMobile) return;

    let animationFrameId;

    const updatePosition = () => {
      const stepSpeed = step === 'loading' ? 0.8 : 0.8; 

      if (keysPressed.current['arrowleft'] || keysPressed.current['a']) {
        posXRef.current = Math.max(2, posXRef.current - stepSpeed);
        setIsFlipped(false);
      } else if (keysPressed.current['arrowright'] || keysPressed.current['d']) {
        posXRef.current = Math.min(90, posXRef.current + stepSpeed);
        setIsFlipped(true);
      }

      if (catContainerRef.current) {
        catContainerRef.current.style.left = `${posXRef.current}%`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, step]);

  // 6. Key Listeners dengan penanganan Space & Arrow Keys
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e) => {
      if (['a', 'd', 'arrowleft', 'arrowright', 'w', 'arrowup', ' '].includes(e.key.toLowerCase())) {
        setShowHint(false);
      }

      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      if ((e.code === 'Space' || key === 'arrowup' || key === 'w') && !isJumping) {
        e.preventDefault();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 400);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, isMobile]);

  const getBubbleText = () => {
    if (showFinishBubble) return "Udah kelar tuhh! 🥳✨";
    if (idleMessage) return idleMessage;
    return null;
  };

  const currentBubbleText = getBubbleText();
  const catImgUrl = `${import.meta.env.BASE_URL}foto/cat.png`;

  return (
    <>
      <style>{`
        @keyframes catJumpAnim {
          0% { transform: translateY(0); }
          50% { transform: translateY(-35px); }
          100% { transform: translateY(0); }
        }

        @keyframes bubblePop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.6); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        .cat-jump-active {
          animation: catJumpAnim 0.45s ease-out;
        }
      `}</style>

      <div 
        ref={catContainerRef}
        style={{
          position: 'fixed',
          bottom: '15px',
          /* 🔴 PENYESUAIAN MOBILE: Paksa 50% di mobile, atau 45% default desktop */
          left: isMobile ? '50%' : `${posXRef.current}%`,
          transform: isMobile ? 'translateX(-50%)' : 'none',
          textAlign: 'center',
          zIndex: 999,
          userSelect: 'none',
          pointerEvents: 'none',
          willChange: 'left',
          transition: isMobile ? 'none' : 'left 0.05s linear'
        }}
      >
        {/* 💬 POP-UP BUBBLE CHAT */}
        {currentBubbleText ? (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            fontSize: '12px',
            fontWeight: '800',
            fontFamily: 'monospace, sans-serif',
            padding: '8px 16px',
            borderRadius: '18px',
            border: '3px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            whiteSpace: 'nowrap',
            marginBottom: '14px',
            animation: 'bubblePop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'inline-block'
          }}>
            {currentBubbleText}
            
            {/* Segitiga Ekor Bubble (Putih Dalam) */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '9px solid #ffffff',
              zIndex: 2
            }} />

            {/* Segitiga Ekor Bubble (Border Hitam Luar) */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '12px solid #000000',
              marginTop: '1px',
              zIndex: 1
            }} />
          </div>
        ) : (
          /* Teks Hint Bawah */
          showHint && (
            <div style={{
              fontSize: '9px',
              color: '#ff80ab',
              marginBottom: '4px',
              opacity: 0.85,
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '3px 8px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s ease-out'
            }}>
              {isMobile 
                ? "aku sebenernya bisa jalan loh, tapi harus buka di laptop 💻" 
                : "Aku bisa jalan loh ◀ A/D | Space 🚀 ▶"
              }
            </div>
          )
        )}

        {/* Gambar Kucing & Animasi Lompat */}
        <div className={isJumping ? 'cat-jump-active' : ''}>
          <img 
            src={catImgUrl}
            alt="Pixel Black Cat Guitarist"
            style={{ 
              width: isMobile ? '50px' : '60px', 
              height: 'auto',
              transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
              filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))',
              transition: 'transform 0.1s ease'
            }}
          />
        </div>
      </div>
    </>
  );
}