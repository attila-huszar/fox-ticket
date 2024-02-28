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
  Divider,
} from '@nextui-org/react'
import { UserContext } from '@context/UserProvider'
import { userLogin } from '@api/userLogin'
import { UserResponse } from '@interfaces/user'
import { validateEmail, validatePassword } from '@utils/inputFieldValidators'
import { EyeSlashFilledIcon } from '@assets/svg/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@assets/svg/EyeFilledIcon'
import { toast } from 'react-toastify'
import { InputHelper } from '@interfaces/user'

export function Login() {
  const { setUser } = useContext(UserContext)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailHelper, setEmailHelper] = useState<InputHelper>({
    text: '',
    color: 'default',
    shake: false,
  })
  const [passwordHelper, setPasswordHelper] = useState<InputHelper>({
    text: '',
    color: 'default',
    shake: false,
  })
  const [isPassVis, setIsPassVis] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailField = e.target.value
    setEmail(emailField)

    setEmailHelper((prevHelper) => {
      if (!emailField.trim()) {
        return { text: '', color: 'default', shake: false }
      }

      const isValid = validateEmail(emailField)

      return {
        ...prevHelper,
        text: isValid ? 'Valid email' : 'Please enter a valid email address',
        color: isValid ? 'success' : 'warning',
      }
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordField = e.target.value
    setPassword(passwordField)

    setPasswordHelper((prevHelper) => {
      if (!passwordField) {
        return {
          text: '',
          color: 'default',
          shake: false,
        }
      }

      const isValid = validatePassword(passwordField)

      return {
        ...prevHelper,
        text: isValid
          ? 'Valid password'
          : 'Password must be at least 8 characters long',
        color: isValid ? 'success' : 'warning',
      }
    })
  }

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailHelper((prevHelper) => ({
        ...prevHelper,
        text: 'Please enter a valid email address',
        color: 'danger',
        shake: true,
      }))

      setTimeout(() => {
        setEmailHelper((prevHelper) => ({
          ...prevHelper,
          shake: false,
        }))
      }, 750)
    }

    if (!validatePassword(password)) {
      setPasswordHelper((prevHelper) => ({
        ...prevHelper,
        text: 'Password must be at least 8 characters long',
        color: 'danger',
        shake: true,
      }))

      setTimeout(() => {
        setPasswordHelper((prevHelper) => ({
          ...prevHelper,
          shake: false,
        }))
      }, 750)
    }

    if (validateEmail(email) && validatePassword(password)) {
      try {
        const userData: UserResponse = await userLogin({
          email,
          password,
        })

        if (userData.isVerified) {
          localStorage.setItem('name', userData.name)
          localStorage.setItem('email', userData.email)
          localStorage.setItem('token', userData.token)

          setUser({
            name: userData.name,
            email: userData.email,
            token: userData.token,
          })

          notifyLoggedIn(userData.name)
        } else {
          notifyNotVerified(userData.email)
        }

        onClose()
      } catch (error) {
        setEmailHelper((prevHelper) => ({
          ...prevHelper,
          text: String(error),
          color: 'danger',
          shake: true,
        }))

        setPasswordHelper((prevHelper) => ({
          ...prevHelper,
          text: String(error),
          color: 'danger',
          shake: true,
        }))

        setTimeout(() => {
          setEmailHelper((prevHelper) => ({
            ...prevHelper,
            shake: false,
          }))
          setPasswordHelper((prevHelper) => ({
            ...prevHelper,
            shake: false,
          }))
        }, 750)
      }
    }
  }

  const handleOpenModal = () => {
    setEmail('')
    setPassword('')
    setEmailHelper({ text: '', color: undefined, shake: false })
    setPasswordHelper({ text: '', color: undefined, shake: false })
    onOpen()
  }

  function notifyLoggedIn(userName: string) {
    toast.success(`Successful login. Welcome to Fox Ticket, ${userName}!`)
  }

  function notifyNotVerified(email: string) {
    toast.warn(`Please verify ${email} before logging in.`)
  }

  return (
    <>
      <Button onPress={handleOpenModal} variant="shadow">
        Login
      </Button>
      <Modal
        motionProps={{
          variants: {
            enter: {
              scale: 'var(--scale-enter)',
              y: 'var(--slide-enter)',
              opacity: 1,
              transition: {
                scale: { duration: 0.4, ease: [0.36, 0.66, 0.4, 1] },
                opacity: { duration: 0.4, ease: [0.36, 0.66, 0.4, 1] },
                y: { type: 'spring', bounce: 0, duration: 0.6 },
              },
            },
            exit: {
              scale: 'var(--scale-exit)',
              y: 'var(--slide-exit)',
              opacity: 0,
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.4, 1] },
            },
          },
        }}
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
                <p className="text-indigo-950">
                  Welcome to <strong className="text-orange-700">Fox</strong>
                  Ticket
                </p>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Spacer y={3} />
                <Input
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  errorMessage={emailHelper.text}
                  color={emailHelper.color}
                  className={`relative ${emailHelper.shake ? 'animate-shake' : undefined}`}
                  classNames={{
                    helperWrapper: 'absolute',
                    errorMessage: `text-${emailHelper.color}`,
                  }}
                  placeholder="Email"
                  required
                  fullWidth
                />
                <Spacer y={3} />
                <Input
                  type={isPassVis ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  errorMessage={passwordHelper.text}
                  color={passwordHelper.color}
                  className={`relative ${passwordHelper.shake ? 'animate-shake' : undefined}`}
                  classNames={{
                    helperWrapper: 'absolute',
                    errorMessage: `text-${passwordHelper.color}`,
                  }}
                  placeholder="Password"
                  required
                  fullWidth
                  endContent={
                    <button onClick={() => setIsPassVis((prev) => !prev)}>
                      {isPassVis ? (
                        <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                />
                <Spacer y={3} />
                <div className="flex justify-between">
                  <Checkbox size="sm" defaultSelected>
                    Remember me
                  </Checkbox>
                  <p className="text-sm">Forgot password?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={handleLogin}>Login</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
