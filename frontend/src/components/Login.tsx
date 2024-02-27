import { useContext, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Spacer,
} from '@nextui-org/react'
import { UserContext } from '@context/UserProvider'
import { postLogin } from '@api/postLogin'
import { UserResponse } from '@interfaces/user'
import { validateEmail, validatePassword } from '@utils/inputFieldValidators'
import { emailHelper, passHelper } from '@utils/inputFieldHelpers'
import { EyeSlashFilledIcon } from '@assets/svg/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@assets/svg/EyeFilledIcon'
import { toast } from 'react-toastify'

export function Login() {
  const { user, setUser } = useContext(UserContext)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [shakeEmail, setShakeEmail] = useState(false)
  const [shakePassword, setShakePassword] = useState(false)

  const loginHandler = async () => {
    if (!email.trim()) {
      setShakeEmail(true)
      emailHelper(email).color = 'danger'
      emailHelper(email).text = 'Please enter your email address'
    } else if (!validateEmail(email)) {
      setShakeEmail(true)
      emailHelper(email).color = 'danger'
    }
    if (!password) {
      setShakePassword(true)
      passHelper(password).color = 'danger'
      passHelper(password).text = 'Please enter your password'
    } else if (!validatePassword(password)) {
      setShakePassword(true)
      passHelper(password).color = 'danger'
    }
    setTimeout(() => setShakeEmail(false), 750)
    setTimeout(() => setShakePassword(false), 750)

    try {
      const userData: UserResponse = await postLogin({
        email,
        password,
      })

      if (userData) {
        const verified = userData.isVerified
        if (verified) {
          localStorage.setItem('name', userData.name)
          localStorage.setItem('email', userData.email)
          localStorage.setItem('token', userData.token)

          setUser({
            name: userData.name,
            email: userData.email,
            token: userData.token,
          })
          notifyLoggedIn()
        } else {
          notifyNotVerified()
        }

        onClose()
      }
    } catch (error) {
      setShakeEmail(true)
      setShakePassword(true)
      emailHelper(email).color = 'danger'
      passHelper(password).color = 'danger'

      emailHelper(email).text = error as string

      passHelper(password).text = error as string

      setTimeout(() => {
        setShakeEmail(false)
        setShakePassword(false)
      }, 750)
    }
  }

  function notifyLoggedIn() {
    toast.success(`Successful login. Welcome to Fox Ticket, ${user.name}!`)
  }

  function notifyNotVerified() {
    toast.warn('Please verify your email address before logging in.')
  }

  return (
    <>
      <Button onPress={onOpen} variant="shadow">
        Login
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        aria-labelledby="login form">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>
                  Welcome to <strong>Fox</strong>Ticket
                </p>
              </ModalHeader>
              <hr />
              <ModalBody>
                <Spacer y={2} />
                <Input
                  autoFocus
                  className={shakeEmail ? 'shake' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color={emailHelper(email).color}
                  errorMessage={emailHelper(email).text}
                  placeholder="Email"
                  fullWidth
                />
                <Spacer y={1.5} />
                <Input
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsPassVisible((prev) => !prev)}>
                      {isPassVisible ? (
                        <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isPassVisible ? 'text' : 'password'}
                  className={shakePassword ? 'shake' : ''}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  color={passHelper(password).color}
                  errorMessage={passHelper(password).text}
                  fullWidth
                />
                <Spacer y={2} />
                <div className="justify-between">
                  <Checkbox defaultSelected>Remember me</Checkbox>
                  <p className="text-end text-sm">Forgot password?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={loginHandler}>Login</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
