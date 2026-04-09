import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientMagic } from "@/components/ui/AmbientMagic";
import { CursorTrail } from "@/components/ui/CursorTrail";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientMagic />
      <CursorTrail />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
