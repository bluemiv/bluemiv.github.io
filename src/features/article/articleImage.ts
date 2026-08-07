import fs from "node:fs";
import path from "node:path";

import { imageSize } from "image-size";

const ARTICLE_IMAGE_PATH_PATTERN = /^\/r\/i\/[a-z0-9/_-]+\.(?:gif|jpe?g|png|webp)$/i;
const PUBLIC_DIRECTORY = path.join(process.cwd(), "public");

export type ArticleImageDimensions = {
  width: number;
  height: number;
};

export function getArticleImageDimensions(sourcePath: string): ArticleImageDimensions {
  if (!ARTICLE_IMAGE_PATH_PATTERN.test(sourcePath)) {
    throw new Error(`Unsupported article image path: ${sourcePath}`);
  }

  const imagePath = path.join(PUBLIC_DIRECTORY, sourcePath);

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Article image not found: ${sourcePath}`);
  }

  const dimensions = imageSize(fs.readFileSync(imagePath));
  return { width: dimensions.width, height: dimensions.height };
}
