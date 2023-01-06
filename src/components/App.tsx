import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./Home";
import Header from "./Header";
import NotImplementedPage from "./NotImplementedPage";
import Footer from "./Footer";
import Profile from "./Profile";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function App() {
  const { pathname } = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Test</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <Header />

      <TransitionGroup>
        <CSSTransition key={pathname} timeout={300} classNames="fade" unmountOnExit>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotImplementedPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </HelmetProvider>
  );
}
