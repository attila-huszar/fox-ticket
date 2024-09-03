import { useState, useEffect } from 'react'
import { fetchProducts } from '@api/products'
import { ProductResponse } from '@interfaces/product'
import { ProductCard } from './ProductCard'
import { AddProduct } from './AddProduct'

export function AdminProduct() {
  const [products, setProducts] = useState<ProductResponse[]>([])

  const addProduct = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct])
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProducts()
      setProducts(response)
    }
    void fetchData()
  }, [])

  return (
    <div>
      <p>Tickets and Passes</p>
      <AddProduct addProduct={addProduct} />
      <div id="shopCards">
        {products.map((product) => (
          <ProductCard
            removeProduct={(productId: number) =>
              setProducts(
                products.filter((product) => product.id !== productId),
              )
            }
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            duration={product.duration}
            description={product.description}
            type={product.type}
            isAdmin={true}
          />
        ))}
      </div>
    </div>
  )
}
