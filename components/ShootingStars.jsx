import React, { useEffect, useRef } from 'react';

export default function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = [];
    const maxStars = 4; // Jumlah bintang jatuh aktif bersamaan

    // Function membuat bintang jatuh baru (Dipaksa dari pojok / luar layar)
    const createStar = () => {
      // Tentukan acak: muncul dari batas atas (top) atau batas kiri (left)
      const spawnFromTop = Math.random() > 0.3;

      let x, y;
      if (spawnFromTop) {
        // Murni dari luar batas atas layar (-50px sampai 0px)
        x = Math.random() * (width * 0.7) - width * 0.1; // Sisi kiri hingga pertengahan atas
        y = -50;
      } else {
        // Murni dari luar batas kiri layar (-100px sampai 0px)
        x = -100;
        y = Math.random() * (height * 0.4) - 50;
      }

      const length = Math.random() * 80 + 60; // Panjang ekor
      const speed = Math.random() * 10 + 12;  // Kecepatan meluncur
      const angle = Math.PI / 4; // Sudut kemiringan 45 derajat

      return {
        x,
        y,
        length,
        speed,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        opacity: 1,
        color: Math.random() > 0.3 ? '#ffffff' : '#ffb3ba' // Putih atau Pink Pastel
      };
    };

    // Panggil beberapa bintang di awal
    for (let i = 0; i < maxStars; i++) {
      stars.push(createStar());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star, index) => {
        // Gambar Ekor Bintang Jatuh dengan Gradient
        const tailX = star.x - star.length * Math.cos(Math.PI / 4);
        const tailY = star.y - star.length * Math.sin(Math.PI / 4);

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.stroke();

        // Move star
        star.x += star.dx;
        star.y += star.dy;

        // Reset bintang kalau sudah lewat batas bawah/kanan layar
        if (star.x > width + 100 || star.y > height + 100) {
          stars[index] = createStar();
        }
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
        zIndex: -1 // Tepat di atas background stars, di bawah UI
      }}
    />
  );
}