import { describe, expect, it } from "vitest";

import { compareByOrder } from "@/lib/content";

describe("compareByOrder", () => {
  it("puts ordered items first, ascending, then unordered items by slug", () => {
    const items = [
      { slug: "zeta" },
      { slug: "beta", order: 2 },
      { slug: "alpha" },
      { slug: "gamma", order: 1 },
      { slug: "delta", order: 2 },
    ];

    expect(items.sort(compareByOrder).map((item) => item.slug)).toEqual([
      "gamma",
      "beta",
      "delta",
      "alpha",
      "zeta",
    ]);
  });
});
