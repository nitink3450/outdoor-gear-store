/* eslint-disable react-refresh/only-export-components */
import type { ApiProduct } from "../../hooks/useProductDetails";
import styles from "./ProductInfoPanel.module.scss";

export interface ColorOption {
  name: string;
  value: string;
}

export const COLORS: ColorOption[] = [
  { name: "Slate Blue", value: "#3b82f6" },
  { name: "Forest Green", value: "#10b981" },
  { name: "Crimson Red", value: "#ef4444" },
];

interface ProductInfoPanelProps {
  product: ApiProduct;
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  selectedSizeName: string | null;
  setSelectedSizeName: (sizeName: string) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  currentSelectedSizeStock: number;
  dynamicSizes: { size: string; stock: number }[];
  handleAddToCart: () => void;
}

export default function ProductInfoPanel({
  product,
  selectedColor,
  setSelectedColor,
  selectedSizeName,
  setSelectedSizeName,
  quantity,
  setQuantity,
  currentSelectedSizeStock,
  dynamicSizes,
  handleAddToCart,
}: ProductInfoPanelProps) {
  const isSale = product.price > 50; // mocked sale price for items > $50
  const originalPrice = isSale ? product.price * 1.3 : product.price;

  return (
    <div className={styles.infoColumn}>
      <span className={styles.brand}>Gear Store</span>
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

      {/* Color swatches */}
      <div className={styles.optionSection}>
        <span className={styles.optionLabel}>Color: {selectedColor.name}</span>
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

      {/* Size choices */}
      <div className={styles.optionSection}>
        <span className={styles.optionLabel}>
          Size: {selectedSizeName || "Select a size"}
        </span>
        <div className={styles.sizeGroup}>
          {dynamicSizes.map((opt) => {
            const isSoldOut = opt.stock === 0;
            const isLowStock = opt.stock > 0 && opt.stock <= 2;
            const isSelected = selectedSizeName === opt.size;

            return (
              <button
                key={opt.size}
                disabled={isSoldOut}
                className={`${styles.sizeBtn} ${isSelected ? styles.activeSize : ""} ${
                  isSoldOut ? styles.soldOutSize : ""
                }`}
                onClick={() => setSelectedSizeName(opt.size)}
              >
                <span className={styles.sizeName}>{opt.size}</span>
                {isLowStock && (
                  <span className={styles.stockWarning}>
                    ({opt.stock} left)
                  </span>
                )}
                {isSoldOut && (
                  <span className={styles.stockSoldOut}>Sold out</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity picker */}
      <div className={styles.optionSection}>
        <span className={styles.optionLabel}>Quantity</span>
        <div className={styles.qtyContainer}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={
              !selectedSizeName ||
              currentSelectedSizeStock === 0 ||
              quantity <= 1
            }
          >
            -
          </button>
          <span className={styles.qtyVal}>{quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => setQuantity((q) => q + 1)}
            disabled={
              !selectedSizeName ||
              currentSelectedSizeStock === 0 ||
              quantity >= currentSelectedSizeStock
            }
          >
            +
          </button>
          {selectedSizeName && currentSelectedSizeStock > 0 && (
            <span className={styles.maxStockText}>
              Max available: {currentSelectedSizeStock}
            </span>
          )}
        </div>
      </div>

      {/* Add action */}
      <button
        className={styles.addBtn}
        onClick={handleAddToCart}
        disabled={!selectedSizeName || currentSelectedSizeStock === 0}
      >
        {!selectedSizeName
          ? "Select a Size"
          : currentSelectedSizeStock === 0
            ? "Sold Out"
            : "Add to Cart"}
      </button>

      {/* Delivery predictions */}
      {product && product.price > 0 && (
        <div className={styles.deliveryEstimate}>
          {product.price >= 100 ? (
            <>
              <div className={styles.deliveryHeader}>
                <span className={styles.deliveryIcon}>📦</span>
                <strong>Fast Delivery:</strong>
              </div>
              <div className={styles.deliveryDesc}>
                Estimated delivery to your location in 2-3 business days.
              </div>
            </>
          ) : (
            <>
              <div className={styles.deliveryHeader}>
                <span className={styles.deliveryIcon}>🚚</span>
                <strong>Standard Delivery:</strong>
              </div>
              <div className={styles.deliveryDesc}>
                Estimated delivery to your location in 5-7 business days.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
