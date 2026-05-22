// src/components/MobileLayout.tsx
import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    /* PERBAIKAN BACKGROUND LUAR:
       Mengubah 'bg-gray-100' menjadi 'bg-theme-bg/50' atau membiarkannya transparan 
       agar jika tema berubah menjadi hijau/ungu, warna latar desktop ikut menyesuaikan secara elegan.
    */
    <div className="min-h-screen bg-theme-bg/60 flex justify-center items-center antialiased p-0 sm:p-4 transition-all duration-300">
      
      {/* KUNCI FRAME HP VIEWPORT */}
      <main className="w-full max-w-md h-screen sm:h-[840px] sm:rounded-[2.5rem] bg-white shadow-2xl flex flex-col relative overflow-hidden border border-slate-900/5">
        
        {/* Konten halaman di dalam frame */}
        {children}
        
      </main>

    </div>
  );
}