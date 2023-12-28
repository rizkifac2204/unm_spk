import Info from "@/components/Info";
import Formulir from "@/components/Formulir/Formulir";

function FormulirPage() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <Info />
          <Formulir />
        </div>
      </div>
    </section>
  );
}

export default FormulirPage;
