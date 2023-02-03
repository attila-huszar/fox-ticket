import { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Text, Avatar, Dropdown, Switch } from '@nextui-org/react';
import { TbHelp, TbLogout, TbMoon, TbSun, TbUser } from 'react-icons/tb';
import Login from './Login';
import SignUp from './SignUp';
import Cart from './Cart';
import Admin from './Admin';
import logo from '../static/logo.png';
import profile_defpic from '../static/profile_def.png';
import postLogout from '../api/postLogout';
import '../styles/Header.css';
import { UserContext } from '../components/App';
import { toast } from 'react-toastify';
import { UserContextInterface } from '../interfaces/user';
import { useDarkMode } from 'usehooks-ts';
import postAuthTest from '../api/postAuthTest';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } =
    useContext<UserContextInterface>(UserContext);

  const { isDarkMode, toggle } = useDarkMode();

  const notifyLoggedOut = () =>
    toast.success(`${currentUser.email} successfully logged out.`);

  const navigateDropdown = async (key: React.Key) => {
    if (key === 'LOGOUT') {
      try {
        const response = await postLogout({
          email: currentUser.email,
          token: currentUser.token,
        });

        if (currentUser.email === (await response)) {
          setCurrentUser({
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
          email: currentUser.email,
          token: currentUser.token,
        });

        if (currentUser.email === response) {
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
      variant="floating"
      css={{
        background: 'var(--nextui-colors-navbarGradient)',
        '@xsMax': {
          w: '100%',
          jc: 'space-between',
        },
      }}
    >
      <Navbar.Brand css={{ mr: '$4' }} style={{ display: 'flex', gap: '15px' }}>
        <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
        <NavLink to="/">
          <Text
            b
            color="inherit"
            style={{
              margin: '0 10px 0 0',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '34px',
            }}
          >
            Fox
          </Text>
        </NavLink>
        <Navbar.Content style={{ fontSize: '1.1rem' }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }
          >
            News
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }
          >
            Shop
          </NavLink>
          {currentUser.token ? (
            <NavLink
              to="/mytickets"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'inactiveLink'
              }
            >
              My Tickets
            </NavLink>
          ) : null}
        </Navbar.Content>
      </Navbar.Brand>
      <Navbar.Content>
        {currentUser.isAdmin && currentUser.token ? <Admin /> : null}
        {currentUser.token ? null : <Login />}
        {currentUser.token ? null : <SignUp />}
        <Cart />
        <Navbar.Item>
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger
              css={{
                fontSize: '1rem',
                '&:hover, &:focus': {
                  boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
                },
              }}
            >
              <Avatar
                bordered
                as="button"
                color="gradient"
                size="md"
                src={profile_defpic}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={key => navigateDropdown(key)}
            >
              <Dropdown.Item key="" css={{ height: '$18' }}>
                {currentUser.token ? (
                  <Text>
                    Logged in as{'\n'}
                    <Text b color="warning" css={{ d: 'flex' }}>
                      {currentUser.email}
                    </Text>
                  </Text>
                ) : (
                  <Text>
                    Welcome,{'\n'}
                    <Text b color="warning" css={{ d: 'flex' }}>
                      {currentUser.name}!
                    </Text>
                  </Text>
                )}
              </Dropdown.Item>
              <Dropdown.Item key="/profile" icon={<TbUser />} withDivider>
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="/help_and_feedback" icon={<TbHelp />}>
                Help
              </Dropdown.Item>
              <Dropdown.Item
                key="LOGOUT"
                icon={<TbLogout />}
                withDivider
                color="error"
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>

        <Switch
          checked={isDarkMode}
          onChange={toggle}
          iconOn={<TbMoon />}
          iconOff={<TbSun />}
          size="lg"
          color="secondary"
          bordered
          shadow
        />
      </Navbar.Content>
    </Navbar>
  );
}
