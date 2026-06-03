import type { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  siteName: string;
  cartCount: number;
}

export const Header: FC<HeaderProps> = ({ siteName, cartCount }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <div className={styles.logo}>{siteName}</div>
          <nav>
            <ul className={styles.nav}>
              <li>
                <a href="#features" className={styles.navLink}>
                  Features
                </a>
              </li>
              <li>
                <a href="#products" className={styles.navLink}>
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className={styles.navLink}>
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.cartContainer}>
            <span className={styles.cartIcon}>🛒</span>
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};
