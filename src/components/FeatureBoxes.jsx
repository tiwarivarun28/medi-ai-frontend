import React from "react";
import simplifiedReport from "../assets/features/simplifiedReport.png";
import impactedorgans from "../assets/features/impactedorgans.png";
import understandcauses from "../assets/features/understandcauses.png";
import homeremedies from "../assets/features/homeremedies.png";
import consult from "../assets/features/consult.png";
import privacy from "../assets/features/privacy.png";

export default function FeatureBoxes() {
  const features = [
    {
      title: "Simplified Reports",
      description:
        "Translate complex medical reports into easy-to-understand language for all users.",
      image: simplifiedReport,
    },
    {
      title: "Identify Impacted Organs",
      description:
        "Highlight which organs are affected based on the uploaded report.",
      image: impactedorgans,
    },
    {
      title: "Understand Causes",
      description: "Explain the possible reasons behind the medical findings.",
      image: understandcauses,
    },
    {
      title: "Home Remedies",
      description:
        "Provide safe and helpful home care advice to support recovery.",
      image: homeremedies,
    },
    {
      title: "Consult The Right Doctor",
      description: "Guide you on which medical specialist you should see next.",
      image: consult,
    },
    {
      title: "Privacy Focused",
      description:
        "Your confidential data is never stored or shared, ensuring your privacy.",
      image: privacy,
    },
  ];

  return (
    <section className="features-section">
      <h2>What MediAssist Offers</h2>
      <div className="features-grid">
        {features.map(({ title, description, image }, index) => (
          <div
            key={title}
            className="feature-card fade-slide-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "80%",
                marginBottom: "12px",
                // padding: "6px",
              }}
            />
            <h3>{title}</h3>
            {/* <p>{description}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
}
