import axios, { AxiosError } from 'axios'
import { ProductRequest, ProductResponse } from '@interfaces/product'

export async function fetchProducts() {
  const response: { data: { allProducts: ProductResponse[] } } =
    await axios.get('/api/products')
  return response.data.allProducts
}

export async function fetchAddNewProduct(
  productData: ProductRequest,
): Promise<ProductResponse> {
  try {
    const response: { data: ProductResponse } = await axios.post(
      '/api/admin/products',
      {
        name: productData.name,
        price: productData.price,
        duration: productData.duration,
        description: productData.description,
        type: productData.type,
      },
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export async function fetchDeleteProduct(id: number) {
  await axios.delete(`/api/admin/products/${id}`)
}

export async function fetchEditProduct(
  productData: ProductRequest,
): Promise<ProductResponse> {
  try {
    const response: { data: ProductResponse } = await axios.put(
      `/api/admin/products/${productData.id}`,
      {
        name: productData.name,
        price: productData.price,
        duration: productData.duration,
        description: productData.description,
        type: productData.type,
      },
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
