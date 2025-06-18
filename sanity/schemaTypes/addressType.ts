import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Alamat",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Alamat",
      type: "string",
      description: "nama alamat yang mudah diingat (contoh: Rumah)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email User",
      type: "email",
    }),
    defineField({
      name: "address",
      title: "Alamat Jalan",
      type: "string",
      description: "Alamat jalan termasuk nomor apartemen/unit",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Kota",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "Dua karakter (c.t.h: SU, JK)",
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: "zip",
      title: "Kode Pos",
      type: "string",
      description: "Format: 12345 atau 12345-6789",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{5}(-\d{4})?$/, {
            name: "zipCode",
            invert: false,
          })
          .custom((zip: string | undefined) => {
            if (!zip) {
              return "Kode Pos wajib diisi";
            }
            if (!zip.match(/^\d{5}(-\d{4})?$/)) {
              return "Silakan masukkan kode pos yang valid (contoh: 12345 atau 12345-6789)";
            }
            return true;
          }),
    }),
    defineField({
      name: "default",
      title: "Alamat Default",
      type: "boolean",
      description: "Apakah ini alamat pengiriman default?",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Dibuat pada",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      city: "city",
      state: "state",
      isDefault: "default",
    },
    prepare({ title, subtitle, city, state, isDefault }) {
      return {
        title: `${title} ${isDefault ? "(Default)" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});
