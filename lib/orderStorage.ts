export interface LocalOrder {
  _id: string;
  orderNumber: string;
  invoice: { number: string };
  orderDate: string;
  customerName: string;
  email: string;
  totalPrice: number;
  status: "paid" | "pending" | "delivered";
  paymentMethod: string;
  resiNumber?: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const ORDERS_KEY = "cshop_local_orders";

export const getLocalOrders = (): LocalOrder[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading local orders:", error);
    return [];
  }
};

export const saveLocalOrder = (order: Omit<LocalOrder, "_id">): LocalOrder => {
  const existing = getLocalOrders();
  const newOrder: LocalOrder = {
    ...order,
    _id: `loc_ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  const updated = [newOrder, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  }
  return newOrder;
};
