import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const originalFetch = client.fetch.bind(client);

client.fetch = (async (query: string, params?: any, options?: any) => {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/sanity-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, params }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback silently
    }
  }
  try {
    return await originalFetch(query, params, options);
  } catch {
    return [];
  }
}) as typeof client.fetch;


