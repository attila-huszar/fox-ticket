import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { TbArrowBackUp } from 'react-icons/tb'
import logo from '@assets/images/logo.png'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <p className="mt-10 text-center text-2xl font-bold">
        This page is not implemented yet
      </p>
      <div className="mt-10 flex justify-center">
        <img src={logo} alt="logo" />
      </div>
      <Button
        size="lg"
        endContent={<TbArrowBackUp />}
        onPress={() => navigate(-1)}>
        Back
      </Button>
    </>
  )
}
