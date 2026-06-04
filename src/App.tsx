import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./stores/CartProvider";
import { SITE_CONFIG } from "./data/config";

function App() {
  return (
    <CartProvider>
      <div>
        <Header siteName={SITE_CONFIG.name} />
        <main>
          <Outlet />
        </main>
      </div>
      <CartSidebar />
    </CartProvider>
  );
}

export default App;
