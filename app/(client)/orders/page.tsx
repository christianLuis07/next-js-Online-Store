import Container from "@/components/Container";
import OrdersClientWrapper from "@/components/OrdersClientWrapper";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Container className="py-10">
        <OrdersClientWrapper initialOrders={orders || []} />
      </Container>
    </div>
  );
};

export default OrdersPage;
