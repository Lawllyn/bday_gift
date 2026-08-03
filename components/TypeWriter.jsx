import React, { useState, useEffect } from 'react';

export default function TypeWriter({ text }) {
  const [displayText, setDisplayText] = useState('');
  
  // ⚙️ ATUR KECEPATAN KETIK DI SINI (dalam milidetik per huruf)
  const speed = 80; // 80ms = sedang

  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset teks awal

    const timer = setInterval(() => {
      // Mengambil teks dari indeks 0 sampai karakter ke-(i+1)
      // Dijamin aman & tidak akan pernah kelewatan/kepotong hurufnya!
      setDisplayText(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div id="text-box" style={{ whiteSpace: 'pre-line' }}>
      {displayText}
    </div>
  );
}