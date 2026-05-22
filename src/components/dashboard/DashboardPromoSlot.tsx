"use client";

import Link from 'next/link'; // <-- KUNCI: Impor Link untuk navigasi antar halaman Next.js
import { ArrowRightLeft, FileSpreadsheet, History, Percent } from 'lucide-react';

export default function DashboardPromoSlot() {
  const quickMenus = [
    { 
      id: 1, 
      label: "Transfer", 
      icon: <ArrowRightLeft className="w-5 h-5 text-theme-primary" />, 
      bgColor: "bg-theme-primary-light",
      href: "/withdrawal" // <-- Mengarah ke alur penarikan dana & PIN kustom Anda
    },
    { 
      id: 2, 
      label: "Riwayat VA", 
      /* PERBAIKAN SINKRONISASI: 
         Mengubah dari text-slate ke 'text-theme-primary' agar ikut memancarkan warna brand pilihan merchant */
      icon: <History className="w-5 h-5 text-theme-primary" />, 
      bgColor: "bg-theme-primary-light",
      href: "/history-va" // <-- Mengarah ke alur daftar Virtual Account baru Anda
    },
    { 
      id: 3, 
      label: "Laporan", 
      icon: <FileSpreadsheet className="w-5 h-5 text-theme-primary" />, 
      bgColor: "bg-theme-primary-light",
      href: "/reports" // Kosongkan jika belum ada halamannya, nanti akan dicegat oleh onClick alert
    },
    { 
      id: 4, 
      label: "Biaya MDR", 
      icon: <Percent className="w-5 h-5 text-theme-primary" />, 
      bgColor: "bg-theme-primary-light",
      href: "/mdr-fees"
    },
  ];

  return (
    <div className="w-full flex-shrink-0 animate-fadeIn mt-4">
      {/* Box putih melayang */}
      <div className="mx-6 bg-white rounded-2xl p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] border border-slate-100 flex justify-between items-center">
        {quickMenus.map((menu) => {
          // JIKA BERKAS MEMILIKI HREF: Gunakan komponen Link bawaan Next.js untuk navigasi mulus
          if (menu.href) {
            return (
              <Link
                key={menu.id}
                href={menu.href}
                className="flex flex-col items-center gap-2 group active:scale-95 transition-all flex-1 cursor-pointer"
              >
                <div className={`w-11 h-11 ${menu.bgColor} rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-sm`}>
                  {menu.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-600 tracking-tight text-center">
                  {menu.label}
                </span>
              </Link>
            );
          }

          // JIKA BELUM MEMILIKI HREF: Tetap pertahankan button alert bawaan asli Anda (Laporan & MDR)
          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => alert(`Fitur ${menu.label} segera hadir!`)}
              className="flex flex-col items-center gap-2 group active:scale-95 transition-all flex-1"
            >
              <div className={`w-11 h-11 ${menu.bgColor} rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-sm`}>
                {menu.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-600 tracking-tight text-center">
                {menu.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}