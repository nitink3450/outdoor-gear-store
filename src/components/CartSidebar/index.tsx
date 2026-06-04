import { useCart } from "../../stores/CartContext";
import styles from "./CartSidebar.module.scss";

export default function CartSidebar() {
  const {
    cartItems,
    cartCount,
    isCartOpen,
    toggleCart,
    removeCartItem,
    clearCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.backdrop} ${isCartOpen ? styles.backdropVisible : ""}`}
        onClick={toggleCart}
      />

      {/* Sidebar panel */}
      <aside
        className={`${styles.sidebar} ${isCartOpen ? styles.sidebarOpen : ""}`}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            Your Cart
            {cartCount > 0 && (
              <span className={styles.headerBadge}>{cartCount}</span>
            )}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={toggleCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🛒</span>
              <p className={styles.emptyText}>Your cart is empty</p>
              <p className={styles.emptySubtext}>
                Add some gear to get started!
              </p>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.color}-${item.size}`}
                  className={styles.cartItem}
                >
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <div className={styles.itemMeta}>
                      {item.color && (
                        <span className={styles.itemVariant}>{item.color}</span>
                      )}
                      {item.size && (
                        <span className={styles.itemVariant}>{item.size}</span>
                      )}
                    </div>
                    <div className={styles.itemBottom}>
                      <span className={styles.itemQty}>
                        Qty: {item.quantity}
                      </span>
                      <span className={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      removeCartItem(item.id, item.color, item.size)
                    }
                    aria-label={`Remove ${item.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
