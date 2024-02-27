import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { TbArrowBackUp } from 'react-icons/tb'
import logo from '@assets/svg/logo.svg'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="mb-10 text-2xl font-bold">Page not found</p>
      <img src={logo} alt="logo" width={160} />
      <Button
        className="mt-10"
        aria-label="back"
        size="lg"
        variant="shadow"
        endContent={<TbArrowBackUp />}
        onPress={() => navigate(-1)}>
        Back
      </Button>
    </div>
  )
}
