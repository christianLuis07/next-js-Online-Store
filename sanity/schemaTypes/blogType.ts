import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Blog",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Gambar Utama",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "blogcategories",
      title: "Kategori Blog",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "blogCategory" } }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Dibuat pada",
      type: "datetime",
    }),
    defineField({
      name: "isLatest",
      title: "Terbaru",
      type: "boolean",
      description: "Toogle untuk menampilkan blog terbaru",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "Isi Blog",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      isLatest: "isLatest",
    },
    prepare(selection) {
      const { author, isLatest } = selection;
      return {
        ...selection,
        subtitle: `${author} ${isLatest ? "(Terbaru)" : ""} By ${author}`,
      };
    },
  },
});
