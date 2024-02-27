import { useMemo, useState } from 'react'
import {
  Modal,
  Input,
  Button,
  Spacer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { postRegister } from '@api/postRegister'
import { InputField } from '@interfaces/user'
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
} from '@utils/inputFieldValidators'
import { toast } from 'react-toastify'
import { EyeSlashFilledIcon } from '@assets/svg/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@assets/svg/EyeFilledIcon'
import '@styles/inputFieldHelper.css'
import 'react-toastify/dist/ReactToastify.css'

export function SignUp() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [isPassVis, setIsPassVis] = useState(false)
  const [shakeName, setShakeName] = useState(false)
  const [shakeEmail, setShakeEmail] = useState(false)
  const [shakePassword, setShakePassword] = useState(false)
  const [shakePasswordConf, setShakePasswordConf] = useState(false)

  // Input field helpers
  const nameHelper: InputField = useMemo(() => {
    if (!name)
      return {
        text: '',
        color: 'default',
      }
    const isValid = validateName(name)

    return {
      text: isValid
        ? `Nice to meet you ${name}!`
        : 'Please only use common formats',
      color: isValid ? 'success' : 'warning',
    }
  }, [name])

  const emailHelper: InputField = useMemo(() => {
    if (!email)
      return {
        text: '',
        color: 'default',
      }
    const isValid = validateEmail(email)

    return {
      text: isValid ? 'Valid email' : 'Please enter a valid email address',
      color: isValid ? 'success' : 'warning',
    }
  }, [email])

  const passHelper: InputField = useMemo(() => {
    if (!password)
      return {
        text: '',
        color: 'default',
      }
    const isValidPass = validatePassword(password)

    return {
      text: isValidPass
        ? 'Valid password'
        : 'Please enter minimum eight characters',
      color: isValidPass ? 'success' : 'warning',
    }
  }, [password])

  const passConfHelper: InputField = useMemo(() => {
    if (!passwordConf)
      return {
        text: '',
        color: 'default',
      }

    const isValidPass = validatePassword(passwordConf)
    const isMatching = validateMatch(password, passwordConf)

    return {
      text: isMatching ? 'Passwords match' : 'Passwords not matching',
      color: isValidPass && isMatching ? 'success' : 'warning',
    }
  }, [password, passwordConf])

  // Handlers
  const handleSignUp = async () => {
    if (!name.length) {
      setShakeName(true)
      nameHelper.color = 'danger'
      nameHelper.text = 'Please fill this field'
    }
    if (!email.length) {
      setShakeEmail(true)
      emailHelper.color = 'danger'
      emailHelper.text = 'Please fill this field'
    }
    if (!password.length) {
      setShakePassword(true)
      passHelper.color = 'danger'
      passHelper.text = 'Please fill this field'
    }
    if (!passwordConf.length) {
      setShakePasswordConf(true)
      passConfHelper.color = 'danger'
      passConfHelper.text = 'Please fill this field'
    }
    if (!validateName(name)) {
      setShakeName(true)
      nameHelper.color = 'danger'
    }
    if (!validateEmail(email)) {
      setShakeEmail(true)
      emailHelper.color = 'danger'
    }
    if (!validatePassword(password)) {
      setShakePassword(true)
      passHelper.color = 'danger'
    }
    if (!validateMatch(password, passwordConf)) {
      setShakePasswordConf(true)
      passConfHelper.color = 'danger'
    }

    setTimeout(() => setShakeName(false), 750)
    setTimeout(() => setShakeEmail(false), 750)
    setTimeout(() => setShakePassword(false), 750)
    setTimeout(() => setShakePasswordConf(false), 750)

    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateMatch(password, passwordConf)
    ) {
      try {
        await postRegister({ name, email, password })
        onClose()
        notifySignUp()
      } catch (error) {
        let errorMessage = 'Registration failed'

        setShakeEmail(true)
        emailHelper.color = 'danger'

        if (error instanceof Error) {
          errorMessage = error.message

          if (errorMessage.includes('Account already exists')) {
            emailHelper.text = errorMessage.replace('Validation error: ', '')
          } else {
            emailHelper.text = errorMessage
          }
        } else {
          emailHelper.text = errorMessage
        }

        setTimeout(() => setShakeEmail(false), 750)
      }
    }
  }

  // const closeModalHandler = () => {
  //   setModalVisible(false);
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  //   setPasswordConf('');
  // };

  // Notifications
  const notifySignUp = () =>
    toast.success(
      `${email} successfully signed up! Please, verify your email address!`,
    )

  return (
    <div>
      <Button onPress={onOpen} variant="shadow">
        Sign Up
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        aria-labelledby="signup form"
        closeButton
        onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Please sign up with your email address</p>
              </ModalHeader>
              <hr />
              <ModalBody>
                <Spacer y={2} />
                <Input
                  autoFocus
                  className={shakeName ? 'shake' : ''}
                  onChange={(e) => setName(e.target.value)}
                  required
                  color={nameHelper.color}
                  errorMessage={nameHelper.text}
                  placeholder="Name"
                  fullWidth
                />
                <Spacer y={1.5} />
                <Input
                  className={shakeEmail ? 'shake' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color={emailHelper.color}
                  errorMessage={emailHelper.text}
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
                      onClick={() => setIsPassVis((prev) => !prev)}>
                      {isPassVis ? (
                        <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isPassVis ? 'text' : 'password'}
                  className={shakePassword ? 'shake' : ''}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  color={passHelper.color}
                  errorMessage={passHelper.text}
                  fullWidth
                />
                <Spacer y={1.5} />
                <Input
                  placeholder="Confirm Your Password"
                  className={shakePasswordConf ? 'shake' : ''}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  required
                  color={passConfHelper.color}
                  errorMessage={passConfHelper.text}
                  type={isPassVis ? 'text' : 'password'}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={handleSignUp}>Sign Up</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
