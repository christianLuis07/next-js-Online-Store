import WishlistProducts from "@/components/WishlistProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishlistPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <div>
          <WishlistProducts />
        </div>
      ) : (
        <div>Wishlist</div>
      )}
    </>
  );
};

export default WishlistPage;
