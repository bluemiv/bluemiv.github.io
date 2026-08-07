import type { ComponentPropsWithoutRef } from "react";

import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { getArticleImageDimensions } from "@/features/article/articleImage";

type PropsWithArticleCodeBlock = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

function ArticleCodeBlock({ children, ...props }: PropsWithArticleCodeBlock) {
  const language = props["data-language"];

  return (
    <pre {...props}>
      {language ? <span className="article-code-language">{language}</span> : null}
      {children}
    </pre>
  );
}

const ARTICLE_MDX_COMPONENTS = {
  pre: ArticleCodeBlock,
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
