/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetails";
import { useCart } from "../stores/CartContext";
import ImageGallery from "../components/ImageGallery";
import ProductInfoPanel, { COLORS } from "../components/ProductInfoPanel";
import ProductDetailsSection from "../components/ProductDetailsSection";
import type { ColorOption } from "../components/ProductInfoPanel";
import styles from "./ProductDetails.module.scss";

// Mock Size
interface SizeOption {
  size: string;
}

const SIZES: SizeOption[] = [
  { size: "XS" },
  { size: "S" },
  { size: "M" },
  { size: "L" },
  { size: "XL" },
];

const getInitialStock = (
  colorName: string,
  sizeName: string,
  productId: number,
): number => {
  const hash = (colorName.length + sizeName.charCodeAt(0) + productId) % 5;
  if (hash === 0) return 0; // Sold out
  if (hash === 1) return 1; // Low stock
  if (hash === 2) return 2; // Low stock
  if (hash === 3) return 8; // Available
  return 12; // Available
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { product, loading, error } = useProductDetails(id);
  const { addToCart, cartItems } = useCart();

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

  const [selectedSizeName, setSelectedSizeName] = useState<string | null>(
    () => {
      if (initialSizeName) {
        const match = SIZES.find(
          (s) => s.size.toLowerCase() === initialSizeName.toLowerCase(),
        );
        if (match) return match.size;
      }
      return null;
    },
  );

  const [quantity, setQuantity] = useState<number>(1);

  const getAvailableStock = (colorName: string, sizeName: string): number => {
    if (!product) return 0;
    const initial = getInitialStock(colorName, sizeName, product.id);
    const cartItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.color === colorName &&
        item.size === sizeName,
    );
    const inCart = cartItem ? cartItem.quantity : 0;
    return Math.max(0, initial - inCart);
  };

  const currentSelectedSizeStock = selectedSizeName
    ? getAvailableStock(selectedColor.name, selectedSizeName)
    : 0;

  // Sync URL query
  useEffect(() => {
    const params: Record<string, string> = { color: selectedColor.name };
    if (selectedSizeName) {
      params.size = selectedSizeName;
    }
    if (
      searchParams.get("color") !== params.color ||
      searchParams.get("size") !== (params.size || null)
    ) {
      setSearchParams(params, { replace: true });
    }
  }, [selectedColor, selectedSizeName, searchParams, setSearchParams]);

  // Sync stocks
  useEffect(() => {
    if (selectedSizeName) {
      const currentStock = getAvailableStock(
        selectedColor.name,
        selectedSizeName,
      );
      if (currentStock === 0) {
        setQuantity(0);
      } else if (quantity > currentStock) {
        setQuantity(currentStock);
      } else if (quantity === 0) {
        setQuantity(1);
      }
    }
  }, [selectedSizeName, selectedColor, cartItems]);

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

  const handleAddToCart = () => {
    if (!selectedSizeName || currentSelectedSizeStock === 0) return;
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      selectedColor.name,
      selectedSizeName,
      quantity,
    );
    setQuantity(1);
  };

  // dynamic list of sizes with their current stock for the selected color
  const dynamicSizes = SIZES.map((s) => ({
    size: s.size,
    stock: getAvailableStock(selectedColor.name, s.size),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/*Image Gallery */}
        <ImageGallery image={product.image} title={product.title} />

        {/* Product Info Panel */}
        <ProductInfoPanel
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSizeName={selectedSizeName}
          setSelectedSizeName={setSelectedSizeName}
          quantity={quantity}
          setQuantity={setQuantity}
          currentSelectedSizeStock={currentSelectedSizeStock}
          dynamicSizes={dynamicSizes}
          handleAddToCart={handleAddToCart}
        />
      </div>

      {/* Below-fold: Description, Specifications, Reviews */}
      <ProductDetailsSection description={product.description} />
    </div>
  );
}
