import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_BRANDS,
  MOCK_BLOGS,
} from "@/sanity/queries/mockData";

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function POST(request: Request) {
  try {
    const { query, params } = await request.json();

    try {
      const data = await serverClient.fetch(query, params || {});
      if (data && (Array.isArray(data) ? data.length > 0 : true)) {
        return NextResponse.json({ data });
      }
    } catch {
      // Fallback silently if Sanity project is missing/unreachable
    }

    const q = (query || "").toLowerCase();
    if (q.includes("category")) {
      return NextResponse.json({ data: MOCK_CATEGORIES });
    }
    if (q.includes("brand")) {
      return NextResponse.json({ data: MOCK_BRANDS });
    }
    if (q.includes("blog")) {
      return NextResponse.json({ data: MOCK_BLOGS });
    }
    if (q.includes("product") || q.includes("variant")) {
      if (params?.variant) {
        const v = String(params.variant).toLowerCase();
        const filtered = MOCK_PRODUCTS.filter(
          (p) => p.variant?.toLowerCase() === v || (p as any).categories?.some((c: any) => c?.slug?.current === v || c?.name?.toLowerCase() === v)
        );
        return NextResponse.json({
          data: filtered.length > 0 ? filtered : MOCK_PRODUCTS,
        });
      }
      return NextResponse.json({ data: MOCK_PRODUCTS });
    }

    return NextResponse.json({ data: [] });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
