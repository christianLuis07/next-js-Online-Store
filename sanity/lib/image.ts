import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80";

export const urlFor = (source: SanityImageSource | string | null | undefined) => {
  if (!source) {
    return { url: () => FALLBACK_IMAGE } as any;
  }
  if (typeof source === "string") {
    return { url: () => source } as any;
  }
  try {
    const srcObj = source as any;
    if (srcObj.asset?.url && typeof srcObj.asset.url === "string") {
      return { url: () => srcObj.asset.url } as any;
    }
    if (srcObj.url && typeof srcObj.url === "string") {
      return { url: () => srcObj.url } as any;
    }
    const ref = srcObj.asset?._ref || srcObj._ref;
    if (typeof ref === "string" && !ref.match(/^image-[a-zA-Z0-9]+-\d+x\d+-[a-zA-Z0-9]+$/)) {
      return { url: () => FALLBACK_IMAGE } as any;
    }

    const built = builder.image(source);
    return {
      ...built,
      url: () => {
        try {
          return built.url() || FALLBACK_IMAGE;
        } catch {
          return FALLBACK_IMAGE;
        }
      },
    } as any;
  } catch {
    return { url: () => FALLBACK_IMAGE } as any;
  }
}

