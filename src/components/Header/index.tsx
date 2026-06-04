import type { FC } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../stores/CartContext";
import styles from "./Header.module.scss";

interface HeaderProps {
  siteName: string;
}

export const Header: FC<HeaderProps> = ({ siteName }) => {
  const { cartCount, toggleCart } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <Link to="/" className={styles.logo}>
            {siteName}
          </Link>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.cartContainer} onClick={toggleCart}>
            <span className={styles.cartIcon}>🛒</span>
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

