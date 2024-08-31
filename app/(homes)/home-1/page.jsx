import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Categories from "@/components/homes/common/Categories";
import Hero from "@/components/homes/home-1/Hero";
import Hotbids from "@/components/homes/home-1/Hotbids";
import Process from "@/components/homes/common/Process";
import Faq from "@/components/homes/home-12/Faq";
import Help from "@/components/homes/home-10/Help";
import Cta from "@/components/homes/home-7/Cta";
import Testimonials from "@/components/homes/common/Testimonials";

export const metadata = {
  title: "EliteGameBoost | Game Marketplace",
};

export default function HomePage1({ nonce }) {
  return (
    <>
      <Header1 nonce={nonce} />
      
      <main>
        <Hero nonce={nonce} />
        <Categories nonce={nonce} />
        <Testimonials nonce={nonce} />
        <Process nonce={nonce} />
        <Faq nonce={nonce} />
        <Help nonce={nonce} />
        <Cta></Cta>
      </main>
      
      <Footer1 nonce={nonce} />
    </>
  );
}
