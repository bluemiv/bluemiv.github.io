import { fileURLToPath } from "node:url";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const REHYPE_ARTICLE_HEADINGS = fileURLToPath(
  new URL("./src/features/article/rehypeArticleHeadings.mjs", import.meta.url),
);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      ["rehype-pretty-code", { theme: "github-dark-default", keepBackground: false }],
      "rehype-slug",
      REHYPE_ARTICLE_HEADINGS,
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          properties: { className: ["article-heading-anchor"] },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
