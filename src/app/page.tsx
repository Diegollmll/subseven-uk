import Hero from "./home/Hero";
import Security from "./home/Security";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import FullyIntegrated from "./home/FullyIntegrated";
import Why from "./home/Why";
import FAQs from "./home/FAQs"; 
import Safety from "./home/Safety";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FullyIntegrated />
      <Security />
      <Why />
      <Safety />
      <FAQs />
      <Footer />
    </>
  );
}
