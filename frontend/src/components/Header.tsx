import { Key, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
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
} from '@nextui-org/react';
import { TbHelp, TbLogout, TbMoon, TbSun, TbUser } from 'react-icons/tb';
import Login from './Login';
import SignUp from './SignUp';
import Cart from './Cart';
import Admin from './Admin';
import logo from '../assets/images/logo.png';
import profile_defpic from '../assets/images/profile_def.png';
import postLogout from '../api/postLogout';
import '../styles/Header.css';
import { UserContext } from '../components/App';
import { toast } from 'react-toastify';
import { UserContextInterface } from '../interfaces/user';
import { useDarkMode } from 'usehooks-ts';
import postAuthTest from '../api/postAuthTest';

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext<UserContextInterface>(UserContext);

  const { isDarkMode, toggle } = useDarkMode();

  const notifyLoggedOut = () =>
    toast.success(`${user.email} successfully logged out.`);

  const navigateDropdown = async (key: React.Key) => {
    if (key === 'LOGOUT') {
      try {
        const response = await postLogout({
          email: user.email,
          token: user.token,
        });

        if (user.email === (await response)) {
          setUser!({
            name: 'Guest',
            email: '',
            token: '',
            isAdmin: false,
          });
          notifyLoggedOut();
        }
      } catch {
        null;
      }
    } else if (key === '/help_and_feedback') {
      try {
        const response = await postAuthTest({
          email: user.email,
          token: user.token,
        });

        if (user.email === response) {
          const authTest = response;
          console.log(authTest, 'is authenticated');
        }
      } catch {
        null;
      }
    } else {
      const path = String(key);
      navigate(path);
    }
  };

  return (
    <Navbar
      isBordered
      style={{
        background: 'var(--nextui-colors-navbarGradient)',
      }}>
      <NavbarBrand style={{ display: 'flex', gap: '15px' }}>
        <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
        <NavLink to="/">
          <p
            color="inherit"
            style={{
              margin: '0 10px 0 0',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '34px',
            }}>
            Fox
          </p>
        </NavLink>
        <NavbarContent style={{ fontSize: '1.1rem' }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }>
            News
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }>
            Shop
          </NavLink>
          {user.token ? (
            <NavLink
              to="/mytickets"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'inactiveLink'
              }>
              My Tickets
            </NavLink>
          ) : null}
        </NavbarContent>
      </NavbarBrand>
      <NavbarContent>
        {user.isAdmin && user.token ? <Admin /> : null}
        {user.token ? null : <Login />}
        {user.token ? null : <SignUp />}
        <Cart />
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar as="button" size="md" src={profile_defpic} />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User menu actions"
              color="secondary"
              onAction={(key: Key) => navigateDropdown(key)}>
              <DropdownItem key="" style={{ height: '$18' }}>
                {user.token ? (
                  <p>
                    Logged in as{'\n'}
                    <p color="warning">{user.email}</p>
                  </p>
                ) : (
                  <p>
                    Welcome,{'\n'}
                    <p color="warning">{user.name}!</p>
                  </p>
                )}
              </DropdownItem>
              <DropdownItem
                key="/profile"
                startContent={<TbUser />}
                showDivider>
                Profile
              </DropdownItem>
              <DropdownItem key="/help_and_feedback" startContent={<TbHelp />}>
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
        </NavbarItem>

        <Switch
          checked={isDarkMode}
          onChange={toggle}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <TbSun className={className} />
            ) : (
              <TbMoon className={className} />
            )
          }
          size="lg"
          color="secondary"
        />
      </NavbarContent>
    </Navbar>
  );
}
