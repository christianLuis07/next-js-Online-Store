import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const blogCategoryType = defineType({
  name: "blogCategory",
  title: "Kategori Blog",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Kategori",
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
      name: "description",
      title: "Deskripsi Kategori",
      type: "text",
    }),
  ],
});
