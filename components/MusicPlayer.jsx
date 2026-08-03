import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("public/From_The_Start.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = false;

    const handleAudioEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log('Audio play error:', err));
      setIsPlaying(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes catJam {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-6deg); }
          75% { transform: translateY(-2px) rotate(6deg); }
        }

        @keyframes floatNote1 {
          0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(-14px, -48px) scale(1.2); }
        }

        @keyframes floatNote2 {
          0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(16px, -52px) scale(1.2); }
        }

        @keyframes catPulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 6px #ff80ab) drop-shadow(0 0 12px #ff80ab);
          }
          50% {
            filter: drop-shadow(0 0 10px #ff4081) drop-shadow(0 0 20px #ff4081);
          }
        }

        .cat-jamming {
          animation: catJam 0.45s ease-in-out infinite, catPulseGlow 1.2s ease-in-out infinite;
        }

        .note-1 {
          animation: floatNote1 1.6s ease-in-out infinite;
        }

        .note-2 {
          animation: floatNote2 1.8s ease-in-out infinite 0.5s;
        }
      `}</style>

      {/* 📻 BOX MUSIC PLAYER (Gaya 2.5D Retro Pixel) */}
      <div style={{
        position: 'relative',
        border: '3px solid #ff80ab',
        borderRadius: '8px',
        padding: '16px 20px',
        backgroundColor: '#1a1026',
        boxShadow: '4px 4px 0px #ff4081, 8px 8px 0px rgba(0, 0, 0, 0.6)',
        fontFamily: 'monospace, sans-serif',
        maxWidth: '340px',
        margin: '0 auto',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>

        {/* 🐈‍⬛ KUCING PIKSEL & NOT BALOK */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          flexShrink: 0
        }}>
          {isPlaying && (
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              width: '100%', 
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 20
            }}>
              <span className="note-1" style={{
                position: 'absolute',
                left: '-2px',
                color: '#ff80ab',
                fontSize: '16px',
                fontWeight: 'bold',
                textShadow: '0 0 6px #ff80ab'
              }}>
                🎵
              </span>
              <span className="note-2" style={{
                position: 'absolute',
                right: '-2px',
                color: '#f48fb1',
                fontSize: '14px',
                fontWeight: 'bold',
                textShadow: '0 0 6px #f48fb1'
              }}>
                🎶
              </span>
            </div>
          )}

          <img
            src="/foto/cat.png"
            alt="Jamming Pixel Cat"
            className={isPlaying ? 'cat-jamming' : ''}
            style={{
              width: '64px',
              height: 'auto',
              filter: isPlaying 
                ? 'none' 
                : 'drop-shadow(0 0 5px rgba(255, 128, 171, 0.8)) drop-shadow(0 0 10px rgba(255, 128, 171, 0.4))',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* SISI KANAN: TEKS & TOMBOL CONTROL */}
        <div style={{ 
          flexGrow: 1, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#ff80ab',
            fontWeight: 'bold',
            marginBottom: '4px',
            letterSpacing: '1px',
            textShadow: '0 0 8px rgba(255, 128, 171, 0.5)'
          }}>
            ♬ MUSIC PLAYER
          </div>

          <div style={{
            fontSize: '13px',
            color: '#ffffff',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            Laufey - From the Start
          </div>

          <button
            onClick={togglePlay}
            className="pixel-btn"
            style={{
              backgroundColor: '#ff80ab',
              color: '#1a1a1a',
              border: '2px solid #ffffff',
              borderRadius: '6px',
              padding: '6px 18px',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #ffffff, 0 0 8px rgba(255, 128, 171, 0.6)',
              transition: 'all 0.1s ease'
            }}
          >
            {isPlaying ? 'PAUSE ⏸' : 'PLAY ▶'}
          </button>
        </div>

      </div>
    </>
  );
}