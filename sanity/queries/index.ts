import { SINGLE_BLOG_QUERYResult } from "@/sanity.types";
import { sanityFetch } from "../lib/live";
import {
  BLOG_CATEGORIES,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SINGLE_BLOG_QUERY,
  BRAND_QUERY,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category '] | order(name asc) [0...$quantity] {
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

const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (
  slug: string
): Promise<SINGLE_BLOG_QUERYResult> => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? null; // Sesuai tipe
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return null;
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
};
