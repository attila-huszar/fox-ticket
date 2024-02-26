import { useNavigate } from 'react-router-dom'
import {
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import {
  TbBook,
  TbNews,
  TbShoppingCart,
  TbCreditCard,
  TbSettings,
} from 'react-icons/tb'

export function Admin() {
  const navigate = useNavigate()

  const navigateDropdown = (key: React.Key) => {
    const path = String(key)
    navigate(path)
  }

  return (
    <NavbarItem>
      <Dropdown placement="bottom">
        <DropdownTrigger
          style={{
            fontSize: '1rem',
          }}>
          <Button
            color="primary"
            variant="shadow"
            startContent={<TbSettings />}>
            Admin
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User menu actions"
          color="secondary"
          onAction={(key) => navigateDropdown(key)}>
          <DropdownItem key="/products" startContent={<TbShoppingCart />}>
            Products
          </DropdownItem>
          <DropdownItem key="/articles" startContent={<TbNews />} showDivider>
            Articles
          </DropdownItem>
          <DropdownItem key="/orders" startContent={<TbBook />} showDivider>
            Orders
          </DropdownItem>
          <DropdownItem
            key="/purchases"
            startContent={<TbCreditCard />}
            showDivider>
            Purchases
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  )
}
