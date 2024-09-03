import { useState } from 'react'
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
import { userRegister } from '@api/userRegister'
import { InputHelper, UserResponse } from '@interfaces/user'
import {
  nameHelper,
  passHelperText,
  passMatchHelper,
} from '@utils/inputFieldHelpers'
import {
  validateName,
  validateEmail,
  validatePassword,
  validateMatch,
} from '@utils/inputFieldValidators'
import { toast } from 'react-toastify'
import { EyeSlashFilledIcon } from '@assets/svg/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@assets/svg/EyeFilledIcon'
import 'react-toastify/dist/ReactToastify.css'

export function Signup() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailHelper, setEmailHelper] = useState<InputHelper>({
    text: '',
    color: 'default',
    shake: false,
  })
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [shakeName, setShakeName] = useState(false)
  const [shakePassword, setShakePassword] = useState(false)
  const [shakePasswordConf, setShakePasswordConf] = useState(false)
  const [isPassVis, setIsPassVis] = useState(false)

  const handleSignup = async () => {
    if (!name.length) {
      setShakeName(true)
      nameHelper(name).color = 'danger'
      nameHelper(name).text = 'Please fill in this field'
    }
    if (!password.length) {
      setShakePassword(true)
      passHelperText(password).color = 'danger'
      passHelperText(password).text = 'Please fill in this field'
    }
    if (!passwordConf.length) {
      setShakePasswordConf(true)
      passMatchHelper(password, passwordConf).color = 'danger'
      passMatchHelper(password, passwordConf).text = 'Please fill in this field'
    }
    if (!validateName(name)) {
      setShakeName(true)
      nameHelper(name).color = 'danger'
    }
    if (!validatePassword(password)) {
      setShakePassword(true)
      passHelperText(password).color = 'danger'
    }
    if (!validateMatch(password, passwordConf)) {
      setShakePasswordConf(true)
      passMatchHelper(password, passwordConf).color = 'danger'
    }

    setTimeout(() => setShakeName(false), 750)
    setTimeout(() => setShakePassword(false), 750)
    setTimeout(() => setShakePasswordConf(false), 750)

    try {
      if (!email.length) {
        setEmailHelper({
          text: 'Please fill in this field',
          color: 'danger',
          shake: true,
        })
        setTimeout(() => setEmailHelper({ ...emailHelper, shake: false }), 750)

        return
      }

      if (!validateEmail(email)) {
        setEmailHelper({
          text: 'Please enter a valid email address',
          color: 'danger',
          shake: true,
        })
        setTimeout(() => setEmailHelper({ ...emailHelper, shake: false }), 750)

        return
      }

      const userData: UserResponse = await userRegister({
        name,
        email,
        password,
      })

      if (userData.email) {
        notifySignUp(userData.email)
        onClose()
      }
    } catch (error) {
      if (error instanceof Error) {
        setEmailHelper({ text: error.message, color: 'danger', shake: true })
      } else {
        setEmailHelper({
          text: 'Registration failed',
          color: 'danger',
          shake: true,
        })
      }

      setTimeout(() => setEmailHelper({ ...emailHelper, shake: false }), 750)
    }
  }

  function notifySignUp(email: string) {
    toast.success(
      `${email} successfully signed up! Please, verify your email address!`,
    )
  }

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
                  className={shakeName ? 'animate-shake' : undefined}
                  onChange={(e) => setName(e.target.value)}
                  required
                  color={nameHelper(name).color}
                  errorMessage={nameHelper(name).text}
                  placeholder="Name"
                  fullWidth
                />
                <Spacer y={1.5} />
                <Input
                  className={emailHelper.shake ? 'animate-shake' : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color={emailHelper.color}
                  errorMessage={emailHelper.text}
                  placeholder="Email"
                  fullWidth
                />
                <div>{emailHelper.text}</div>
                <Spacer y={1.5} />
                <Input
                  type={isPassVis ? 'text' : 'password'}
                  className={shakePassword ? 'animate-shake' : undefined}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  color={passHelperText(password).color}
                  errorMessage={passHelperText(password).text}
                  fullWidth
                  endContent={
                    <button
                      type="button"
                      onClick={() => setIsPassVis((prev) => !prev)}>
                      {isPassVis ? (
                        <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                />
                <Spacer y={1.5} />
                <Input
                  type={isPassVis ? 'text' : 'password'}
                  className={shakePasswordConf ? 'animate-shake' : undefined}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  required
                  placeholder="Confirm Your Password"
                  color={passMatchHelper(password, passwordConf).color}
                  errorMessage={passMatchHelper(password, passwordConf).text}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={handleSignup}>Sign Up</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
