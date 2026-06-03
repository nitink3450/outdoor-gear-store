/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetails";
import { useCart } from "../stores/CartContext";
import styles from "./ProductDetails.module.scss";

// Mock Size Stocks
interface SizeOption {
  size: string;
  stock: number;
}

// Color Swatches
interface ColorOption {
  name: string;
  value: string;
}

const SIZES: SizeOption[] = [
  { size: "XS", stock: 0 }, // Sold out
  { size: "S", stock: 2 }, // Low stock
  { size: "M", stock: 12 }, // Available
  { size: "L", stock: 8 }, // Available
  { size: "XL", stock: 1 }, // Low stock
];

const COLORS: ColorOption[] = [
  { name: "Slate Blue", value: "#3b82f6" },
  { name: "Forest Green", value: "#10b981" },
  { name: "Crimson Red", value: "#ef4444" },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { product, loading, error } = useProductDetails(id);
  const { addToCart } = useCart();

  // Read initial variant from search params or fallback
  const initialColorName = searchParams.get("color");
  const initialSizeName = searchParams.get("size");

  const [selectedColor, setSelectedColor] = useState<ColorOption>(() => {
    if (initialColorName) {
      const match = COLORS.find(
        (c) => c.name.toLowerCase() === initialColorName.toLowerCase(),
      );
      if (match) return match;
    }
    return COLORS[0];
  });

  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(() => {
    if (initialSizeName) {
      const match = SIZES.find(
        (s) => s.size.toLowerCase() === initialSizeName.toLowerCase(),
      );
      if (match && match.stock > 0) return match;
    }
    return null;
  });
  console.log("selectedSize", selectedSize);

  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params: Record<string, string> = { color: selectedColor.name };
    if (selectedSize) {
      params.size = selectedSize.size;
    }
    if (
      searchParams.get("color") !== params.color ||
      searchParams.get("size") !== (params.size || null)
    ) {
      setSearchParams(params, { replace: true });
    }
  }, [selectedColor, selectedSize, searchParams, setSearchParams]);

  useEffect(() => {
    if (selectedSize) {
      if (selectedSize.stock === 0) {
        setQuantity(0);
      } else if (quantity > selectedSize.stock) {
        setQuantity(selectedSize.stock);
      } else if (quantity === 0) {
        setQuantity(1);
      }
    }
  }, [selectedSize]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          Error: {error || "Product not found"}
        </p>
      </div>
    );
  }

  const isSale = product.price > 50; //mocked to show sale price for products with price > 50
  const originalPrice = isSale ? product.price * 1.3 : product.price; // mock discount of 13% if product is on sale

  // Gallery images mock
  const galleryImages = [
    { label: "Front View" },
    { label: "Detail Shot", style: { transform: "scale(1.4)" } },
    {
      label: "Blueprint Style",
      style: { transform: "scale(0.8)" },
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize || selectedSize.stock === 0) return;
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      selectedColor.name,
      selectedSize.size,
      quantity,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Left Image Gallery */}
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
                src={product.image}
                alt={product.title}
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
                <img src={product.image} alt={img.label} style={img.style} />
              </button>
            ))}
          </div>

          {/* pagination dots */}
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

        {/* Right Info Panel */}
        <div className={styles.infoColumn}>
          <span className={styles.brand}>GearNua</span>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            {isSale ? (
              <>
                <span className={styles.salePrice}>
                  ${product.price.toFixed(2)}
                </span>
                <span className={styles.originalPrice}>
                  ${originalPrice.toFixed(2)}
                </span>
                <span className={styles.saleBadge}>On Sale</span>
              </>
            ) : (
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>
              Color: {selectedColor.name}
            </span>
            <div className={styles.swatchGroup}>
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`${styles.swatchBtn} ${selectedColor.name === color.name ? styles.activeSwatch : ""}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>
              Size: {selectedSize ? selectedSize.size : "Select a size"}
            </span>
            <div className={styles.sizeGroup}>
              {SIZES.map((opt) => {
                const isSoldOut = opt.stock === 0;
                const isLowStock = opt.stock > 0 && opt.stock <= 2;
                const isSelected = selectedSize?.size === opt.size;

                return (
                  <button
                    key={opt.size}
                    disabled={isSoldOut}
                    className={`${styles.sizeBtn} ${isSelected ? styles.activeSize : ""} ${
                      isSoldOut ? styles.soldOutSize : ""
                    }`}
                    onClick={() => setSelectedSize(opt)}
                  >
                    <span className={styles.sizeName}>{opt.size}</span>
                    {isLowStock && (
                      <span className={styles.stockWarning}>
                        ({opt.stock} left)
                      </span>
                    )}
                    {isSoldOut && (
                      <span className={styles.stockSoldOut}>Out</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>Quantity</span>
            <div className={styles.qtyContainer}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={
                  !selectedSize || selectedSize.stock === 0 || quantity <= 1
                }
              >
                -
              </button>
              <span className={styles.qtyVal}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => q + 1)}
                disabled={
                  !selectedSize ||
                  selectedSize.stock === 0 ||
                  quantity >= (selectedSize?.stock || 1)
                }
              >
                +
              </button>
              {selectedSize && selectedSize.stock > 0 && (
                <span className={styles.maxStockText}>
                  Max available: {selectedSize.stock}
                </span>
              )}
            </div>
          </div>

          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            disabled={!selectedSize || selectedSize.stock === 0}
          >
            {!selectedSize
              ? "Select a Size"
              : selectedSize.stock === 0
                ? "Sold Out"
                : "Add to Cart"}
          </button>

          {/* Delivery Estimate based on price*/}
          {product && product.price > 0 && (
            <p className={styles.deliveryEstimate}>
              {product.price >= 100 ? (
                <>
                  📦 <strong>Fast Delivery:</strong> Estimated delivery to your
                  location in 2-3 business days.
                </>
              ) : (
                <>
                  🚚 <strong>Standard Delivery:</strong> Estimated delivery to
                  your location in 5-7 business days.
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
