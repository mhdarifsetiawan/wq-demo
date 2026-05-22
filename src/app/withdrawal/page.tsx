/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/MobileLayout';
import { ArrowLeft, Wallet, Building2, CreditCard, ArrowRight, CheckCircle2, ShieldCheck, Delete } from 'lucide-react';

export default function Withdrawal() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ==========================================
  // STATE BARU UNTUK PENGENDALI OVERLAY PIN
  // ==========================================
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState<string[]>([]);
  const [pinError, setPinError] = useState('');

  // Simulasi data rekening terdaftar milik UMKM (bisa diset otomatis dari data KYC)
  const balance = 345000;
  const merchantBank = {
    bankName: "PT. Bank Central Asia (BCA)",
    accountNumber: "8410******",
    accountHolder: "BUDI SANTOSO / WARTEG BAHARI"
  };

  // 1. MODIFIKASI JALUR: Cegat submit form untuk validasi & buka Modal PIN
  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawalAmount = Number(amount);

    // Validasi saldo & nominal bawaan Anda
    if (withdrawalAmount < 10000) {
      alert("Minimal penarikan dana adalah Rp 10.000");
      return;
    }
    if (withdrawalAmount > balance) {
      alert("Saldo Anda tidak mencukupi untuk penarikan ini.");
      return;
    }

    // Jika validasi lolos, bersihkan data PIN lama dan munculkan modal
    setPin([]);
    setPinError('');
    setShowPinModal(true);
  };

  // 2. EFEK OTOMATIS: Deteksi jika user sudah selesai mengetik 6 digit PIN
  useEffect(() => {
    if (pin.length === 6) {
      const enteredPin = pin.join('');
      
      // Jalankan verifikasi PIN (Simulasi API: POST /api/v1/auth/verify-pin)
      if (enteredPin === '123456') {
        setShowPinModal(false); // Tutup modal pin
        executeActualWithdrawal(); // Jalankan fungsi transfer bawaan Anda
      } else {
        setPinError('PIN yang Anda masukkan salah.');
        setPin([]); // Reset bulatan PIN
      }
    }
  }, [pin]);

  // 3. LOGIKA TRANSFER ASLI: Logika asli setTimeout milik Anda dipindah ke sini
  const executeActualWithdrawal = () => {
    setIsLoading(true);

    // Simulasi hit API backend orchestrator (Endpoint: POST /api/v1/disbursement/withdraw)
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Fungsi pembantu pemicu keypad angka kustom
  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      setPinError('');
      setPin(prev => [...prev, num]);
    }
  };

  const handleDeletePin = () => {
    setPin(prev => prev.slice(0, -1));
  };

  // LAYAR 1: Tampilan jika penarikan dana berhasil dilakukan (100% Sesuai File Asli Anda)
  if (isSuccess) {
    return (
      <MobileLayout>
        <div className="p-6 flex flex-col justify-between flex-1 text-center">
          <div className="flex-1 flex flex-col items-center justify-center my-auto animate-fadeIn">
            {/* Status Sukses Universal (Warna hijau dipertahankan demi keandalan psikologi finansial) */}
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Penarikan Berhasil!</h2>
            <p className="text-slate-500 text-xs mt-2 max-w-[260px] mx-auto leading-relaxed font-medium">
              Dana sebesar <span className="font-black text-slate-800">Rp {Number(amount).toLocaleString('id-ID')}</span> sedang ditransfer ke rekening bank Anda.
            </p>

            <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6 text-left space-y-2.5 text-xs font-medium">
              <div className="flex justify-between"><span className="text-slate-400">Bank Tujuan:</span><span className="font-bold text-slate-800">{merchantBank.bankName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">No. Rekening:</span><span className="font-mono font-bold text-slate-800">{merchantBank.accountNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Biaya Admin:</span><span className="font-bold text-emerald-600">Rp 0 (Promo MVP)</span></div>
            </div>
          </div>

          {/* Tombol kembali yang dinamis menyesuaikan tema */}
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full bg-theme-primary hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-theme-primary/10 transition-all active:scale-[0.98]"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </MobileLayout>
    );
  }

  // LAYAR 2: Form Utama Input Penarikan Dana (Ditambahkan pembungkus relative untuk penempatan modal)
  return (
    <MobileLayout>
      <div className="relative flex flex-col flex-1 h-full">
        
        {/* Bagian Atas: Navigasi Back & Judul Halaman */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-slate-600"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-black text-slate-900 tracking-tight">Tarik Dana Bisnis</h1>
        </div>

        <form onSubmit={handleWithdrawalSubmit} className="p-6 flex flex-col justify-between flex-1">
          <div className="space-y-6">
            
            {/* Informasi Sisa Saldo Tersedia (100% DINAMIS MENGIKUTI TEMA) */}
            <div className="bg-theme-primary-light border border-theme-primary/10 p-4 rounded-xl flex items-center gap-3.5 transition-all duration-300">
              <div className="w-10 h-10 bg-theme-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-theme-primary/20 transition-all duration-300">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-theme-primary font-black uppercase tracking-wider transition-colors duration-300">Saldo Yang Bisa Ditarik</p>
                <p className="text-lg font-black text-slate-900 mt-0.5 tracking-tight">Rp {balance.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Detail Rekening Bank Penerima (Locked view) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Rekening Bank Tujuan</label>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700">{merchantBank.bankName}</span>
                </div>
                <div className="flex items-center gap-2.5 border-t border-gray-200/40 pt-2.5">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-800">{merchantBank.accountNumber}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{merchantBank.accountHolder}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Input Nominal Tarik */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal Penarikan</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-xs font-bold">Rp</span>
                </div>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Masukkan jumlah pencairan"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary focus:bg-white text-slate-800 transition-all"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-between items-center px-1 pt-0.5">
                <span className="text-[10px] text-slate-400 font-medium">Minimal penarikan Rp 10.000</span>
                <button 
                  type="button" 
                  onClick={() => setAmount(balance.toString())}
                  className="text-[10px] text-theme-primary font-black uppercase tracking-wider hover:underline transition-colors duration-300"
                  disabled={isLoading}
                >
                  Tarik Semua
                </button>
              </div>
            </div>

          </div>

          {/* Tombol Konfirmasi Akhir */}
          <div className="mb-2 mt-8">
            <button
              type="submit"
              disabled={isLoading || !amount}
              className="w-full bg-theme-primary hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-theme-primary/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Konfirmasi Cairkan Dana</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* ========================================================
            MODAL OVERLAY PIN (Hanya dirender jika `showPinModal` bernilai true)
            ======================================================== */}
        {showPinModal && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex flex-col justify-end animate-fadeIn">
            <div className="bg-white rounded-t-3xl p-6 space-y-6 shadow-2xl animate-slideUp border-t border-slate-100">
              
              {/* Header Modal PIN */}
              <div className="flex flex-col items-center text-center pt-2">
                <div className="w-11 h-11 bg-theme-primary/10 text-theme-primary rounded-xl flex items-center justify-center mb-3 border border-theme-primary/5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">PIN Keamanan Diperlukan</h3>
                <p className="text-slate-400 text-[11px] mt-0.5 font-medium max-w-[220px]">
                  Konfirmasi pencairan dana Anda dengan memasukkan 6 digit PIN.
                </p>

                {/* Bulatan Indikator PIN */}
                <div className="flex gap-3.5 mt-6 justify-center items-center h-6">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full border-2 transition-all duration-100 ${
                        idx < pin.length
                          ? 'bg-theme-primary border-theme-primary scale-110 shadow-sm'
                          : 'bg-transparent border-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Banner Pesan Eror */}
                {pinError && (
                  <p className="text-[10px] text-rose-600 font-bold mt-3 bg-rose-50 px-2.5 py-0.5 rounded-md">
                    {pinError}
                  </p>
                )}
              </div>

              {/* Keypad Angka Mobile 3x4 */}
              <div className="pb-4">
                <div className="grid grid-cols-3 gap-x-6 gap-y-3 max-w-[240px] mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleKeyPress(num)}
                      className="w-12 h-12 mx-auto rounded-full bg-slate-50 active:bg-theme-primary/10 active:text-theme-primary text-base font-bold text-slate-700 transition-all flex items-center justify-center border border-slate-100/50"
                    >
                      {num}
                    </button>
                  ))}

                  <button 
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="text-[10px] font-bold uppercase text-slate-400 tracking-wider my-auto text-center hover:text-slate-600"
                  >
                    Batal
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleKeyPress('0')}
                    className="w-12 h-12 mx-auto rounded-full bg-slate-50 active:bg-theme-primary/10 active:text-theme-primary text-base font-bold text-slate-700 transition-all flex items-center justify-center border border-slate-100/50"
                  >
                    0
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleDeletePin}
                    className="w-12 h-12 mx-auto rounded-full bg-slate-50 active:bg-rose-50 text-slate-400 active:text-rose-600 transition-all flex items-center justify-center"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </MobileLayout>
  );
}