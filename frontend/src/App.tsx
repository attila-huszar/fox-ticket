import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { UserContextInterface, LoggedInUser } from '@interfaces/user'
import { CartContextInterface, PendingOrdersResponse } from '@interfaces/orders'
import 'react-toastify/dist/ReactToastify.css'
import '@utils/emailVerifyToast'

const defaultUser: LoggedInUser = {
  name: 'Guest',
  email: '',
  token: '',
  isAdmin: false,
}

export const UserContext = createContext<UserContextInterface>({
  user: defaultUser,
})
export const CartContext = createContext<CartContextInterface>({ cart: [] })

export default function App() {
  const [user, setUser] = useState<LoggedInUser>({
    name: localStorage.getItem('name') || 'Guest',
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('admin') === 'true' ? true : false,
  })
  const [cart, setCart] = useState<PendingOrdersResponse[]>([])
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
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <NextUIProvider>
            <ThemeProvider>
              <Header />
              <Routes>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/tickets" element={<MyTickets />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<AdminProduct />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </ThemeProvider>
          </NextUIProvider>
        </CartContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
