import React, { useEffect, useRef } from 'react';

export default function Moon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cek apakah layar mobile (lebar di bawah 768px)
    const isMobile = width < 768;

    // 📱 Mobile: Ukuran bulan dibikin LEBIH GEDE (0.42) dan posisi centerY di pas tengah (0.4)
    // 💻 Desktop: Tetap persis seperti kode awal kamu (0.28 & 0.38)
    const moonRadius = isMobile 
      ? Math.min(width, height) * 0.42 
      : Math.min(width, height) * 0.28;

    const centerX = width * 0.5;
    const centerY = isMobile ? height * 0.4 : height * 0.38;

    // Jumlah partikel
    const particleCount = 7000;
    const particles = [];

    const colors = [
      '#ffb7b2', '#ff9aa2', '#ffb3ba', 
      '#f6a6ff', '#e295d9', '#ffffff', 
      '#ff80ab', '#f48fb1'
    ];

    // Inisialisasi posisi titik-titik di permukaan bola 3D (Latitude & Longitude)
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = Math.acos(2 * u - 1) - Math.PI / 2; // Garis lintang (Latitude)
      const phi = v * 2 * Math.PI;                      // Garis bujur (Longitude)

      particles.push({
        theta: theta,
        phi: phi,
        baseRadius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alphaBase: Math.random() * 0.7 + 0.3
      });
    }

    let rotationSpeed = 0.006; // Kecepatan rotasi planet
    let globalTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      globalTime += rotationSpeed;

      particles.forEach((p) => {
        // Rotasi sumbu Y
        const currentPhi = p.phi + globalTime;

        // Hitung koordinat 3D bola
        const x3d = moonRadius * Math.cos(p.theta) * Math.sin(currentPhi);
        const y3d = moonRadius * Math.sin(p.theta);
        const z3d = moonRadius * Math.cos(p.theta) * Math.cos(currentPhi);

        // Sembunyikan titik belakang bola
        if (z3d < -moonRadius * 0.15) return;

        // Proyeksi ke layar 2D
        const screenX = centerX + x3d;
        const screenY = centerY + y3d;

        // Efek pencahayaan/transparansi
        const depthFactor = (z3d + moonRadius) / (2 * moonRadius);
        const alpha = p.alphaBase * (0.2 + 0.8 * depthFactor);

        ctx.beginPath();
        ctx.arc(screenX, screenY, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, alpha));
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ff80ab';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}