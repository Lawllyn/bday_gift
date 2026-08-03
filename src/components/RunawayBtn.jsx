import React, { useState } from 'react';

export default function RunawayBtn({ onComplete }) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [isSurrendered, setIsSurrendered] = useState(false);
  const [pos, setPos] = useState({ left: 'auto', top: 'auto' });

  const handleClick = () => {
    if (!isSurrendered) {
      if (escapeCount < 5) {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 60);
        setPos({ left: `${x}px`, top: `${y}px` });
        setEscapeCount(prev => prev + 1);
      } else {
        setIsSurrendered(true);
      }
    } else {
      onComplete();
    }
  };

  return (
    <button
      id="runaway-btn"
      onClick={handleClick}
      style={{
        position: isSurrendered ? 'static' : 'absolute',
        left: isSurrendered ? 'auto' : pos.left,
        top: isSurrendered ? 'auto' : pos.top,
        /* Menggunakan style glassmorphism manis beraksen pink neon */
        background: isSurrendered ? 'rgba(255, 128, 171, 0.25)' : undefined,
        color: isSurrendered ? '#ffffff' : undefined,
        borderColor: isSurrendered ? '#ff80ab' : undefined,
        boxShadow: isSurrendered ? '0 0 20px rgba(255, 128, 171, 0.8)' : undefined,
      }}
    >
      {isSurrendered ?"Oke deh, gue nyerah! Klik cepet 😂" : "Klik dongs buat b'day lu ✨"}
    </button>
  );
}