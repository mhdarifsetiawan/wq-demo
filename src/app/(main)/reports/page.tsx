"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, ArrowDownRight, ArrowUpRight, BarChart3, Download, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<'HARIAN' | 'MINGGUAN' | 'BULANAN'>('HARIAN');

  // Simulasi data performa laba rugi omset toko merchant (GET /api/v1/reports/summary)
  const reportData = {
    grossRevenue: 1245000,
    netProfit: 1232550,
    totalTransactions: 48,
    growthPercentage: 12.5,
    chartData: [
      { label: "Sen", value: 40 },
      { label: "Sel", value: 75 },
      { label: "Rab", value: 60 },
      { label: "Kam", value: 90 },
      { label: "Jum", value: 55 },
      { label: "Sab", value: 110 },
      { label: "Min", value: 130 },
    ]
  };

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-slate-50/60 transition-all duration-300 animate-fadeIn">
      
      {/* Bagian Atas: Header Navigasi */}
      <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-black text-slate-900 tracking-tight">Analisis Laporan</h1>
        </div>
        
        {/* Tombol Unduh Laporan (CSV / Excel) */}
        <button 
          onClick={() => alert("Mengunduh berkas laporan format Excel...")}
          className="p-2 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-600 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* FILTER TIMEFRAME (Dinamis Mengikuti Tema) */}
      <div className="p-4 bg-white border-b border-slate-100">
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {(['HARIAN', 'MINGGUAN', 'BULANAN'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTimeframe(item)}
              className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                timeframe === item
                  ? 'bg-white text-theme-primary shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* BLOK 1: Rangkuman Total Pendapatan & Growth */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Omset Kotor</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-1">
                Rp {reportData.grossRevenue.toLocaleString('id-ID')}
              </h2>
            </div>
            {/* Indikator Pertumbuhan Bisnis (Hijau Positif) */}
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-[10px] py-1 px-2.5 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+{reportData.growthPercentage}%</span>
            </div>
          </div>

          {/* Pemisah Garis Tipis Modis */}
          <div className="border-t border-slate-100 my-4 pt-3 grid grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <span className="text-slate-400 block text-[10px] font-black uppercase tracking-wider">Laba Bersih (-MDR)</span>
              <span className="text-slate-700 font-bold block mt-0.5">Rp {reportData.netProfit.toLocaleString('id-ID')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-black uppercase tracking-wider">Total Transaksi</span>
              <span className="text-slate-700 font-bold block mt-0.5">{reportData.totalTransactions} Sukses</span>
            </div>
          </div>
        </div>

        {/* BLOK 2: Grafik Batang Performa Mingguan Kustom (100% Dinamis Tema v4) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-theme-primary" /> Grafik Distribusi Omset
            </h3>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Mei 2026
            </span>
          </div>

          {/* Area Render Tiang Grafik */}
          <div className="flex justify-between items-end h-32 pt-4 px-2">
            {reportData.chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                {/* Tiang Batang Grafik: Menggunakan warna bg-theme-primary dinamis */}
                <div 
                  style={{ height: `${data.value}%` }}
                  className="w-4 bg-theme-primary/15 group-hover:bg-theme-primary rounded-t-md transition-all duration-300 relative"
                >
                  {/* Tooltip melayang saat ditekan/hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white font-mono text-[9px] font-bold py-0.5 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {data.value}k
                  </div>
                </div>
                <span className="text-[9px] font-bold text-slate-400 mt-2 block uppercase tracking-tight">
                  {data.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BLOK 3: Insight Manajemen Bisnis */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-theme-primary/10 text-theme-primary flex items-center justify-center flex-shrink-0 border border-theme-primary/5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 tracking-tight">Rekomendasi Operasional Toko</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-medium">
              Penjualan tertinggi toko Anda terjadi pada hari **Sabtu dan Minggu**. Pastikan stok bahan baku dagangan atau etalase produk Anda terisi penuh menjelang akhir pekan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}