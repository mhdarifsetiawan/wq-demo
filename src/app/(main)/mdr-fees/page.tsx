"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Percent, HelpCircle, CheckCircle2, Calculator, ShieldCheck } from 'lucide-react';

export default function MdrFeesPage() {
  const router = useRouter();
  
  // State untuk kalkulator simulasi potongan MDR
  const [inputAmount, setInputAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'QRIS' | 'VA'>('QRIS');

  // Struktur tarif MDR sesuai regulasi BI & kebijakan orchestrator Anda
  const mdrTariffs = {
    qris: { rate: 0.7, label: "QRIS Nasional (UMK)", settlement: "Instan / Real-time" },
    va: { rate: 0, label: "Virtual Account (Promo MVP)", settlement: "H+1 Hari Kerja" }
  };

  // Hitung simulasi potongan
  const amountNumber = Number(inputAmount) || 0;
  const currentRate = selectedMethod === 'QRIS' ? mdrTariffs.qris.rate : mdrTariffs.va.rate;
  const mdrCut = Math.round((amountNumber * currentRate) / 100);
  const receivedAmount = amountNumber - mdrCut;

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-slate-50/60 transition-all duration-300 animate-fadeIn">
      
      {/* Bagian Atas: Header Navigasi */}
      <div className="p-6 border-b border-slate-100 bg-white flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => router.push('/dashboard')} 
          className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-slate-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-black text-slate-900 tracking-tight">Skema Biaya MDR</h1>
      </div>

      <div className="p-4 space-y-4">
        
        {/* BANNER UTAMA: Info Transparansi Tarif */}
        <div className="bg-theme-primary-light border border-theme-primary/10 p-5 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-theme-primary/10">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900 tracking-tight">Transparansi Potongan Adil</h2>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
              Biaya MDR hanya dipotong per transaksi sukses secara otomatis dari sistem. Tanpa biaya admin bulanan tersembunyi.
            </p>
          </div>
        </div>

        {/* DAFTAR TARIF AKTIF BERDASARKAN KANAL */}
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tarif Berlaku Saat Ini</label>
          
          {/* Opsi 1: QRIS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-800 tracking-tight">{mdrTariffs.qris.label}</span>
              <span className="block text-[10px] text-slate-400 font-medium">Pencairan: {mdrTariffs.qris.settlement}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-theme-primary bg-theme-primary-light px-2.5 py-1 rounded-xl border border-theme-primary/5">
                {mdrTariffs.qris.rate}%
              </span>
            </div>
          </div>

          {/* Opsi 2: Virtual Account */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-800 tracking-tight">{mdrTariffs.va.label}</span>
              <span className="block text-[10px] text-slate-400 font-medium">Pencairan: {mdrTariffs.va.settlement}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                {mdrTariffs.va.rate}%
              </span>
            </div>
          </div>
        </div>

        {/* SIMULATOR / KALKULATOR PENDAPATAN MERCHANT */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-theme-primary" /> Simulator Potongan Pendapatan
          </h3>

          {/* Switch Pilih Metode */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {(['QRIS', 'VA'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`flex-1 py-1.5 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  selectedMethod === method
                    ? 'bg-white text-theme-primary shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {method} ({method === 'QRIS' ? `${mdrTariffs.qris.rate}%` : 'Gratis'})
              </button>
            ))}
          </div>

          {/* Input Nominal */}
          <div className="space-y-1.5">
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="text-slate-400 text-xs font-bold">Rp</span>
              </div>
              <input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="Masukkan nominal penjualan contoh: 100000"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Hasil Perhitungan Simulator */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-medium space-y-2.5">
            <div className="flex justify-between">
                <span className="text-slate-400">Potongan Biaya MDR:</span>
                {/* ✨ PERBAIKAN: Mengubah 'mddrCut' menjadi 'mdrCut' */}
                <span className={`font-bold ${mdrCut > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                - Rp {mdrCut.toLocaleString('id-ID')}
                </span>
            </div>
            <div className="flex justify-between border-t border-slate-200/60 pt-2.5 font-black text-slate-900">
                <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bersih Diterima:
                </span>
                <span className="text-emerald-600">
                Rp {receivedAmount.toLocaleString('id-ID')}
                </span>
            </div>
            </div>
        </div>

        {/* REGULASI DAN JAMINAN KEAMANAN */}
        <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400 font-medium justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Sesuai standar regulasi Bank Indonesia</span>
        </div>

      </div>
    </div>
  );
}