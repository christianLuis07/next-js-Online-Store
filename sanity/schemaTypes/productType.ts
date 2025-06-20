import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Produk",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Produk",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gambar Produk",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "string",
    }),
    defineField({
      name: "discount",
      title: "Diskon Persen %",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "price",
      title: "Harga",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Kategori",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stok",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Merek",
      type: "reference",
      to: { type: "brand" },
    }),
    defineField({
      name: "status",
      title: "Status Produk",
      type: "string",
      options: {
        list: [
          { title: "Baru", value: "new" },
          { title: "Terlaris", value: "hot" },
          { title: "Diskon", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Jenis Produk",
      type: "string",
      options: {
        list: [
          { title: "Gadget", value: "gadget" },
          { title: "Peralatan", value: "appliances" },
          { title: "Kulkas", value: "refrigerators" },
          { title: "Lainnya", value: "others" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Produk Unggulan",
      type: "boolean",
      description: "Aktifkan jika ingin menampilkan sebagai produk unggulan",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];

      // Format angka ke Rupiah dengan titik
      const formattedPrice = new Intl.NumberFormat("id-ID").format(subtitle);

      return {
        title: title,
        subtitle: `Rp${formattedPrice}`,
        media: image,
      };
    },
  },
});
