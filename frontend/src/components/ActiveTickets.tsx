import {
  Grid,
  Button,
  Card,
  Row,
  Text,
  Modal,
  Spacer,
} from '@nextui-org/react';
import { ProductRequest } from '../interfaces/product';
import QRCode from 'react-qr-code';
import { useContext, useState } from 'react';

export default function ActiveTickets({
  id,
  name,
  description,
}: ProductRequest) {
  const [qrVisible, setQrVisible] = useState(false);
  //const { user } = useContext(UserContext);

  const closeHandler = () => {
    setQrVisible(false);
  };

  return (
    <>
      <Grid
        sm={12}
        md={5}
        id="cardGrid"
        css={{
          justifyContent: 'center',
          marginLeft: '32%',
          width: '100%',
          padding: '0',
        }}
      >
        <Card
          css={{
            w: '280px',
            display: 'flex',
            margin: '0 auto',
            backgroundColor: 'var(--nextui-colors-cardBackground)',
          }}
          id="card"
          isHoverable
        >
          <Card.Header
            css={{
              backgroundColor: 'var(--nextui-colors-cardHeaderBackground)',
            }}
          >
            <Text css={{ color: 'White', margin: 'auto', fontSize: 'larger' }}>
              {name}
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: '$10' }}>
            <Text css={{ margin: 'auto' }}>{description}</Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="center">
              <Button
                shadow
                size="md"
                auto
                color="gradient"
                id="submit"
                onPress={() => setQrVisible(true)}
              >
                Activate
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>

      <Modal
        closeButton
        blur
        aria-labelledby="login form"
        open={qrVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text size={18}>{name}</Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
        </Modal.Body>
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
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
