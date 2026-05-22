"use client";

import { useState, useEffect } from 'react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';

export default function MainAppTemplate({ children }: { children: React.ReactNode }) {
  /* 1. STATE TEMA DARI DATABASE:
     Nanti junior dev tinggal mengganti 'theme-default' ini dengan hasil fetch API 
     dari database backend (misalnya: res.data.merchant.theme_preference)
  */
  const [activeTheme, setActiveTheme] = useState('theme-temp1');

  // Efek ini akan otomatis mengunci tema merchant di level HTML tanpa campur tangan user
  useEffect(() => {
    document.documentElement.className = activeTheme;
  }, [activeTheme]);

  return (
    <MobileLayout>
      
      {/* 💥 TOMBOL TOGGLE DEMO SUDAH DIHAPUS TOTAL UNTUK PRODUCTION */}

      {/* AREA KONTEN HALAMAN */}
      {children}
      
      {/* MENU BOTTOM */}
      <BottomNav />

    </MobileLayout>
  );
}