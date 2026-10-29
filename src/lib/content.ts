import fs from "fs";
import path from "path";

import type { z } from "zod";

function readContentFile<S extends z.ZodType>(
  filePath: string,
  schema: S,
): z.output<S> {
  const label = path.relative(process.cwd(), filePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON in ${label}`, { cause: error });
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    throw new Error(`Invalid schema in ${label}: ${result.error.message}`, {
      cause: result.error,
    });
  }

  return result.data;
}

export function readContentDir<S extends z.ZodType>(
  dir: string,
  schema: S,
): z.output<S>[] {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => readContentFile(path.join(dir, name), schema));
}

type Orderable = { slug: string; order?: number };

// Items with an `order` come first (ascending); ties and unordered items fall back to slug.
export function compareByOrder(a: Orderable, b: Orderable): number {
  if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
    return a.order - b.order;
  }

  if (a.order !== undefined && b.order === undefined) {
    return -1;
  }

  if (a.order === undefined && b.order !== undefined) {
    return 1;
  }

  return a.slug.localeCompare(b.slug);
}
