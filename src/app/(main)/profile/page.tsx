"use client";

import { useRouter } from 'next/navigation';
import { User, Store, LogOut, Shield, ChevronRight } from 'lucide-react';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari aplikasi?")) {
      // Junior dev tinggal menghapus token/session dari localStorage/cookies di sini
      router.push('/');
    }
  };

  return (
    /* PERBAIKAN UTAMA: 
       - Menggunakan Fragment (<>...</>) karena MobileLayout & BottomNav sudah diurus oleh parent layout.
       - 'flex-1 overflow-y-auto pb-24' mengunci area profil agar bisa di-scroll terpisah jika menu bertambah banyak.
    */
    <div className="flex-1 pb-24 overflow-y-auto bg-slate-50/50 transition-all duration-300">
      
      {/* Header Profil Semantik Dinamis */}
      <div className="bg-white p-6 border-b border-slate-100 flex items-center gap-4">
        {/* PERBAIKAN LINGKARAN IKON: 
           Menggunakan 'bg-theme-primary/10' dan 'text-theme-primary' agar otomatis 
           berubah warna dari Crimson ke Hijau Cyber atau Ungu Luxury sesuai tema aktif.
        */}
        <div className="w-14 h-14 bg-theme-primary/10 rounded-full flex items-center justify-center text-theme-primary transition-all duration-300">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-800 tracking-tight">Budi Santoso</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Pemilik Warteg Bahari Mulia</p>
        </div>
      </div>

      {/* Menu Grup 1: Pengaturan Toko */}
      <div className="mt-4 bg-white border-y border-slate-100 px-4 py-1">
        <div className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-slate-50/50 transition-all group">
          <div className="flex items-center gap-3">
            <Store className="w-4 h-4 text-slate-400 group-hover:text-theme-primary transition-colors" />
            <span className="text-xs font-bold text-slate-700">Detail Informasi Toko</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-all" />
        </div>
        
        <div className="flex items-center justify-between py-3.5 border-t border-slate-100 cursor-pointer hover:bg-slate-50/50 transition-all group">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-slate-400 group-hover:text-theme-primary transition-colors" />
            <span className="text-xs font-bold text-slate-700">Keamanan & PIN Akun</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-all" />
        </div>
      </div>

      {/* Menu Grup 2: Aksi Keluar (Tetap mempertahankan warna merah semantik peringatan/danger) */}
      <div className="mt-4 bg-white border-y border-slate-100 px-4 py-1">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 py-3.5 text-left text-rose-600 hover:bg-rose-50/30 rounded-lg transition-all font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs">Keluar dari Aplikasi</span>
        </button>
      </div>

      {/* Info Versi Aplikasi */}
      <p className="text-center text-[10px] text-slate-400 mt-10 font-bold tracking-wider">
        QRIS INSTAN v1.0.0 (MVP)
      </p>

    </div>
  );
}