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
import {
  MOCK_CATEGORIES,
  MOCK_BRANDS,
  MOCK_PRODUCTS,
  MOCK_BLOGS,
} from "./mockData";

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
    if (data && data.length > 0) return data;
    return quantity ? MOCK_CATEGORIES.slice(0, quantity) : MOCK_CATEGORIES;
  } catch {
    return quantity ? MOCK_CATEGORIES.slice(0, quantity) : MOCK_CATEGORIES;
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    if (data && data.length > 0) return data;
    return MOCK_BRANDS;
  } catch {
    return MOCK_BRANDS;
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    if (data && data.length > 0) return data;
    return MOCK_BLOGS;
  } catch {
    return MOCK_BLOGS;
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    if (data && data.length > 0) return data;
    return MOCK_PRODUCTS;
  } catch {
    return MOCK_PRODUCTS;
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    if (product?.data) return product.data;
    return MOCK_PRODUCTS.find((p) => p.slug.current === slug) || MOCK_PRODUCTS[0];
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug.current === slug) || MOCK_PRODUCTS[0];
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
    if (product?.data) return product.data;
    return MOCK_BRANDS.find((b) => b.slug.current === slug) || MOCK_BRANDS[0];
  } catch {
    return MOCK_BRANDS.find((b) => b.slug.current === slug) || MOCK_BRANDS[0];
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch {
    return [];
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    if (data && data.length > 0) return data;
    return MOCK_BLOGS;
  } catch {
    return MOCK_BLOGS;
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
    if (data) return data;
    return (MOCK_BLOGS.find((b) => b.slug.current === slug) as any) || (MOCK_BLOGS[0] as any);
  } catch {
    return (MOCK_BLOGS[0] as any);
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    if (data && data.length > 0) return data;
    return [{ name: "Teknologi", slug: { current: "teknologi" } }, { name: "Gadget", slug: { current: "gadget" } }];
  } catch {
    return [{ name: "Teknologi", slug: { current: "teknologi" } }, { name: "Gadget", slug: { current: "gadget" } }];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    if (data && data.length > 0) return data;
    return MOCK_BLOGS.filter((b) => b.slug.current !== slug);
  } catch {
    return MOCK_BLOGS;
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
