import {
  Text,
  Container,
  Spacer,
  Button,
  Row,
  Col,
  Input,
} from '@nextui-org/react';
import { useState } from 'react';

export function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');


  const addProductHandler = () => {

  };

  return (
    <Container
      fluid
      wrap="wrap"
      justify="center"
      style={{
        margin: '20px auto',
        minWidth: '450px',
        maxWidth: '500px',
        border: '4px solid var(--nextui-colors-navbarActive)',
        borderRadius: '12px',
      }}
    >
      <Row>
        <Text
          size={30}
          css={{
            margin: 'auto',
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
          }}
          weight="bold"
        >
          Add New Product
        </Text>
      </Row>
      <Spacer y={0.5} />
      <Row>
        <Col>
          <Input
            onChange={e => setProductName(e.target.value)}
            underlined
            width="100%"
            style={{ margin: 'auto' }}
            labelLeft="Name"
          />
          <Spacer y={0.5} />
          <Input
            onChange={e => setPrice(e.target.value)}
            underlined
            width="100%"
            style={{ margin: 'auto' }}
            labelLeft="Price"
          />
          <Spacer y={0.5} />
          <Input
            onChange={e => setDuration(e.target.value)}
            underlined
            width="100%"
            style={{ margin: 'auto' }}
            labelLeft="Duration"
          />
          <Spacer y={0.5} />
          <Input
            onChange={e => setDescription(e.target.value)}
            underlined
            width="100%"
            style={{ margin: 'auto' }}
            labelLeft="Description"
          />
          <Spacer y={0.5} />

          <Input
            onChange={e => setType(e.target.value)}
            underlined
            width="100%"
            style={{ margin: 'auto' }}
            labelLeft="Type"
          />
          <Spacer y={1} />
          <Row>
            <Button
              onPress={addProductHandler}
              style={{ fontSize: '1rem', margin: 'auto', marginBottom: '30px' }}
              shadow
              color="gradient"
              id="submit"
            >
              Add Product
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
