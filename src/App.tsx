import { Header } from "./components/Header";
import { SITE_CONFIG } from "./data/config";

function App() {
  return (
    <div>
      <Header siteName={SITE_CONFIG.name} cartCount={0} />
      <main>
        <h1>Main</h1>
      </main>
    </div>
  );
}

export default App;
