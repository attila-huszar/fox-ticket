import { useContext, Key } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { UserContext } from '@context/UserProvider'
import { ThemeContext } from '@context/ThemeProvider'
import { Login } from './Login'
import { Signup } from './Signup_'
import { Cart } from './Cart'
import { Admin } from './Admin'
import {
  Navbar,
  Avatar,
  Dropdown,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { userAuthTest } from '@api/userAuthTest'
import { userLogout } from '@api/userLogout'
import { toast } from 'react-toastify'
import { TbHelp, TbLogout, TbMoon, TbSun, TbUser } from 'react-icons/tb'
import logo from '@assets/svg/logo.svg'

export function Header() {
  const { user, setUser } = useContext(UserContext)
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)
  const navigate = useNavigate()

  const links = [
    {
      name: 'News',
      path: '/',
    },
    {
      name: 'Shop',
      path: '/shop',
    },
  ]

  const navigateDropdown = async (key: React.Key) => {
    if (key === 'logout') {
      try {
        const userData = await userLogout({
          email: user.email,
          token: user.token,
        })

        if (user.email === userData.email) {
          setUser({
            name: 'Guest',
            email: '',
            token: '',
          })

          localStorage.removeItem('name')
          localStorage.removeItem('email')
          localStorage.removeItem('token')

          navigate('/')
          notifyLoggedOut()
        }
      } catch (error) {
        console.log(error)
      }
    } else if (key === 'help_and_feedback') {
      try {
        const userData = await userAuthTest({
          email: user.email,
          token: user.token,
        })

        if (user.email === userData.email) {
          console.log(userData, 'is authenticated')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      const path = String(key)
      navigate(path)
    }
  }

  function notifyLoggedOut() {
    toast.success(`${user.email} successfully logged out.`)
  }

  return (
    <Navbar isBordered>
      <NavbarBrand className="grow-0">
        <Link
          to="/"
          className="flex w-max items-center gap-4 text-2xl font-bold">
          <img src={logo} width={40} alt="logo" />
          Fox Ticket
        </Link>
      </NavbarBrand>

      <NavbarContent>
        {links.map((link, idx) => (
          <NavbarItem key={idx}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'bg-primary-400 rounded-xl px-3 py-2'
                  : 'hover:bg-primary-400 rounded-xl px-3 py-2 transition-colors'
              }>
              {link.name}
            </NavLink>
          </NavbarItem>
        ))}
        {user.token && (
          <NavbarItem>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                isActive ? 'text-orange-600' : 'text-base'
              }>
              My Tickets
            </NavLink>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent>
        {user.isAdmin && user.token && <Admin />}
        {!user.token && <Login />}
        {!user.token && <Signup />}

        <Button
          isIconOnly
          variant="shadow"
          onPress={toggleDarkMode}
          aria-label="Dark mode toggle">
          {isDarkMode ? (
            <TbMoon fill="current" size={20} />
          ) : (
            <TbSun fill="current" size={20} />
          )}
        </Button>

        <Cart />

        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                className="transition-transform"
                src=""
                showFallback
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={(key: Key) => void navigateDropdown(key)}>
              <DropdownItem key="/" className="h-14 gap-2">
                {user.token ? (
                  <>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">Welcome,</p>
                    <p className="font-semibold">{user.name}!</p>
                  </>
                )}
              </DropdownItem>
              <DropdownItem
                key="profile"
                startContent={<TbUser />}
                color="default"
                showDivider>
                Profile
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                startContent={<TbHelp />}
                color="default">
                Help
              </DropdownItem>
              <DropdownItem
                key="logout"
                startContent={<TbLogout />}
                color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  )
}
