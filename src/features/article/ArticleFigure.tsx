import Image from "next/image";

import { getArticleImageDimensions } from "./articleImage";

type PropsWithArticleFigure = {
  alt: string;
  caption: string;
  src: string;
};

export function ArticleFigure({ alt, caption, src }: PropsWithArticleFigure) {
  const { width, height } = getArticleImageDimensions(src);

  return (
    <figure className="article-figure">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 760px, calc(100vw - 40px)"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
