"use client";

import { useRouter } from 'next/navigation';
import { Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  merchantName: string;
  status: string;
  todayRevenue: number;
  balance: number;
}

export default function Header({ merchantName, status, todayRevenue, balance }: HeaderProps) {
  const router = useRouter();

  return (
    /* 1. SEKARANG 100% DINAMIS: 
       Menggunakan 'from-theme-grad-start to-theme-grad-end' agar background 
       bisa berubah otomatis dari Steel Blue ke Hijau Cyber atau Ungu Luxury.
    */
    <div className="bg-gradient-to-br from-theme-grad-start to-theme-grad-end p-6 rounded-b-[2rem] text-white shadow-xl flex-shrink-0 relative overflow-hidden transition-all duration-300">
      
      {/* Efek kilatan cahaya tipis di background hiasan teknologi (Dibuat dinamis membaca warna utama tema) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Baris Nama & Status */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Merchant Platform</p>
          <h2 className="text-lg font-bold truncate max-w-[200px] mt-0.5 tracking-tight">{merchantName}</h2>
        </div>
        {/* Badge status menggunakan opasitas putih transparan agar fleksibel masuk di tema warna apa saja */}
        <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/10 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          {status}
        </span>
      </div>

      {/* Grid Informasi Finansial */}
      <div className="grid grid-cols-2 gap-4 mt-2 relative z-10">
        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-white/60 text-xs flex items-center gap-1.5 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" /> Omset Hari Ini
          </p>
          <p className="text-xl font-black mt-1.5 tracking-tight text-white">Rp {todayRevenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-white/60 text-xs flex items-center gap-1.5 font-medium">
            <Wallet className="w-3.5 h-3.5 opacity-80" /> Saldo Tersedia
          </p>
          <p className="text-xl font-black mt-1.5 tracking-tight text-white">Rp {balance.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* 2. TOMBOL AKSI UTAMA DINAMIS:
         Menggunakan 'bg-theme-primary' dan shadow yang dinamis agar jika ganti tema,
         tombol ini otomatis berubah dari Crimson Red ke Hijau Emerald atau Ungu Royal.
      */}
      <button 
        onClick={() => router.push('/withdrawal')}
        className="w-full bg-theme-primary hover:opacity-90 text-white font-bold py-3.5 rounded-xl mt-5 text-sm flex items-center justify-center gap-2 shadow-lg shadow-theme-primary/20 transition-all active:scale-[0.98] relative z-10"
      >
        <ArrowDownLeft className="w-4 h-4" /> Tarik Pendapatan ke Rekening Bank
      </button>

    </div>
  );
}