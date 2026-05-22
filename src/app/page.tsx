"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/MobileLayout';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phoneNumber.length < 10) {
      alert("Silakan masukkan nomor HP yang valid (minimal 10 digit).");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Untuk demo alur pendaftaran, arahkan merchant baru ke halaman KYC
      router.push('/register/kyc');
    }, 1200);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col justify-between flex-1 p-6">
        
        {/* Bagian Atas: Logo & Branding Semantik Dinamis */}
        <div className="flex flex-col items-center text-center mt-12 animate-fadeIn">
          {/* PERBAIKAN TOTAL: 
            Menggunakan 'from-theme-grad-start to-theme-primary' agar kombinasi warna logo 
            dan bayangannya ikut bergerak dinamis mengikuti karakteristik tema aktif.
          */}
          <div className="w-16 h-16 bg-gradient-to-br from-theme-grad-start to-theme-primary rounded-2xl flex items-center justify-center shadow-lg shadow-theme-primary/10 mb-4 transform hover:scale-105 transition-all duration-300">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">WuzzQRIS Instan UMKM</h1>
          <p className="text-slate-500 text-xs mt-2 max-w-[280px] leading-relaxed font-medium">
            Satu aplikasi pintar untuk terima semua pembayaran digital merchant Anda
          </p>
        </div>

        {/* Bagian Tengah: Form Input No HP */}
        <form onSubmit={handleSubmit} className="mt-8 flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Nomor WhatsApp
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  type="number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  /* PERBAIKAN INPUT FOCUS:
                    Mengubah 'focus:ring-brand-crimson' menjadi 'focus:ring-theme-primary' 
                    agar indikator garis ketik menyala sesuai warna utama tema yang aktif.
                  */
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all placeholder:text-slate-400"
                  disabled={isLoading}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed text-center font-medium px-2">
              Dengan masuk atau mendaftar, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi platform platform kami.
            </p>
          </div>
        </form>

        {/* Bagian Bawah: Tombol Aksi Baku Semantik Dinamis */}
        <div className="mb-6">
          {/* PERBAIKAN BUTTON COLOR:
            Mengubah 'bg-brand-crimson' menjadi 'bg-theme-primary' agar tombol CTA "Mulai Sekarang" 
            bisa berubah baju otomatis dari Crimson, Hijau Emerald, atau Ungu Royal tanpa hardcoded.
          */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-theme-primary hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-theme-primary/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Mulai Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </MobileLayout>
  );
}