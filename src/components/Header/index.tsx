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
            <span className={styles.cartIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </span>
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
