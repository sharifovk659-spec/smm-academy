import { Navbar } from "@/components/sections/Navbar";
import { HomeSections } from "@/components/sections/HomeSections";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative z-[1]">
      <Navbar />
      <HomeSections />
      <Footer />
    </main>
  );
}
