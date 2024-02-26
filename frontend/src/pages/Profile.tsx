import { useContext, useMemo, useState } from 'react'
import { UserContext } from '../App'
import {
  Button,
  Input,
  Spacer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import {
  validateMatch,
  validateName,
  validatePassword,
} from '@utils/inputFieldValidators'
import { InputField, UserContextInterface } from '@interfaces/user'
import { CgProfile } from 'react-icons/cg'

export function Profile() {
  const { user } = useContext<UserContextInterface>(UserContext)
  const [modalUserVisible, setModalUserVisible] = useState(false)
  const [modalPassVisible, setModalPassVisible] = useState(false)
  const [name, setName] = useState('')
  const [passOld, setPassOld] = useState('')
  const [passNew, setPassNew] = useState('')
  const [passConf, setPassConf] = useState('')

  const nameHelper: InputField = useMemo(() => {
    if (!name)
      return {
        text: '',
        color: 'default',
      }
    const isValid = validateName(name)

    return {
      text: isValid ? 'Valid name' : 'Please only use common formats',
      color: isValid ? 'success' : 'warning',
    }
  }, [name])

  const passOldHelper: InputField = useMemo(() => {
    if (!passOld)
      return {
        text: '',
        color: 'default',
      }
    const isValidPass = validatePassword(passOld)

    return {
      text: isValidPass
        ? 'Valid password'
        : 'Please enter minimum eight characters',
      color: isValidPass ? 'success' : 'warning',
    }
  }, [passOld])

  const passNewHelper: InputField = useMemo(() => {
    if (!passNew)
      return {
        text: '',
        color: 'default',
      }

    const isValidPass = validatePassword(passNew)
    const isMatching = validateMatch(passNew, passConf)

    return {
      text: isValidPass
        ? 'Valid password'
        : 'Please enter minimum eight characters',
      color: isValidPass && isMatching ? 'success' : 'warning',
    }
  }, [passNew, passConf])

  const passConfHelper: InputField = useMemo(() => {
    if (!passConf)
      return {
        text: '',
        color: 'default',
      }

    const isValidPass = validatePassword(passConf)
    const isMatching = validateMatch(passNew, passConf)

    return {
      text: isMatching ? 'Passwords match' : 'Passwords do not match',
      color: isValidPass && isMatching ? 'success' : 'warning',
    }
  }, [passNew, passConf])

  const userNameChangeHandler = async () => {
    if (name.length === 0) {
      nameHelper.color = 'danger'
      nameHelper.text = 'Please fill this field'
    }
  }

  const closeHandler = () => {
    setModalUserVisible(false)
    setModalPassVisible(false)
    setName('')
    setPassOld('')
    setPassNew('')
    setPassConf('')
  }

  return (
    <>
      <p>My Profile</p>
      <Spacer y={2} />
      <div>
        <CgProfile />
        <div>
          <Input
            readOnly
            width="100%"
            size="lg"
            label="Email"
            value={user.email}
          />
          <Spacer y={1.5} />
          <Input width="100%" size="lg" label="Username" value={user.name} />
        </div>
      </div>
      <Spacer y={2} />
      <div>
        <div>
          <Button color="secondary">Change Picture</Button>
        </div>
        <div>
          <Button id="submit" onPress={() => setModalUserVisible(true)}>
            Change Username
          </Button>
          <Spacer y={1.5} />
          <Button onClick={() => setModalPassVisible(true)}>
            Change Password
          </Button>
        </div>
      </div>

      <Modal
        closeButton
        aria-labelledby="username change form"
        onClose={closeHandler}>
        <ModalHeader>
          <p>Change your Username</p>
        </ModalHeader>
        <ModalBody>
          <Spacer y={1} />
          <Input
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="New Username"
            width="350px"
            color={nameHelper.color}
            errorMessage={nameHelper.text}
            size="lg"
          />

          <Spacer y={1} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={closeHandler}>
            Close
          </Button>
          <Button onPress={userNameChangeHandler}>Change</Button>
        </ModalFooter>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="password change form"
        onClose={closeHandler}>
        <ModalHeader>
          <p>Change your Password</p>
        </ModalHeader>
        <ModalBody>
          <Spacer y={1} />
          <Input
            onValueChange={(val) => setPassOld(val)}
            label="Current Password"
            width="350px"
            required
            variant="bordered"
            color={passOldHelper.color}
            errorMessage={passOldHelper.text}
            type="password"
            size="lg"
          />
          <Spacer y={2} />
          <Input
            onValueChange={(val) => setPassNew(val)}
            label="New Password"
            width="350px"
            required
            variant="bordered"
            color={passNewHelper.color}
            errorMessage={passNewHelper.text}
            type="password"
            size="lg"
          />
          <Spacer y={2} />
          <Input
            onValueChange={(val) => setPassConf(val)}
            label="Confirm Password"
            width="350px"
            required
            variant="bordered"
            color={passConfHelper.color}
            errorMessage={passConfHelper.text}
            type="password"
            size="lg"
          />
          <Spacer y={1} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={closeHandler}>
            Close
          </Button>
          <Button onPress={closeHandler}>Change</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
