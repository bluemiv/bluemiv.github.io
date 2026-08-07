import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { getArticleImageDimensions } from "@/features/article/articleImage";

const ARTICLE_MDX_COMPONENTS = {
  img: ({ src, alt, title }) => {
    if (typeof src !== "string") throw new Error("Article image src must be a string");

    const { width, height } = getArticleImageDimensions(src);

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        title={title}
        width={width}
        height={height}
        sizes="(min-width: 768px) 760px, calc(100vw - 40px)"
      />
    );
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return ARTICLE_MDX_COMPONENTS;
}
