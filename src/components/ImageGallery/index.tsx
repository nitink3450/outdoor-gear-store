import { useState, useRef } from "react";
import styles from "./ImageGallery.module.scss";

interface ImageGalleryProps {
  image: string;
  title: string;
}

export default function ImageGallery({ image, title }: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    { label: "Front View", style: {} },
    { label: "Detail Shot", style: { transform: "scale(1.4)" } },
    { label: "Blueprint Style", style: { transform: "scale(0.8)" } },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className={styles.galleryColumn}>
      <div
        className={styles.mainImageWrapper}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div
          className={styles.mainImageContainer}
          style={{
            transform: isZoomed ? "scale(2.2)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        >
          <img
            src={image}
            alt={title}
            className={styles.productImg}
            style={galleryImages[activeImageIndex].style}
          />
        </div>
      </div>

      {/* Swatches */}
      <div className={styles.thumbnailsContainer} ref={thumbsContainerRef}>
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumbnailBtn} ${activeImageIndex === idx ? styles.activeThumbnail : ""}`}
            onClick={() => setActiveImageIndex(idx)}
            aria-label={`View ${img.label}`}
          >
            <img src={image} alt={img.label} style={img.style} />
          </button>
        ))}
      </div>

      {/* Pagination dots */}
      <div className={styles.dotIndicator}>
        {galleryImages.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${activeImageIndex === idx ? styles.activeDot : ""}`}
            onClick={() => setActiveImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
