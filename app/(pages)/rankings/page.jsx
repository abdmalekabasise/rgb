import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Ranking from "@/components/pages/Ranking";

export const metadata = {
  title: "Rankings || EliteGameBoost | NFT Marketplace Nextjs Template",
};

export default function RankingPage() {
  return (
    <>
      <Header1 />
      <main>
        <Ranking />
      </main>
      <Footer1 />
    </>
  );
}
