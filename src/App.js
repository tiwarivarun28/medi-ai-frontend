import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const basename =
    process.env.NODE_ENV === "production" ? "/medi-ai-frontend" : "/";
  return (
    <BrowserRouter basename={basename}>
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
