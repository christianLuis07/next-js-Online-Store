import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Pesanan",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Nomor Pesanan",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "invoice",
      type: "object",
      fields: [
        { name: "id", type: "string", title: "ID Invoice" },
        { name: "number", type: "string", title: "Nomor Invoice" },
        { name: "hosted_invoice_url", type: "url", title: "URL Invoice" },
      ],
    },
    defineField({
      name: "stripeCheckoutSessionId",
      title: "ID Sesi Checkout Stripe",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "ID Pelanggan Stripe",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "ID Pengguna Toko",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Nama Pelanggan",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Pelanggan",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "ID Pembayaran Stripe",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Produk",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Produk yang Dibeli",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Jumlah Dibeli",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Harga",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Mata Uang",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Jumlah Diskon",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Alamat Pengiriman",
      type: "object",
      fields: [
        defineField({ name: "state", title: "Provinsi", type: "string" }),
        defineField({ name: "zip", title: "Kode Pos", type: "string" }),
        defineField({ name: "city", title: "Kota", type: "string" }),
        defineField({ name: "address", title: "Alamat", type: "string" }),
        defineField({ name: "name", title: "Nama Penerima", type: "string" }),
      ],
    }),
    defineField({
      name: "status",
      title: "Status Pesanan",
      type: "string",
      options: {
        list: [
          { title: "Menunggu", value: "pending" },
          { title: "Sedang Diproses", value: "processing" },
          { title: "Dibayar", value: "paid" },
          { title: "Dikirim", value: "shipped" },
          { title: "Dalam Pengantaran", value: "out_for_delivery" },
          { title: "Terkirim", value: "delivered" },
          { title: "Dibatalkan", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "orderDate",
      title: "Tanggal Pemesanan",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
