import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Login untuk melihat item keranjang Anda dan melanjutkan ke pembayaran. Jangan lewatkan produk favorit Anda!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">
            Selamat Datang Kembali!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="txet-center font-medium text-darkColor/80">{details}</p>
          <SignInButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Buat Akun
            </Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoAccess;
