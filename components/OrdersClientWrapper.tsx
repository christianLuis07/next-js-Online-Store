"use client";

import React, { useEffect, useState } from "react";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { getLocalOrders, LocalOrder } from "@/lib/orderStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";
import Link from "next/link";

interface OrdersClientWrapperProps {
  initialOrders: MY_ORDERS_QUERYResult;
}

export const OrdersClientWrapper: React.FC<OrdersClientWrapperProps> = ({
  initialOrders = [],
}) => {
  const [hasOrders, setHasOrders] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const local = getLocalOrders();
    setHasOrders((initialOrders && initialOrders.length > 0) || local.length > 0);
  }, [initialOrders]);

  if (!mounted) return null;

  return hasOrders ? (
    <Card className="w-full shadow-md rounded-2xl border">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-xl font-bold text-gray-900">Daftar Pesanan Saya</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea>
          <Table>
            <TableHeader className="bg-gray-100/70">
              <TableRow>
                <TableHead className="w-[120px] font-bold">Nomor Pesanan</TableHead>
                <TableHead className="hidden md:table-cell font-bold">Tanggal</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="hidden sm:table-cell font-bold">Email</TableHead>
                <TableHead className="font-bold">Total</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="hidden sm:table-cell font-bold">Nomor Resi / Invoice</TableHead>
                <TableHead className="text-center font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <OrdersComponent orders={initialOrders} />
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  ) : (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-dashed shadow-sm">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
        <FileX className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Belum Ada Pesanan</h2>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
        Sepertinya kamu belum memiliki riwayat pesanan. Yuk jelajahi produk kami dan lakukan pembelian!
      </p>
      <Button asChild className="mt-6 bg-emerald-600 hover:bg-emerald-700 font-bold px-6 py-5 rounded-xl shadow-md">
        <Link href="/">Jelajahi Produk CShop</Link>
      </Button>
    </div>
  );
};

export default OrdersClientWrapper;
