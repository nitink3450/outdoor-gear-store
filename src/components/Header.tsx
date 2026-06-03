import type { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  siteName: string;
}

export const Header: FC<HeaderProps> = ({ siteName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
            <li>
              <button className={styles.ctaBtn}>Shop Now</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
