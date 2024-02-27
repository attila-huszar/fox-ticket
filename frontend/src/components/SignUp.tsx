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
import { postRegister } from '@api/postRegister'
import {
  nameHelper,
  emailHelper,
  passHelper,
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

  const handleSignUp = async () => {
    if (!name.length) {
      setShakeName(true)
      nameHelper(name).color = 'danger'
      nameHelper(name).text = 'Please fill in this field'
    }
    if (!email.length) {
      setShakeEmail(true)
      emailHelper(email).color = 'danger'
      emailHelper(email).text = 'Please fill in this field'
    }
    if (!password.length) {
      setShakePassword(true)
      passHelper(password).color = 'danger'
      passHelper(password).text = 'Please fill in this field'
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
    if (!validateEmail(email)) {
      setShakeEmail(true)
      emailHelper(email).color = 'danger'
    }
    if (!validatePassword(password)) {
      setShakePassword(true)
      passHelper(password).color = 'danger'
    }
    if (!validateMatch(password, passwordConf)) {
      setShakePasswordConf(true)
      passMatchHelper(password, passwordConf).color = 'danger'
    }

    setTimeout(() => setShakeName(false), 750)
    setTimeout(() => setShakeEmail(false), 750)
    setTimeout(() => setShakePassword(false), 750)
    setTimeout(() => setShakePasswordConf(false), 750)

    try {
      await postRegister({ name, email, password })
      notifySignUp()
      onClose()
    } catch (error) {
      setShakeEmail(true)
      emailHelper(email).color = 'danger'

      if (error instanceof Error) {
        emailHelper(email).text = error.message
      } else {
        emailHelper(email).text = 'Registration failed'
      }

      setTimeout(() => setShakeEmail(false), 750)
    }
  }

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
                  color={nameHelper(name).color}
                  errorMessage={nameHelper(name).text}
                  placeholder="Name"
                  fullWidth
                />
                <Spacer y={1.5} />
                <Input
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
                  type={isPassVis ? 'text' : 'password'}
                  className={shakePassword ? 'shake' : ''}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  color={passHelper(password).color}
                  errorMessage={passHelper(password).text}
                  fullWidth
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
                />
                <Spacer y={1.5} />
                <Input
                  type={isPassVis ? 'text' : 'password'}
                  className={shakePasswordConf ? 'shake' : ''}
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
                <Button onPress={handleSignUp}>Sign Up</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
