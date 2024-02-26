import { useState } from 'react'
import {
  Spacer,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react'
import { fetchEditProduct } from '@api/products'
import { ProductRequest } from '@interfaces/product'

export function EditProduct({
  id,
  name,
  price,
  duration,
  description,
  type,
}: ProductRequest) {
  const editProduct = {
    id: id,
    name: name,
    price: price,
    duration: duration,
    description: description,
    type: type,
  }

  const [data, setData] = useState<ProductRequest>(editProduct)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [visEditProduct, setVisEditProduct] = useState(false)

  const editProductHandler = async () => {
    try {
      await fetchEditProduct(data)
    } catch (error) {
      if (error instanceof Error) {
        const errors = []
        errors.push(error.message.split(';'))

        for (let i = 0; i < errors.length; i++) {
          setErrorMessage(errors[0][i])
        }
        return
      }
    }
    setErrorMessage('')
    setMessage('Product Successfully Edited!')
    setData(editProduct)
    setVisEditProduct(false)
  }

  const productButtonHandler = () => setVisEditProduct(true)

  const closeHandler = () => {
    setVisEditProduct(false)
  }

  return (
    <>
      <Button color="secondary" onClick={productButtonHandler}>
        Edit
      </Button>
      <Modal closeButton aria-labelledby="login form" onClose={closeHandler}>
        <ModalHeader>
          <div>
            <p
              style={{
                margin: 'auto',
              }}>
              Edit Product
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <Spacer y={0.5} />
          <div>
            <div>
              <Input
                onChange={(e) => setData({ ...data, name: e.target.value })}
                width="100%"
                style={{ margin: 'auto' }}
                label="Name"
                value={data.name}
              />
              <Spacer y={0.5} />
              <Input
                type="number"
                onChange={(e) =>
                  setData({ ...data, price: Number(e.target.value) })
                }
                width="100%"
                style={{ margin: 'auto' }}
                label="Price"
                value={String(data.price) || ''}
              />
              <Spacer y={0.5} />
              <Input
                type="number"
                onChange={(e) =>
                  setData({ ...data, duration: Number(e.target.value) })
                }
                width="100%"
                style={{ margin: 'auto' }}
                label="Duration"
                value={String(data.duration) || ''}
              />
              <Spacer y={0.5} />
              <Input
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                width="100%"
                style={{ margin: 'auto' }}
                label="Description"
                value={data.description}
              />
              <Spacer y={0.5} />
              <Input
                onChange={(e) => setData({ ...data, type: e.target.value })}
                width="100%"
                style={{ margin: 'auto' }}
                label="Type"
                value={data.type}
              />
              <Spacer y={1} />
              <p style={{ textAlign: 'center' }} color="danger">
                {errorMessage}
              </p>
              <p style={{ textAlign: 'center' }} color="success">
                {message}
              </p>
              <Spacer y={1} />
              <div>
                <Button
                  onPress={editProductHandler}
                  style={{
                    fontSize: '1rem',
                    margin: 'auto',
                    marginBottom: '30px',
                  }}
                  id="submit">
                  Edit Product
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
  )
}
