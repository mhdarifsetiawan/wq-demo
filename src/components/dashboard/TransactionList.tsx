"use client";

import Link from 'next/link';

interface Transaction {
  id: number;
  source: string;
  time: string;
  amount: number;
  type: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Aktivitas Transaksi ({transactions.length})
        </h3>
        
        <span className="text-[10px] font-black text-theme-primary bg-theme-primary/10 px-2.5 py-1 rounded-md tracking-wider uppercase">
          Realtime
        </span>
      </div>
      
      <div className="space-y-2.5">
        {transactions.map((tx) => (
          /* KUNCI LINK INTERAKTIF:
             Kita ubah 'div' terluar menjadi 'Link' Next.js yang mengarah ke routing dinamis [id].
             Tambahkan 'block' dan efek 'active:scale-[0.99]' agar terasa seperti menekan tombol aplikasi native.
          */
          <Link 
            key={tx.id} 
            href={`/dashboard/transaction/${tx.id}`}
            className="flex justify-between items-center bg-white p-3.5 border border-slate-100 rounded-xl shadow-sm hover:border-slate-200/80 hover:shadow-md active:scale-[0.99] transition-all duration-200 block cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Badge Tipe QRIS */}
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-extrabold text-[10px] tracking-tight border border-emerald-100/50 flex-shrink-0">
                {tx.type}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Pembayaran via {tx.source}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{tx.time} • Berhasil</p>
              </div>
            </div>
            
            {/* Nominal Uang Masuk */}
            <span className="text-sm font-black text-emerald-600 flex-shrink-0 pl-2">
              +Rp {tx.amount.toLocaleString('id-ID')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}