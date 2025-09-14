import React from "react";

export default function FeatureBoxes() {
  const features = [
    {
      title: "Simplified Reports",
      description:
        "Translate complex medical reports into easy-to-understand language for all users.",
    },
    {
      title: "Identify Impacted Organs",
      description:
        "Highlight which organs are affected based on the uploaded report.",
    },
    {
      title: "Understand Causes",
      description: "Explain the possible reasons behind the medical findings.",
    },
    {
      title: "Home Remedies",
      description:
        "Provide safe and helpful home care advice to support recovery.",
    },
    {
      title: "Consult The Right Doctor",
      description: "Guide you on which medical specialist you should see next.",
    },
    {
      title: "Privacy Focused",
      description:
        "Your confidential data is never stored or shared, ensuring your privacy.",
    },
  ];

  return (
    <section className="features-section">
      <h2>What MediAssist Offers</h2>
      <div className="features-grid">
        {features.map(({ title, description }, index) => (
          <div
            key={title}
            className="feature-card fade-slide-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
