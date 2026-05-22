// src/app/(main)/secure-pin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/MobileLayout';
import { ShieldCheck, Delete } from 'lucide-react'; // <-- Ganti ShieldLock jadi ShieldCheck

export default function SecurePIN() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Ritual efek jika PIN sudah terisi penuh 6 digit
  useEffect(() => {
    if (pin.length === 6) {
      const enteredPin = pin.join('');
      
      if (enteredPin === '123456') {
        alert("PIN Valid! Mengirimkan instruksi pencairan dana ke core bank...");
        router.push('/withdrawal');
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError('PIN yang Anda masukkan salah. Silakan coba lagi.');
        setPin([]);
      }
    }
  }, [pin, router]);

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      setError('');
      setPin(prev => [...prev, num]);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 animate-fadeIn transition-all duration-300">
      
      {/* Bagian Atas: Identitas Barikade Keamanan */}
      <div className="flex flex-col items-center text-center mt-8">
        {/* Menggunakan ShieldCheck yang sudah pasti aman */}
        <div className="w-12 h-12 bg-theme-primary/10 text-theme-primary rounded-2xl flex items-center justify-center mb-4 border border-theme-primary/5 transition-all duration-300">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-base font-black text-slate-800 tracking-tight">Masukkan PIN Keamanan</h1>
        <p className="text-slate-400 text-xs mt-1 max-w-[240px] leading-relaxed font-medium">
          Demi keamanan dana Anda, silakan masukkan 6 digit PIN transaksi platform Anda.
        </p>

        {/* Indikator Titik PIN (6 Bulatan) */}
        <div className="flex gap-4 mt-8 justify-center items-center h-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 ${
                index < pin.length
                  ? 'bg-theme-primary border-theme-primary scale-110 shadow-sm shadow-theme-primary/30'
                  : 'bg-transparent border-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Pesan Error */}
        {error && (
          <p className="text-[10px] text-rose-600 font-bold mt-4 bg-rose-50 px-3 py-1 rounded-md">
            {error}
          </p>
        )}
      </div>

      {/* Bagian Bawah: Papan Tombol Angka Kustom */}
      <div className="mb-4 space-y-3">
        <div className="grid grid-cols-3 gap-x-6 gap-y-3 max-w-[280px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="w-14 h-14 mx-auto rounded-full bg-slate-50 hover:bg-slate-100 active:bg-theme-primary/10 active:text-theme-primary text-lg font-black text-slate-700 transition-all active:scale-95 flex items-center justify-center shadow-sm border border-slate-100/50"
            >
              {num}
            </button>
          ))}

          <button 
            type="button"
            onClick={() => alert("Membuka alur verifikasi OTP lupa PIN...")}
            className="text-[10px] font-black uppercase text-theme-primary tracking-wider hover:underline my-auto text-center"
          >
            Lupa?
          </button>
          
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="w-14 h-14 mx-auto rounded-full bg-slate-50 hover:bg-slate-100 active:bg-theme-primary/10 active:text-theme-primary text-lg font-black text-slate-700 transition-all active:scale-95 flex items-center justify-center shadow-sm border border-slate-100/50"
          >
            0
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            className="w-14 h-14 mx-auto rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all active:scale-95 flex items-center justify-center active:bg-rose-50"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}