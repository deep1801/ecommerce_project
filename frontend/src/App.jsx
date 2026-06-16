import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ProductDetails from "./pages/ProductDetails";

function App() {
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
