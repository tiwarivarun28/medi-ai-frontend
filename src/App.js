import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <Main>
          <AppRoutes />
        </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
