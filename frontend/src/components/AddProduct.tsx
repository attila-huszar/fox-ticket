import {
  Text,
  Spacer,
  Button,
  Row,
  Col,
  Input,
  Modal,
} from '@nextui-org/react';
import { useState } from 'react';
import { fetchAddNewProduct } from '../api/products';
import { ProductRequest, ProductResponse } from '../interfaces/product';

export function AddProduct({ addProduct }: { addProduct: (newProduct: ProductResponse) => void }) {
  const emptyproduct = {
    name: '',
    price: 0,
    duration: 0,
    description: '',
    type: '',
  };
  const [data, setData] = useState<ProductRequest>(emptyproduct);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [visAddProduct, setVisAddProduct] = useState(false);

  const addProductHandler = async () => {
    try {
      addProduct(await fetchAddNewProduct(data));
    } catch (error) {
      if (error instanceof Error) {
        const errors = [];
        errors.push(error.message.split(';'));

        for (let i = 0; i < errors.length; i++) {
          setErrorMessage(errors[0][i]);
        }
        return;
      }
    }
    setErrorMessage('');
    setMessage('Product Successfully Added!')
    setData(emptyproduct);
  };

  const productButtonHandler = () => setVisAddProduct(true);

  const closeHandler = () => {
    setVisAddProduct(false);
  };

  return (
    <>
      <Button
        style={{ fontSize: '1rem', margin: 'auto', marginBottom: '30px', zIndex:"0"}}
        auto
        color="secondary"
        shadow
        onClick={productButtonHandler}
      >
        Add Product
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="login form"
        open={visAddProduct}
        onClose={closeHandler}
      >
        <Modal.Header>
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
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.5} />
          <Row>
            <Col>
              <Input
                onChange={e => setData({ ...data, name: e.target.value })}
                underlined
                width="100%"
                style={{ margin: 'auto' }}
                labelLeft="Name"
                value={data.name}
              />
              <Spacer y={0.5} />
              <Input
                type="number"
                onChange={e =>
                  setData({ ...data, price: Number(e.target.value) })
                }
                underlined
                width="100%"
                style={{ margin: 'auto' }}
                labelLeft="Price"
                value={data.price === 0 ? '' : data.price}
              />
              <Spacer y={0.5} />
              <Input
                type="number"
                onChange={e =>
                  setData({ ...data, duration: Number(e.target.value) })
                }
                underlined
                width="100%"
                style={{ margin: 'auto' }}
                labelLeft="Duration"
                value={data.duration === 0 ? '' : data.duration}
              />
              <Spacer y={0.5} />
              <Input
                onChange={e =>
                  setData({ ...data, description: e.target.value })
                }
                underlined
                width="100%"
                style={{ margin: 'auto' }}
                labelLeft="Description"
                value={data.description}
              />
              <Spacer y={0.5} />
              <Input
                onChange={e => setData({ ...data, type: e.target.value })}
                underlined
                width="100%"
                style={{ margin: 'auto' }}
                labelLeft="Type"
                value={data.type}
              />
              <Spacer y={1} />
              <Text css={{ textAlign: 'center' }} color="error">
                {errorMessage}
              </Text>
              <Text css={{ textAlign: 'center' }} color="success">{message}</Text>
              <Spacer y={1} />
              <Row>
                <Button
                  onPress={addProductHandler}
                  style={{
                    fontSize: '1rem',
                    margin: 'auto',
                    marginBottom: '30px',
                  }}
                  shadow
                  color="gradient"
                  id="submit"
                >
                  Add Product
                </Button>
                <Button auto flat color="error" onPress={closeHandler}>
                  Close
                </Button>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
