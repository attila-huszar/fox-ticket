import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@nextui-org/react'
import { ProductRequest } from '@interfaces/product'
import QRCode from 'react-qr-code'

export function ActiveTickets({ name, description }: ProductRequest) {
  const [, setQrVisible] = useState(false)

  const closeHandler = () => {
    setQrVisible(false)
  }

  return (
    <>
      <div>
        <Card isHoverable>
          <CardHeader>
            <p>{name}</p>
          </CardHeader>
          <Spacer />
          <CardBody>
            <p>{description}</p>
          </CardBody>
          <Spacer />
          <CardFooter>
            <div>
              <Button onPress={() => setQrVisible(true)}>Activate</Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Modal closeButton onClose={closeHandler}>
        <ModalHeader>
          <p>{name}</p>
        </ModalHeader>
        <ModalBody>
          <Spacer y={2} />
        </ModalBody>
        <QRCode value={description} />
        <ModalFooter>
          <Button color="warning" onPress={closeHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
