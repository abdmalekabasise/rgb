import HomePage1 from "./(homes)/home-1/page";

export const metadata = {
  title: "EliteGameBoost | Game Marketplace",
};

export default function Home({ nonce }) {
  return (
    <>
      {/* Apply nonce to any inline styles */}
      <style nonce={nonce}>{/* Your inline styles here */}</style>
      <HomePage1 />
    </>
  );
}
