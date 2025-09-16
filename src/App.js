import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
// import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import LoadingPlane from "./components/layout/LoadingPlane";

export default function App() {
  const [loading, setLoading] = useState(true);
  window.RDL = {};
  const basename =
    process.env.NODE_ENV === "production" ? "/medi-ai-frontend" : "/";
  window.RDL.isMobile = window.innerWidth <= 768;
  return (
    <BrowserRouter basename={basename}>
      <div className="app-shell">
        {loading ? (
          <LoadingPlane
            onFinish={() => {
              setLoading(false);
            }}
          />
        ) : (
          <Main>
            <AppRoutes />
          </Main>
        )}
      </div>
    </BrowserRouter>
  );
}
