import { describe, expect, it } from "vitest";

import { getResumeAction } from "@/components/galaxy-background";

describe("getResumeAction", () => {
  it("uses a minimum smooth finish when opacity is almost complete", () => {
    expect(getResumeAction(1, 5000)).toEqual({ kind: "start", durationMs: 120 });
    expect(getResumeAction(0.999, 5000)).toEqual({
      kind: "start",
      durationMs: 120,
    });
  });

  it("restarts full fade when opacity is effectively at start", () => {
    expect(getResumeAction(0, 5000)).toEqual({ kind: "start", durationMs: 5000 });
    expect(getResumeAction(0.001, 5000)).toEqual({
      kind: "start",
      durationMs: 5000,
    });
  });

  it("uses remaining duration when paused mid-fade", () => {
    expect(getResumeAction(0.5, 5000)).toEqual({ kind: "start", durationMs: 2500 });
    expect(getResumeAction(0.2, 5000)).toEqual({ kind: "start", durationMs: 4000 });
  });
});
