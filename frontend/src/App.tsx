import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { UserProvider } from '@context/UserProvider'
import { CartProvider } from '@context/CartProvider'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider, ThemeContext } from '@context/ThemeProvider'
import { Home } from '@pages/Home'
import { Shop } from '@pages/Shop'
import { MyTickets } from '@pages/MyTickets'
import { Profile } from '@pages/Profile'
import { NotFound } from '@pages/NotFound'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Cart } from '@components/Cart'
import { AdminProduct } from '@components/AdminProduct'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@utils/emailVerifyToast'

export default function App() {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <BrowserRouter>
      <ToastContainer
        className="mt-20"
        transition={Flip}
        position="top-center"
        autoClose={4000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <UserProvider>
        <CartProvider>
          <NextUIProvider>
            <ThemeProvider>
              <Header />
              <Routes>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/tickets" element={<MyTickets />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<AdminProduct />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </ThemeProvider>
          </NextUIProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  )
}
