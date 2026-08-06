import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileLeadBar from "@/components/layout/StickyMobileLeadBar";
import CompareFloatingBar from "@/components/listing/CompareFloatingBar";
import SiteProviders from "@/components/providers/SiteProviders";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteProviders>
      <div className="min-h-screen flex flex-col bg-main-bg overflow-x-clip">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <CompareFloatingBar />
        <StickyMobileLeadBar />
      </div>
    </SiteProviders>
  );
}
