import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { pathname } = useLocation();

  // Admin pages render their own sidebar + topbar chrome (AdminLayout),
  // so the storefront header/footer are hidden there.
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-canvas text-ink-950">
        <AppRoutes />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-950">
      <Header />

      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
