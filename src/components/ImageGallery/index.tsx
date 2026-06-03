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
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);

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

  const scrollToSlide = (idx: number) => {
    const container = slidesContainerRef.current;
    if (container) {
      isScrollingRef.current = true;
      setActiveImageIndex(idx);
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: "smooth",
      });
      // Release scroll lock after transition completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  const handleScroll = () => {
    if (isScrollingRef.current) return;
    const container = slidesContainerRef.current;
    if (container) {
      const scrollPosition = container.scrollLeft;
      const index = Math.round(scrollPosition / container.clientWidth);
      setActiveImageIndex(index);
    }
  };

  return (
    <div className={styles.galleryColumn}>
      <div className={styles.mainImageWrapper}>
        <div
          ref={slidesContainerRef}
          className={styles.slidesContainer}
          onScroll={handleScroll}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={styles.slide}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div
                className={styles.imageZoomWrapper}
                style={{
                  transform: isZoomed && activeImageIndex === idx ? "scale(2.2)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              >
                <img
                  src={image}
                  alt={`${title} - ${img.label}`}
                  className={styles.productImg}
                  style={img.style}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swatches (hidden on mobile) */}
      <div className={styles.thumbnailsContainer} ref={thumbsContainerRef}>
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumbnailBtn} ${activeImageIndex === idx ? styles.activeThumbnail : ""}`}
            onClick={() => scrollToSlide(idx)}
            aria-label={`View ${img.label}`}
          >
            <img src={image} alt={img.label} style={img.style} />
          </button>
        ))}
      </div>

      {/* Pagination dots (with improved premium design) */}
      <div className={styles.dotIndicator}>
        {galleryImages.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${activeImageIndex === idx ? styles.activeDot : ""}`}
            onClick={() => scrollToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
