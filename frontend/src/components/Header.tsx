import { useContext, Key } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
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
  Switch,
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
import logo from '@assets/images/logo.png'

export function Header() {
  const navigate = useNavigate()
  const { user, setUser } = useContext<UserContextInterface>(UserContext)

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)

  const notifyLoggedOut = () =>
    toast.success(`${user.email} successfully logged out.`)

  const navigateDropdown = async (key: React.Key) => {
    if (key === 'LOGOUT') {
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
      } catch {
        null
      }
    } else if (key === '/help_and_feedback') {
      try {
        const response = await postAuthTest({
          email: user.email,
          token: user.token,
        })

        if (user.email === response) {
          const authTest = response
          console.log(authTest, 'is authenticated')
        }
      } catch {
        null
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
    <Navbar isBordered className="sticky top-0 z-50 h-20 w-full">
      <NavbarBrand>
        <img src={logo} className="mr-4 size-8" alt="logo" />
        <NavLink to="/">
          <p className="mr-4 text-2xl font-bold">Fox Ticket</p>
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="mr-auto">
        {links.map((link) => (
          <NavbarItem key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-navbarLinkActive-light dark:text-navbarLinkActive-dark'
                  : 'text-navbarLink-light dark:text-navbarLink-dark'
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
                isActive
                  ? 'text-navbarLinkActive-light dark:text-navbarLinkActive-dark'
                  : 'text-navbarLink-light dark:text-navbarLink-dark'
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

        <Cart />

        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                src=""
                showFallback
                fallback={<CgProfile fill="currentColor" size={35} />}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              color="secondary"
              onAction={(key: Key) => navigateDropdown(key)}>
              <DropdownItem key="profile" className="h-14 gap-2">
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
              <DropdownItem key="profile" startContent={<TbUser />} showDivider>
                Profile
              </DropdownItem>
              <DropdownItem key="help_and_feedback" startContent={<TbHelp />}>
                Help
              </DropdownItem>
              <DropdownItem
                key="LOGOUT"
                startContent={<TbLogout />}
                showDivider
                color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          thumbIcon={({ isSelected }) =>
            isSelected ? <TbSun size={35} /> : <TbMoon size={35} />
          }
          size="lg"
          color="secondary"
        />
      </NavbarContent>
    </Navbar>
  )
}
