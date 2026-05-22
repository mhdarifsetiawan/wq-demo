"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/MobileLayout';
import { CheckCircle2, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

export default function ChoosePlan() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Di sini nanti tim junior dev tinggal mengganti dengan fungsi fetch() ke backend orchestrator Anda
    // Contoh: POST /api/v1/merchant/activate-plan
    setTimeout(() => {
      setIsLoading(false);
      // Setelah transaksi sukses, langsung arahkan ke Dashboard Utama
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <MobileLayout>
      <div className="p-6 flex flex-col justify-between flex-1">
        
        {/* Bagian Atas: Header Informasi */}
        <div className="animate-fadeIn">
          {/* PERBAIKAN TEKS: Diubah ke 'text-theme-primary' */}
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            <span>Langkah 2 dari 2</span>
            <span className="text-theme-primary transition-colors duration-300">Aktivasi Akun</span>
          </div>
          
          {/* PERBAIKAN LINGKARAN IKON: Diubah ke 'bg-theme-primary/10' */}
          <div className="w-12 h-12 bg-theme-primary/10 text-theme-primary rounded-2xl flex items-center justify-center mb-4 mt-2 transition-all duration-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Biaya Aktivasi QRIS</h1>
          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
            Satu langkah terakhir. Bayar biaya pendaftaran sekali di awal untuk membuka seluruh fitur pembayaran instan toko Anda.
          </p>

          {/* KARTU PAKET (100% DINAMIS):
              Mengubah border, background, dan badge atas agar mengikuti tema aktif secara harmonis.
          */}
          <div className="mt-6 p-5 rounded-2xl border-2 border-theme-primary bg-theme-primary/5 relative shadow-sm transition-all duration-300">
            
            {/* Badge Judul Paket */}
            <span className="absolute -top-3 left-4 bg-theme-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-300">
              Paket UMKM Merdeka
            </span>
            
            <div className="flex justify-between items-baseline mt-2">
              <h3 className="text-xs font-black text-slate-800 tracking-tight">Aktivasi Instan</h3>
              <div className="text-right">
                {/* Nominal Harga Mengikuti Tema */}
                <span className="text-xl font-black text-theme-primary transition-colors duration-300">Rp 10.000</span>
                <span className="text-slate-400 text-[9px] block font-bold uppercase mt-0.5 tracking-wider">Sekali Bayar</span>
              </div>
            </div>
            
            {/* Keunggulan Fitur (Warna hijau sukses dipertahankan karena semantik psikologi aman) */}
            <ul className="mt-5 space-y-3 text-xs text-slate-600 border-t border-theme-primary/10 pt-4 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">QRIS Statis & Dinamis Otomatis Aktif</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">Terima E-Wallet & Seluruh Bank</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">Penarikan Dana (Withdrawal) Harian</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">Tanpa Biaya Bulanan Tersembunyi</span>
              </li>
            </ul>
          </div>

          {/* Catatan Keamanan Keuangan Netral */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5">
            <CreditCard className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-slate-400 leading-normal font-medium">
              Sistem pembayaran diamankan oleh enkripsi berlapis payment orchestrator. Proses verifikasi kelayakan dokumen dilakukan otomatis secara instan oleh sistem backend.
            </p>
          </div>
        </div>

        {/* Bagian Bawah: Tombol Pembayaran Dinamis */}
        <div className="mb-2 mt-8">
          {/* PERBAIKAN BUTTON CTA: Mengubah warna ke bg-theme-primary */}
          <button 
            onClick={handlePaymentSubmit}
            disabled={isLoading}
            className="w-full bg-theme-primary hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-theme-primary/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Bayar Rp 10.000 & Aktifkan</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </MobileLayout>
  );
}