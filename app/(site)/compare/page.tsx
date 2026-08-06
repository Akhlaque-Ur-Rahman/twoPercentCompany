import type { Metadata } from "next";
import ComparePageClient from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Compare Listings | 2% Company",
  description: "Compare up to four homes or plots side by side.",
};

export default function ComparePage() {
  return <ComparePageClient />;
}
