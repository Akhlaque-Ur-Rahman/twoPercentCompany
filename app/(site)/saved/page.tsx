import type { Metadata } from "next";
import SavedPageClient from "./SavedPageClient";

export const metadata: Metadata = {
  title: "Saved Listings | 2% Company",
  description: "Your shortlisted homes and plots in Patna.",
};

export default function SavedPage() {
  return <SavedPageClient />;
}
