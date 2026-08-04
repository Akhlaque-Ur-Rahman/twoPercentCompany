import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileLeadBar from "@/components/layout/StickyMobileLeadBar";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-main-bg overflow-x-clip">
        <Navbar />
        <div className="flex-1 flex flex-col pb-28 lg:pb-0">{children}</div>
        <Footer />
        <StickyMobileLeadBar />
      </div>
    </SmoothScroll>
  );
}
