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
} from '@nextui-org/react';
import { ProductRequest } from '../interfaces/product';
import QRCode from 'react-qr-code';
import { useState } from 'react';

export default function ActiveTickets({ name, description }: ProductRequest) {
  const [qrVisible, setQrVisible] = useState(false);
  //const { user } = useContext(UserContext);

  const closeHandler = () => {
    setQrVisible(false);
  };

  return (
    <>
      <div
        id="cardGrid"
        style={{
          justifyContent: 'center',
          marginLeft: '32%',
          width: '100%',
          padding: '0',
        }}>
        <Card
          style={{
            width: '280px',
            display: 'flex',
            margin: '0 auto',
            backgroundColor: 'var(--nextui-colors-cardBackground)',
          }}
          id="card"
          isHoverable>
          <CardHeader
            style={{
              backgroundColor: 'var(--nextui-colors-cardHeaderBackground)',
            }}>
            <p style={{ color: 'White', margin: 'auto', fontSize: 'larger' }}>
              {name}
            </p>
          </CardHeader>
          <Spacer />
          <CardBody>
            <p style={{ margin: 'auto' }}>{description}</p>
          </CardBody>
          <Spacer />
          <CardFooter>
            <div>
              <Button size="md" id="submit" onPress={() => setQrVisible(true)}>
                Activate
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Modal
        closeButton
        aria-labelledby="login form"
        open={qrVisible}
        onClose={closeHandler}>
        <ModalHeader>
          <p>{name}</p>
        </ModalHeader>
        <ModalBody>
          <Spacer y={2} />
        </ModalBody>
        <QRCode
          value={description}
          style={{
            width: '70%',
            height: 'auto',
            margin: 'auto',
            background: 'white',
            padding: '10px',
            borderRadius: '12px',
          }}
        />
        <ModalFooter>
          <Button color="warning" onPress={closeHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
