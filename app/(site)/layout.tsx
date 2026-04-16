import { Header } from "@/components/nav/header";
import { Footer } from "@/components/nav/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
}
