"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormattor from "./PriceFormattor";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderDetailDialog from "./OrderDetailDialog";
import { getLocalOrders, LocalOrder } from "@/lib/orderStorage";

const OrdersComponent = ({ orders = [] }: { orders: MY_ORDERS_QUERYResult }) => {
  const [allOrders, setAllOrders] = useState<any[]>(orders || []);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const local = getLocalOrders();
    const formattedLocal = local.map((loc: LocalOrder) => ({
      orderNumber: loc.orderNumber,
      invoice: loc.invoice,
      orderDate: loc.orderDate,
      customerName: loc.customerName,
      email: loc.email,
      totalPrice: loc.totalPrice,
      status: loc.status,
      resiNumber: loc.resiNumber,
    }));
    setAllOrders([...formattedLocal, ...(orders || [])]);
  }, [orders]);

  const handleDelete = () => {
    toast.error("Hapus Metode yang diaplikasikan dari Admin");
  };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {allOrders.map((order, idx) => (
            <Tooltip key={order?.orderNumber || idx}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormattor
                      amount={order?.totalPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.status.charAt(0).toUpperCase() +
                          order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order?.invoice && (
                      <p className="font-medium line-clamp-1">
                        {order?.invoice ? order?.invoice?.number : "N/A"}
                      </p>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete();
                    }}
                    className="flex items-center justify-center group"
                  >
                    <X
                      size={20}
                      className="group-hover:text-shop_dark_green hoverEffect"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click untuk melihat detail pemesanan</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
