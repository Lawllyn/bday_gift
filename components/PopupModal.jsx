import React from 'react';

export default function PopupModal({ type, onClose, onOpenKupon }) {
  return (
    <div className="popup-overlay" style={{ display: 'flex', zIndex: type === 'kupon' ? 110 : 100 }}>
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        {type === 'thanks' && (
          <React.Fragment>
            <img src="public/foto/cakecat.jpg" alt="Photo" className="popup-img-src" />
            <p className="popup-letter-text">
              Yow bro, Hinmun! Thanks ya buat obrolan random sama mabar-mabar. Dari yang awalnya cuma ikut nimbrung rame-rame eh malah dapet temen mabar yang seru wkwk. Big thanks udah ngajakin main. Sukses terus buat stream dan proyekan lu ke depannya ya, Hin! ✨
            </p>
          </React.Fragment>
        )}

        {type === 'sorry' && (
          <React.Fragment>
            <img src="public/foto/finalboz.jpg" alt="photo" className="popup-img-src" />
            <p className="popup-letter-text">
              Sorry ya kalau dulu pas di voice suka ngerandom atau bikin kesel wkwk. Nah, biar oke, surat ini gue sulap aja jadi KUPON ANTI-MARAH edisi terbatas!
            </p>
            <button className="pixel-btn btn-pink" onClick={onOpenKupon} style={{ marginTop: '5px', fontSize: '10px', width: '100%' }}>
              🎟️ Klaim Kupon Anti-Marah
            </button>
          </React.Fragment>
        )}

        {type === 'kupon' && (
          <React.Fragment>
            <img src="foto/antimarah.png" alt="Kupon Anti Marah" className="popup-img-src" />
            <p className="popup-letter-text" style={{ textAlign: 'center', fontSize: '1rem', color: '#1de9b6' }}>
              Kalau pas mabar atau ngobrol kita ada beda pendapat, drop screenshot kupon ini buat bypass argumen. Otomatis gue bakal ngalah atau adem duluan. Tapi inget, cuma berlaku buat hal sepele ya! Kalo udah gak jelas/gak nyaman, tetep gue tinggal cabut wkwk. Gunakan dengan bijak! 🎮👍
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}