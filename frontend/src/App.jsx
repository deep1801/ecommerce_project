import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-5">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
