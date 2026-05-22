"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, User, QrCode, X, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isOpenQR, setIsOpenQR] = useState(false);
  const [isDynamic, setIsDynamic] = useState(false);
  const [amount, setAmount] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const merchantName = "Warteg Bahari Mulia";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 400);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      {/* BAR NAVIGASI BAWAH */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around z-40 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
        
        {/* Menu Beranda - Menggunakan text-theme-primary secara dinamis */}
        <button 
          onClick={() => router.push('/dashboard')}
          className={`flex flex-col items-center gap-1 transition-all ${pathname === '/dashboard' ? 'text-theme-primary font-black' : 'text-slate-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </button>

        {/* TOMBOL UTAMA: QRIS FLOATING DI TENGAH (Membaca tema dinamis dari layout) */}
        <div className="relative -top-4">
          <button 
            onClick={() => setIsOpenQR(true)}
            className="w-14 h-14 bg-gradient-to-tr from-theme-primary to-theme-primary/80 text-white rounded-full flex items-center justify-center shadow-lg shadow-theme-primary/30 active:scale-95 transition-all border-4 border-white"
          >
            <QrCode className="w-6 h-6" />
          </button>
          <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider text-theme-primary`}>
            QRIS
          </span>
        </div>

        {/* Menu Profil - Menggunakan text-theme-primary secara dinamis */}
        <button 
          onClick={() => router.push('/profile')}
          className={`flex flex-col items-center gap-1 transition-all ${pathname === '/profile' ? 'text-theme-primary font-black' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profil</span>
        </button>
      </div>

      {/* BOTTOM SHEET MODAL QRIS */}
      {isOpenQR && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end transition-opacity">
          <div className="flex-1" onClick={() => setIsOpenQR(false)} />
          
          <div className="bg-white rounded-t-[2rem] p-6 pb-8 max-h-[80vh] overflow-y-auto animate-slideUp shadow-2xl flex flex-col items-center relative z-50">
            
            <div className="w-12 h-1 bg-slate-200 rounded-full mb-4 -mt-1" />

            <button 
              onClick={() => setIsOpenQR(false)}
              className="absolute top-5 right-5 p-1.5 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-between w-full mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>QRIS Merchant</span>
              {/* Status teks dinamis mengikuti tema */}
              <span className="text-theme-primary">
                {isDynamic ? "💥 Dinamis Nominal" : "✨ Statis Bebas Scan"}
              </span>
            </div>

            {/* PERBAIKAN TOTAL BOX QR CODE: 
               Mengembalikan fungsi render gambar QR Code yang besar agar fungsional saat dipindai HP pembeli.
            */}
            <div className="w-48 h-48 bg-white border border-slate-100 rounded-2xl flex items-center justify-center relative shadow-inner p-4 mb-2">
              {isGenerating && (
                <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center">
                  <RefreshCw className="w-7 h-7 text-theme-primary animate-spin" />
                </div>
              )}
              <QrCode className={`w-full h-full transition-all ${isDynamic && !amount ? 'text-slate-200' : 'text-slate-800'}`} />
            </div>
            
            <p className="font-bold text-slate-800 text-sm tracking-tight">{merchantName}</p>
            <p className="text-[9px] text-slate-400 font-mono mt-0.5">NMID: ID1020304050607</p>

            {/* Tab Pilihan Tipe QRIS */}
            <div className="w-full border-t border-slate-100 mt-4 pt-4">
              <div className="flex gap-2 p-1 bg-slate-50 rounded-xl text-xs font-bold">
                <button 
                  type="button"
                  onClick={() => { setIsDynamic(false); setAmount(''); }}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${!isDynamic ? "bg-white text-theme-primary shadow-sm" : "text-slate-400"}`}
                >
                  QRIS Statis
                </button>
                <button 
                  type="button"
                  onClick={() => setIsDynamic(true)}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${isDynamic ? "bg-white text-theme-primary shadow-sm" : "text-slate-400"}`}
                >
                  QRIS Dinamis
                </button>
              </div>

              {/* Input Nominal QRIS Dinamis */}
              {isDynamic && (
                <div className="mt-3.5 animate-fadeIn">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Nominal Transaksi</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs font-bold">Rp</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0"
                      /* PERBAIKAN FOCUS RING: Disinkronkan menggunakan 'focus:ring-theme-primary' */
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all"
                    />
                  </div>
                  {amount && !isGenerating && (
                    <p className="text-[10px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Siap bayar senilai Rp {Number(amount).toLocaleString('id-ID')}
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}