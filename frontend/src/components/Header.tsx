import { useContext, Key } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { ThemeContext } from '@context/ThemeProvider'
import { UserContext } from '../App'
import { UserContextInterface } from '@interfaces/user'
import { Login } from './Login'
import { SignUp } from './SignUp'
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
import { postAuthTest } from '@api/postAuthTest'
import { postLogout } from '@api/postLogout'
import { toast } from 'react-toastify'
import { TbHelp, TbLogout, TbMoon, TbSun, TbUser } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import logo from '@assets/svg/logo.svg'

export function Header() {
  const navigate = useNavigate()
  const { user, setUser } = useContext<UserContextInterface>(UserContext)
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)

  const notifyLoggedOut = () =>
    toast.success(`${user.email} successfully logged out.`)

  const navigateDropdown = async (key: React.Key) => {
    if (key === 'logout') {
      try {
        const response = await postLogout({
          email: user.email,
          token: user.token,
        })

        if (user.email === (await response)) {
          setUser!({
            name: 'Guest',
            email: '',
            token: '',
            isAdmin: false,
          })
          notifyLoggedOut()
        }
      } catch (error) {
        console.log(error)
      }
    } else if (key === 'help_and_feedback') {
      try {
        const response = await postAuthTest({
          email: user.email,
          token: user.token,
        })

        if (user.email === response) {
          console.log(response, 'is authenticated')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      const path = String(key)
      navigate(path)
    }
  }

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

  return (
    <Navbar isBordered>
      <NavbarBrand className="grow-0 basis-auto">
        <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
          <img src={logo} width={40} alt="logo" />
          Fox Ticket
        </Link>
      </NavbarBrand>

      <NavbarContent>
        {links.map((link) => (
          <NavbarItem
            key={link.path}
            className="hover:bg-secondary-700 rounded-xl px-3 py-2 transition-colors">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'text-orange-600' : undefined
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
        {!user.token && <SignUp />}

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
                fallback={<CgProfile fill="current" size={35} />}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={(key: Key) => navigateDropdown(key)}>
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
