import { Suspense } from "react";
import { getListingBySlug } from "@/lib/listings";
import PageState from "@/components/ui/PageState";
import TenantEnquiryClient from "./TenantEnquiryClient";

type Props = {
  searchParams: Promise<{ property?: string }>;
};

export default async function TenantEnquiryPage({ searchParams }: Props) {
  const { property: slug } = await searchParams;
  const listing = slug ? await getListingBySlug(slug) : undefined;

  return (
    <Suspense
      fallback={
        <PageState
          title="Loading enquiry…"
          description="Preparing the form for this property."
          primaryHref="/rent/tenants"
          primaryLabel="Browse Rentals"
        />
      }
    >
      <TenantEnquiryClient property={listing} />
    </Suspense>
  );
}
