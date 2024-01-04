import {
  Spacer,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import { useState } from 'react';
import { fetchAddNewProduct } from '../api/products';
import { ProductRequest, ProductResponse } from '../interfaces/product';

export function AddProduct({
  addProduct,
}: {
  addProduct: (newProduct: ProductResponse) => void;
}) {
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
    setMessage('Product Successfully Added!');
    setData(emptyproduct);
  };

  const productButtonHandler = () => setVisAddProduct(true);

  const closeHandler = () => {
    setVisAddProduct(false);
  };

  return (
    <>
      <Button
        style={{
          fontSize: '1rem',
          margin: 'auto',
          marginBottom: '30px',
          zIndex: '0',
        }}
        color="secondary"
        onClick={productButtonHandler}>
        Add Product
      </Button>
      <Modal
        closeButton
        aria-labelledby="login form"
        open={visAddProduct}
        onClose={closeHandler}>
        <ModalHeader>
          <div>
            <p
              style={{
                margin: 'auto',
                textGradient: '45deg, $blue600 -20%, $pink600 50%',
              }}>
              Add New Product
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <Spacer y={0.5} />
          <div>
            <div>
              <Input
                onChange={e => setData({ ...data, name: e.target.value })}
                width="100%"
                style={{ margin: 'auto' }}
                label="Name"
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
                width="100%"
                style={{ margin: 'auto' }}
                label="Description"
                value={data.description}
              />
              <Spacer y={0.5} />
              <Input
                onChange={e => setData({ ...data, type: e.target.value })}
                width="100%"
                style={{ margin: 'auto' }}
                label="Type"
                value={data.type}
              />
              <Spacer y={1} />
              <p style={{ textAlign: 'center' }} color="error">
                {errorMessage}
              </p>
              <p style={{ textAlign: 'center' }} color="success">
                {message}
              </p>
              <Spacer y={1} />
              <div>
                <Button
                  onPress={addProductHandler}
                  style={{
                    fontSize: '1rem',
                    margin: 'auto',
                    marginBottom: '30px',
                  }}
                  id="submit">
                  Add Product
                </Button>
                <Button color="danger" onPress={closeHandler}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
