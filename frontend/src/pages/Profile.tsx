import { useContext, useState } from 'react'
import { UserContext } from '@context/UserProvider'
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
  nameHelper,
  passHelperText,
  passMatchHelper,
} from '@utils/inputFieldHelpers'
import { CgProfile } from 'react-icons/cg'

export function Profile() {
  const { user } = useContext(UserContext)
  const [name, setName] = useState(user.name || '')
  const [passCurr, setPassCurr] = useState('')
  const [passNew, setPassNew] = useState('')
  const [passConf, setPassConf] = useState('')

  const userNameChangeHandler = () => {
    if (!name.trim()) {
      nameHelper(name).color = 'danger'
      nameHelper(name).text = 'Please fill in your name'
    }
  }

  const closeHandler = () => {
    setPassCurr('')
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
          <Input readOnly width="100%" label="Email" value={user.email} />
          <Spacer y={1.5} />
          <Input width="100%" label="Username" value={name} />
        </div>
      </div>
      <Spacer y={2} />
      <div>
        <div>
          <Button>Change Picture</Button>
        </div>
        <div>
          <Button>Change Username</Button>
          <Spacer y={1.5} />
          <Button>Change Password</Button>
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
            color={nameHelper(name).color}
            errorMessage={nameHelper(name).text}
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
            type="password"
            onValueChange={(val) => setPassCurr(val)}
            label="Current Password"
            width="350px"
            required
            color={passHelperText(passCurr).color}
            errorMessage={passHelperText(passCurr).text}
          />
          <Spacer y={2} />
          <Input
            type="password"
            onValueChange={(val) => setPassNew(val)}
            label="New Password"
            width="350px"
            required
            color={passHelperText(passNew).color}
            errorMessage={passHelperText(passNew).text}
          />
          <Spacer y={2} />
          <Input
            type="password"
            onValueChange={(val) => setPassConf(val)}
            label="Confirm Password"
            width="350px"
            required
            color={passMatchHelper(passNew, passConf).color}
            errorMessage={passMatchHelper(passNew, passConf).text}
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
