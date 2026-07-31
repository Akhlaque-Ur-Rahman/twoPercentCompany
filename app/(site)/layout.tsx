import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-main-bg">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
