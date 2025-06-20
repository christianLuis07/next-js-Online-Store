import { sanityFetch } from "../lib/live";
import {
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from "./query";

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

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error: any) {
    console.error("Failed to fetch latest blog:", error);
    throw new Error(`Failed to fetch latest blog: ${error.message}`);
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error: any) {
    console.error("Failed to fetch deal products:", error);
    throw new Error(`Failed to fetch deal products: ${error.message}`);
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return product?.data || null;
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
};
