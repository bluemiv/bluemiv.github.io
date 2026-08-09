import { z } from "zod";

import { isTagKey, type TagKey } from "./tagRegistry";

const TAG_KEY_SCHEMA = z
  .string()
  .refine(isTagKey, { message: "Unknown tag" })
  .transform((tag) => tag as TagKey);

export const TAG_KEYS_SCHEMA = z
  .array(TAG_KEY_SCHEMA)
  .refine((tags) => new Set(tags).size === tags.length, {
    message: "Tags must be unique",
  });
