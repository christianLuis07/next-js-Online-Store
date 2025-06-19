import { sanityFetch } from "../lib/live";
import { BRANDS_QUERY } from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error: any) {
    console.error("Failed to fetch categories:", error); // tampilkan detail error
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error: any) {
    console.error("Failed to fetch brands:", error);
    throw new Error(`Failed to fetch brands: ${error.message}`);
  }
};

export { getCategories, getAllBrands };
