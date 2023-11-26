import Footer from "@/components/ui/Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
