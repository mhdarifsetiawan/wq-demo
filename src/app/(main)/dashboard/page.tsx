"use client";

import Header from '@/components/dashboard/Header';
import DashboardPromoSlot from '@/components/dashboard/DashboardPromoSlot';
import TransactionList from '@/components/dashboard/TransactionList';

export default function Dashboard() {
  const merchantInfo = { name: "Warteg Bahari Mulia", status: "Aktif" };
  const balance = 1435000;
  const todayRevenue = 585000;

  const mockTransactions = [
    { id: 1, source: "ShopeePay", time: "14:25", amount: 25000, type: "QRIS" },
    { id: 2, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 3, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 4, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 5, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 6, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 7, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 8, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 9, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
    { id: 10, source: "Gopay", time: "14:02", amount: 42000, type: "QRIS" },
  ];

  return (
    <>
      {/* HEADER STATIC DI ATAS */}
      <Header 
        merchantName={merchantInfo.name}
        status={merchantInfo.status}
        todayRevenue={todayRevenue}
        balance={balance}
      />
      
      {/* SLOT QUICK ACTIONS */}
      <div className="w-full flex-shrink-0 z-10 relative">
        <DashboardPromoSlot />
      </div>

      {/* AREA SCROLL TRANSAKSI */}
      <div className="flex-1 overflow-y-auto pb-24 pt-4">
        <TransactionList transactions={mockTransactions} />
      </div>
    </>
  );
}