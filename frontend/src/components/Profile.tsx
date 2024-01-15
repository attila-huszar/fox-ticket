import { useContext, useMemo, useState } from 'react'
import { UserContext } from './App'
import {
  Button,
  Input,
  Spacer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import profile_defpic from '../assets/images/profile_def.png'
import {
  validateMatch,
  validateName,
  validatePassword,
} from '../utils/inputFieldValidators'
import { InputField, UserContextInterface } from '../interfaces/user'

export default function Profile() {
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
      <div
        style={{
          margin: '50px auto',
          padding: '20px',
          minWidth: '450px',
          maxWidth: '800px',
          height: '450px',
          border: '4px solid var(--nextui-colors-navbarActive)',
          borderRadius: '12px',
        }}>
        <div>
          <p
            style={{
              margin: 'auto',
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
            }}>
            My Profile
          </p>
        </div>
        <Spacer y={2} />
        <div>
          <div style={{ margin: 'auto' }}>
            <img
              src={profile_defpic}
              style={{
                margin: '0 auto',
                borderRadius: '50%',
                padding: '5px',
                border: '5px solid var(--nextui-colors-navbarActive)',
                width: '220px',
                aspectRatio: '1',
                height: 'auto',
              }}
              alt="profile"
            />
          </div>
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
            <Button
              style={{
                fontSize: '0.9rem',
                margin: 'auto',
              }}
              color="secondary">
              Change Picture
            </Button>
          </div>
          <div>
            <Button
              style={{
                fontSize: '0.9rem',
                margin: 'auto',
              }}
              id="submit"
              onPress={() => setModalUserVisible(true)}>
              Change Username
            </Button>
            <Spacer y={1.5} />
            <Button
              style={{
                fontSize: '0.9rem',
                margin: 'auto',
              }}
              onClick={() => setModalPassVisible(true)}>
              Change Password
            </Button>
          </div>
        </div>
      </div>

      <Modal
        closeButton
        aria-labelledby="username change form"
        open={modalUserVisible}
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
        open={modalPassVisible}
        onClose={closeHandler}>
        <ModalHeader>
          <p>Change your Password</p>
        </ModalHeader>
        <ModalBody>
          <Spacer y={1} />
          <Input.Password
            onChange={(e) => setPassOld(e.target.value)}
            labelPlaceholder="Current Password"
            width="350px"
            required
            bordered
            status={passOldHelper.color}
            color={passOldHelper.color}
            helperColor={passOldHelper.color}
            helperText={passOldHelper.text}
            type="password"
            size="lg"
          />
          <Spacer y={1.6} />
          <Input.Password
            onChange={(e) => setPassNew(e.target.value)}
            labelPlaceholder="New Password"
            width="350px"
            required
            bordered
            status={passNewHelper.color}
            color={passNewHelper.color}
            helperColor={passNewHelper.color}
            helperText={passNewHelper.text}
            type="password"
            size="lg"
          />
          <Spacer y={2} />
          <Input.Password
            onChange={(e) => setPassConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            width="350px"
            required
            bordered
            status={passConfHelper.color}
            color={passConfHelper.color}
            helperColor={passConfHelper.color}
            helperText={passConfHelper.text}
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
