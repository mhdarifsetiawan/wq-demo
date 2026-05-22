import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aplikasi QRIS Instan UMKM",
  description: "Terima pembayaran QRIS dan Virtual Account instan hanya dengan Rp 10.000",
};

// Mengunci zoom otomatis di browser HP saat input teks demi kenyamanan UX Merchant
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    /* KUNCI PRODUCTION: 
       'theme-default' di sini bertindak sebagai tema standar (fallback). 
       Begitu user login, 'className' di tag html ini akan langsung dioverride/ditimpa 
       secara otomatis oleh 'useEffect' yang ada di (main)/layout.tsx sesuai database.
    */
    <html lang="id" className="theme-temp1">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}