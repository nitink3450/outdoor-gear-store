import { useState } from "react";
import { PRODUCT_DETAILS_DATA } from "../../data/productDetails";
import styles from "./ProductDetailsSection.module.scss";

type TabKey = "description" | "specifications" | "reviews";

const TABS: { key: TabKey; label: string }[] = [
  { key: "description", label: "Description" },
  { key: "specifications", label: "Specifications" },
  { key: "reviews", label: "Reviews" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.starRating} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </div>
  );
}

interface ProductDetailsSectionProps {
  description: string;
}

export default function ProductDetailsSection({ description }: ProductDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const { specifications, reviews } = PRODUCT_DETAILS_DATA;

  return (
    <section className={styles.section}>
      {/* Tab bar */}
      <div className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.descriptionPanel}>
            {description.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className={styles.descParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {activeTab === "specifications" && (
          <div className={styles.specsPanel}>
            <table className={styles.specsTable}>
              <tbody>
                {specifications.map((spec, idx) => (
                  <tr key={idx} className={styles.specRow}>
                    <td className={styles.specLabel}>{spec.label}</td>
                    <td className={styles.specValue}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={styles.reviewsPanel}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAuthorGroup}>
                    <span className={styles.reviewAvatar}>
                      {review.author.charAt(0)}
                    </span>
                    <div>
                      <span className={styles.reviewAuthor}>
                        {review.author}
                      </span>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h4 className={styles.reviewTitle}>{review.title}</h4>
                <p className={styles.reviewBody}>{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
