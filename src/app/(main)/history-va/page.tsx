"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Calendar, Clock, Landmark, Search, AlertCircle } from 'lucide-react';

export default function HistoryVA() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'PENDING' | 'SUKSES' | 'EXPIRED'>('PENDING');

  // Simulasi data riwayat invoice VA dari backend orchestrator Anda
  // (GET /api/v1/va/list)
  const vaData = [
    { id: "inv-01", customer: "Toko Kelontong Andi", bank: "BCA", vaNumber: "8410082194810294", amount: 150000, status: "PENDING", expiry: "Hari ini, 23:59 WIB" },
    { id: "inv-02", customer: "Catering Ibu Maya", bank: "Mandiri", vaNumber: "8950812948102395", amount: 350000, status: "PENDING", expiry: "Besok, 12:00 WIB" },
    { id: "inv-03", customer: "Dropishipper Reza", bank: "BRI", vaNumber: "1234092184102943", amount: 75000, status: "SUKSES", expiry: "Selesai" },
    { id: "inv-04", customer: "Laundry Berkah", bank: "BCA", vaNumber: "8410081294810281", amount: 120000, status: "EXPIRED", expiry: "Kadaluarsa" },
  ];

  // Filter data berdasarkan tab aktif
  const filteredData = vaData.filter(item => item.status === activeTab);

  const handleCopyVA = (num: string) => {
    navigator.clipboard.writeText(num);
    alert("Nomor Virtual Account berhasil disalin!");
  };

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
        <h1 className="text-sm font-black text-slate-900 tracking-tight">Riwayat Transaksi VA</h1>
      </div>

      {/* SEGMENTED CONTROL / TAB FILTER (Dinamis Sesuai Tema Aktif) */}
      <div className="p-4 bg-white border-b border-slate-100">
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {(['PENDING', 'SUKSES', 'EXPIRED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-theme-primary shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'PENDING' ? 'Menunggu' : tab === 'SUKSES' ? 'Sukses' : 'Batal'}
            </button>
          ))}
        </div>
      </div>

      {/* AREA UTAMA DAFTAR INVOICE VA */}
      <div className="p-4 space-y-3">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-400">Tidak ada riwayat Virtual Account</p>
          </div>
        ) : (
          filteredData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3"
            >
              {/* Baris Atas: Nama Pelanggan & Nominal Tagihan */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">{item.customer}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">{item.id}</p>
                </div>
                <span className={`text-xs font-black ${item.status === 'SUKSES' ? 'text-emerald-600' : item.status === 'EXPIRED' ? 'text-slate-400' : 'text-theme-primary'}`}>
                  Rp {item.amount.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Baris Tengah: Info Rekening Pembayaran Bank (Locked View & Copy Action) */}
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-theme-primary/10 text-theme-primary flex items-center justify-center font-black text-[10px] border border-theme-primary/5">
                    {item.bank}
                  </div>
                  <div>
                    <p className="font-mono font-black text-slate-700 tracking-wide">{item.vaNumber}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 font-medium">Virtual Account {item.bank}</p>
                  </div>
                </div>
                
                {/* Tombol Salin Cepat jika statusnya masih Pending */}
                {item.status === 'PENDING' && (
                  <button 
                    onClick={() => handleCopyVA(item.vaNumber)}
                    className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-600 transition-all active:scale-90"
                    title="Salin Nomor"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Baris Bawah: Tenggat Waktu Pembayaran */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Batas Bayar:
                </span>
                <span className={`font-bold ${item.status === 'PENDING' ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded' : 'text-slate-500'}`}>
                  {item.expiry}
                </span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}