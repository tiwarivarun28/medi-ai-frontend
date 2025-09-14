import FeatureBoxes from "../components/FeatureBoxes";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to MediAssist</h1>
        <p>
          Your smart assistant for understanding medical reports in simple
          terms.
        </p>
      </section>

      <FeatureBoxes />
    </div>
  );
}
