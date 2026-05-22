"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/MobileLayout';
import { Camera, Store, User, FileText, ArrowRight } from 'lucide-react';

export default function KYCRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk form data
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    businessType: 'Retail',
  });

  // State untuk melacak nama file yang diunggah
  const [ktpFileName, setKtpFileName] = useState('');
  const [shopFileName, setShopFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'ktp' | 'shop') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'ktp') setKtpFileName(file.name);
      if (type === 'shop') setShopFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ktpFileName || !shopFileName) {
      alert("Silakan unggah Foto KTP dan Foto Toko terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/register/plan');
    }, 1200);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col justify-between flex-1 p-6">
        
        {/* Bagian Atas: Judul Langkah */}
        <div className="animate-fadeIn">
          {/* PERBAIKAN DYNAMIC COLOR: 'text-brand-steel' diubah ke 'text-theme-primary' */}
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            <span>Langkah 1 dari 2</span>
            <span className="text-theme-primary transition-colors duration-300">Verifikasi Usaha</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Lengkapi Dokumen</h1>
          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">Data ini diperlukan oleh regulator untuk mengaktifkan fitur pembayaran QRIS Anda secara resmi.</p>
          
          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Input Nama Pemilik */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Nama Sesuai KTP</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="ownerName"
                  required
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Budi Santoso"
                  /* PERBAIKAN DYNAMIC FOCUS: Diubah ke focus:ring-theme-primary */
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all text-ellipsis"
                />
              </div>
            </div>

            {/* Input Nama Toko */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Nama Toko / Usaha</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Store className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="shopName"
                  required
                  value={formData.shopName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Warung Sejahtera"
                  /* PERBAIKAN DYNAMIC FOCUS: Diubah ke focus:ring-theme-primary */
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all text-ellipsis"
                />
              </div>
            </div>

            {/* Pilihan Jenis Usaha */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Jenis Usaha</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FileText className="h-4 w-4 text-slate-400" />
                </div>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  /* PERBAIKAN DYNAMIC FOCUS: Diubah ke focus:ring-theme-primary */
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all appearance-none"
                >
                  <option value="Retail">Retail / Toko Kelontong</option>
                  <option value="F&B">Makanan & Minuman (F&B)</option>
                  <option value="Jasa">Jasa / Servis</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            {/* Pembatas Upload Berkas Fisik (Warna status kesuksesan emerald dipertahankan karena bersifat universal semantik) */}
            <div className="pt-2">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Unggah Foto Berkas</span>
              <div className="grid grid-cols-2 gap-3">
                
                {/* Kamera / File Input KTP */}
                <label className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${ktpFileName ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, 'ktp')} 
                  />
                  <Camera className={`w-6 h-6 mb-1 ${ktpFileName ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="text-[11px] font-bold text-slate-700 block">Foto KTP</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 max-w-[120px] truncate block font-medium">
                    {ktpFileName || "Klik untuk mengambil"}
                  </span>
                </label>

                {/* Kamera / File Input Usaha */}
                <label className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${shopFileName ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, 'shop')} 
                  />
                  <Camera className={`w-6 h-6 mb-1 ${shopFileName ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="text-[11px] font-bold text-slate-700 block">Foto Toko</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 max-w-[120px] truncate block font-medium">
                    {shopFileName || "Tampak depan kios"}
                  </span>
                </label>

              </div>
            </div>

          </form>
        </div>

        {/* Bagian Bawah: Tombol Submit Semantik Dinamis */}
        <div className="mt-8 mb-2">
          {/* PERBAIKAN DYNAMIC BUTTON: 'bg-brand-crimson' diubah ke 'bg-theme-primary' */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-theme-primary hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-theme-primary/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Lanjutkan Pilih Paket</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </MobileLayout>
  );
}