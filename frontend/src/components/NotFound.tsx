import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { TbArrowBackUp } from 'react-icons/tb'
import logo from '@assets/images/logo.png'

export default function NotImplementedPage() {
  const navigate = useNavigate()

  return (
    <>
      <h1 style={{ padding: '90px', fontSize: '2rem', textAlign: 'center' }}>
        This page is not implemented yet
      </h1>
      <img
        src={logo}
        style={{ margin: '0 auto 100px', maxWidth: '150px', maxHeight: 'auto' }}
        alt="logo"
      />
      <Button
        style={{ margin: 'auto' }}
        size="lg"
        endContent={<TbArrowBackUp />}
        onPress={() => navigate(-1)}>
        Back
      </Button>
    </>
  )
}
