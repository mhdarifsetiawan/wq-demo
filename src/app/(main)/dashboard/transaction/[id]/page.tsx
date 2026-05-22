"use client";

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Share2, Copy, Calendar, Clock, Landmark, Hash, Tag } from 'lucide-react';

export default function TransactionDetail() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id;

  // Simulasi query data berdasarkan ID dari API backend orchestrator Anda 
  // (GET /api/v1/transaction/detail/[id])
  const txDetail = {
    id: transactionId,
    amount: 42000,
    source: "Gopay",
    type: "QRIS",
    time: "14:02:25",
    date: "22 Mei 2026",
    referenceId: "TRX-20260522-901842",
    nmid: "ID1020304050607",
    terminalId: "WTR-01",
    status: "Berhasil"
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(txDetail.referenceId);
    alert("ID Referensi berhasil disalin!");
  };

  const handleShareReceipt = () => {
    alert("Membuka dialog bagikan struk belanja ke WhatsApp konsumen...");
  };

  return (
    /* flex-1 overflow-y-auto pb-24 mengunci area konten agar rapi di atas bottom nav */
    <div className="flex-1 pb-24 overflow-y-auto bg-slate-50/60 transition-all duration-300 animate-fadeIn">
      
      {/* Bagian Atas: Navigasi Back & Judul */}
      <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-black text-slate-900 tracking-tight">Detail Bukti Bayar</h1>
        </div>
        
        {/* Status Badge Dinamis Terkunci Sukses (Universal Hijau) */}
        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
          {txDetail.status}
        </span>
      </div>

      <div className="p-6 space-y-5">
        
        {/* BLOK 1: Ringkasan Jumlah Dana Masuk */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
          {/* Ornamen background halus membaca tema aktif */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-theme-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Dana Masuk</p>
          <h2 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">
            +Rp {txDetail.amount.toLocaleString('id-ID')}
          </h2>
          
          {/* Informasi Metode Bayar Dinamis */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 py-2 px-4 rounded-xl w-fit mx-auto">
            <span className="text-theme-primary font-black">{txDetail.type}</span>
            <span className="text-slate-300">•</span>
            <span>{txDetail.source}</span>
          </div>
        </div>

        {/* BLOK 2: Rincian Metadata Transaksi (Audit Trail / Rekonsiliasi) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3.5 text-xs">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Informasi Transaksi</h3>
          
          {/* Waktu & Tanggal */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-2 font-medium">
              <Calendar className="w-3.5 h-3.5" /> Tanggal
            </span>
            <span className="font-bold text-slate-700">{txDetail.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-2 font-medium">
              <Clock className="w-3.5 h-3.5" /> Waktu Presisi
            </span>
            <span className="font-bold text-slate-700">{txDetail.time} WIB</span>
          </div>

          <hr className="border-slate-100" />

          {/* ID Referensi (Bisa Disalin) */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-2 font-medium">
              <Hash className="w-3.5 h-3.5" /> ID Referensi API
            </span>
            <button 
              onClick={handleCopyReference}
              className="font-mono font-bold text-slate-800 flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60 active:scale-95 transition-all"
            >
              {txDetail.referenceId} <Copy className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* NMID Standar BI */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-2 font-medium">
              <Landmark className="w-3.5 h-3.5" /> NMID Merchant
            </span>
            <span className="font-mono font-bold text-slate-700">{txDetail.nmid}</span>
          </div>

          {/* ID Pos Terminal */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-2 font-medium">
              <Tag className="w-3.5 h-3.5" /> Kode Terminal POS
            </span>
            <span className="font-bold text-slate-700">{txDetail.terminalId}</span>
          </div>
        </div>

        {/* BLOK 3: Tombol Aksi Cetak & Bagikan */}
        <div className="pt-2">
          {/* Tombol Bagikan Struk Dinamis Mengikuti Tema */}
          <button
            onClick={handleShareReceipt}
            className="w-full bg-theme-primary hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-theme-primary/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan Struk ke WhatsApp</span>
          </button>
          
          <p className="text-center text-[10px] text-slate-400 font-medium mt-3 px-4">
            Bukti bayar ini sah diterbitkan secara otomatis oleh sistem interkoneksi ekosistem gerbang pembayaran nasional.
          </p>
        </div>

      </div>
    </div>
  );
}