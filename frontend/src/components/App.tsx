import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import Header from './Header';
import Shop from './Shop';
import MyTickets from './MyTickets';
import Cart from './Cart';
import Profile from './Profile';
import Footer from './Footer';
import NotImplementedPage from './NotImplementedPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminProduct from './AdminProduct';
import AdminArticle from './AdminArticle'

export default function App() {
  const { pathname } = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <Header />
      <ToastContainer style={{marginTop: "80px"}}/>
      <TransitionGroup>
        <CSSTransition
          key={pathname}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/mytickets" element={<MyTickets />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<AdminProduct />} />
            <Route path="/articles" element={<AdminArticle />} />
            <Route path="*" element={<NotImplementedPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </HelmetProvider>
  );
}
