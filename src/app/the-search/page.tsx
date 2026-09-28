import type { Metadata } from "next";

import { SearchTracker } from "@/components/the-search/search-tracker";

export const metadata: Metadata = {
  title: "The Search",
  robots: { index: false, follow: false },
};

export default function TheSearchPage() {
  return <SearchTracker />;
}
