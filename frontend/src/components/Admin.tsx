import { useNavigate } from 'react-router-dom';
import { Navbar, Dropdown, Button } from '@nextui-org/react';
import { TbBook, TbNews, TbShoppingCart, TbCreditCard } from 'react-icons/tb';

export default function Admin() {
  const navigate = useNavigate();

  const navigateDropdown = (key: React.Key) => {
    const path = String(key);
    navigate(path);
  };

  return (
    <Navbar.Item>
      <Dropdown placement="bottom-right">
        <Dropdown.Trigger>
          <Button style={{ fontSize: '1rem' }} auto color="gradient" shadow>
            Admin
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          onAction={key => navigateDropdown(key)}
        >
          <Dropdown.Item key="/products" icon={<TbShoppingCart />}>
            Products
          </Dropdown.Item>
          <Dropdown.Item key="/articles" icon={<TbNews />} withDivider>
            Articles
          </Dropdown.Item>
          <Dropdown.Item key="/orders" icon={<TbBook />} withDivider>
            Orders
          </Dropdown.Item>
          <Dropdown.Item key="/purchases" icon={<TbCreditCard />} withDivider>
            Purchases
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar.Item>
  );
}
