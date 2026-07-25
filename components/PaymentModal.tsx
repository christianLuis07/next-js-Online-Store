"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PriceFormattor from "@/components/PriceFormattor";
import { CartItem } from "@/store";
import { QrCode, Truck, CheckCircle2, Copy, Loader2, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onPaymentSuccess: (paymentMethod: string, orderDetails: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onPaymentSuccess,
}) => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "cod">("qris");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [courierNote, setCourierNote] = useState("");

  // Timer countdown for QRIS
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && paymentMethod === "qris" && !paymentCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, paymentMethod, paymentCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin!`);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceNumber = `INV/CSHOP/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;
    const resiNumber = `RESI-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const orderDetails = {
      orderNumber: orderId,
      invoice: { number: invoiceNumber },
      orderDate: new Date().toISOString(),
      customerName: "Pelanggan Setia CShop",
      email: "user@cshop.com",
      totalPrice: totalAmount,
      status: paymentMethod === "qris" ? "paid" : "pending (COD)",
      paymentMethod: paymentMethod === "qris" ? "QRIS Instant" : "COD (Bayar di Tempat)",
      resiNumber: resiNumber,
      items: items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      notes: courierNote,
    };

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      setCompletedOrder(orderDetails);
      onPaymentSuccess(paymentMethod, orderDetails);
    }, 2000);
  };

  const handleFinish = () => {
    setPaymentCompleted(false);
    onClose();
    router.push("/orders");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onClose()}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-2xl shadow-2xl">
        {!paymentCompleted ? (
          <>
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <span>Pembayaran Pembelian</span>
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Pilih metode pembayaran interaktif untuk menyelesaikan pesanan Anda.
              </DialogDescription>
            </DialogHeader>

            {/* Order Summary Snapshot */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Pembayaran</p>
                <PriceFormattor amount={totalAmount} className="text-2xl font-extrabold text-shop_dark_green" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {items.length} Barang
                </span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Metode Pembayaran</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val as "qris" | "cod")}
                className="grid grid-cols-2 gap-3"
              >
                {/* QRIS Option */}
                <div
                  onClick={() => setPaymentMethod("qris")}
                  className={`border-2 rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "qris"
                      ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <QrCode className={`w-6 h-6 ${paymentMethod === "qris" ? "text-emerald-600" : "text-gray-500"}`} />
                    <RadioGroupItem value="qris" id="qris" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">QRIS Instant</h3>
                    <p className="text-[11px] text-gray-500">GoPay, OVO, DANA, BCA, Dll</p>
                  </div>
                </div>

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border-2 rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Truck className={`w-6 h-6 ${paymentMethod === "cod" ? "text-emerald-600" : "text-gray-500"}`} />
                    <RadioGroupItem value="cod" id="cod" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">COD (Bayar di Tempat)</h3>
                    <p className="text-[11px] text-gray-500">Bayar langsung ke kurir</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Dynamic Content Based on Selection */}
            {paymentMethod === "qris" ? (
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-600 font-black text-xs px-2 py-0.5 rounded tracking-widest">
                      QRIS
                    </div>
                    <span className="text-xs text-slate-300">NMN Standar Nasional</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono bg-slate-800 px-2 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* QR Code Graphic Simulation */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow">
                  <div className="p-2 border-4 border-slate-900 rounded-lg bg-white relative">
                    {/* Simulated SVG QR Code */}
                    <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" />
                      {/* Corners */}
                      <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="9" y="9" width="17" height="17" fill="white" />
                      <rect x="13" y="13" width="9" height="9" fill="#0f172a" />

                      <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="74" y="9" width="17" height="17" fill="white" />
                      <rect x="78" y="13" width="9" height="9" fill="#0f172a" />

                      <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                      <rect x="9" y="74" width="17" height="17" fill="white" />
                      <rect x="13" y="78" width="9" height="9" fill="#0f172a" />

                      {/* Random QR Pattern Dots */}
                      <rect x="35" y="5" width="8" height="8" fill="#0f172a" />
                      <rect x="48" y="5" width="15" height="8" fill="#0f172a" />
                      <rect x="35" y="18" width="28" height="8" fill="#0f172a" />
                      <rect x="5" y="35" width="18" height="8" fill="#0f172a" />
                      <rect x="28" y="35" width="12" height="12" fill="#0f172a" />
                      <rect x="45" y="35" width="20" height="8" fill="#0f172a" />
                      <rect x="70" y="35" width="25" height="8" fill="#0f172a" />
                      <rect x="5" y="48" width="25" height="8" fill="#0f172a" />
                      <rect x="35" y="50" width="30" height="12" fill="#0f172a" />
                      <rect x="70" y="48" width="15" height="18" fill="#0f172a" />
                      <rect x="35" y="70" width="15" height="25" fill="#0f172a" />
                      <rect x="55" y="70" width="20" height="12" fill="#0f172a" />
                      <rect x="80" y="70" width="15" height="25" fill="#0f172a" />
                      <rect x="55" y="85" width="20" height="10" fill="#0f172a" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow border border-white">
                        CShop QRIS
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 font-medium">
                    Scan menggunakan aplikasi e-wallet / m-banking kamu
                  </p>
                </div>

                <div className="text-xs text-slate-300 space-y-1 bg-slate-800 p-3 rounded-lg">
                  <p className="font-semibold text-white">Petunjuk Pembayaran:</p>
                  <p>1. Buka aplikasi GoPay, ShopeePay, OVO, DANA, atau M-Banking.</p>
                  <p>2. Pilih menu <strong>Scan / Bayar QRIS</strong> dan arahkan kamera ke kode di atas.</p>
                  <p>3. Konfirmasi pembayaran sejumlah <PriceFormattor amount={totalAmount} className="font-bold text-emerald-400" />.</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-700 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Ketentuan Cash on Delivery (COD)</h4>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Siapkan uang tunai senilai pas sesuai total tagihan saat kurir mengantarkan pesanan ke alamat tujuan Anda.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-700">Catatan Khusus Kurir (Opsional)</Label>
                  <input
                    type="text"
                    placeholder="Contoh: Titip di satpam / pagar warna hitam"
                    value={courierNote}
                    onChange={(e) => setCourierNote(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1 rounded-xl py-5 font-semibold text-gray-600"
              >
                Batal
              </Button>
              <Button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="flex-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-5 font-bold shadow-md hover:shadow-lg transition-all"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Memproses Pembayaran...
                  </span>
                ) : paymentMethod === "qris" ? (
                  <span className="flex items-center gap-2">
                    Simulasi Bayar QRIS Sekarang <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Konfirmasi Pesanan COD <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </>
        ) : (
          /* Payment Success View */
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                {paymentMethod === "qris" ? "Pembayaran QRIS Berhasil!" : "Pesanan COD Dikonfirmasi!"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {paymentMethod === "qris"
                  ? "Transaksi Anda telah terverifikasi secara otomatis oleh sistem CShop."
                  : "Pesanan Anda sedang diproses dan akan segera dikirimkan oleh kurir."}
              </p>
            </div>

            {/* Receipt Box */}
            {completedOrder && (
              <div className="w-full bg-gray-50 border rounded-xl p-4 text-left space-y-2 text-xs text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Nomor Pesanan:</span>
                  <span className="font-mono font-bold text-gray-900">{completedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Nomor Invoice:</span>
                  <span className="font-mono text-gray-900">{completedOrder.invoice.number}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Metode:</span>
                  <span className="font-semibold text-emerald-700">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-gray-900">Total Dibayar:</span>
                  <PriceFormattor amount={completedOrder.totalPrice} className="font-extrabold text-sm text-emerald-600" />
                </div>
              </div>
            )}

            <Button
              onClick={handleFinish}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-5 font-bold shadow-md"
            >
              Lihat Daftar Pesanan Saya
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
