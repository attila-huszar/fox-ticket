export interface ProductResponse {
  id: number
  name: string
  type: string
  description: string
  duration: number
  price: number
}

export interface ProductRequest {
  id: number
  name: string
  type: string
  description: string
  duration: number
  price: number
  isAdmin?: boolean
  removeProduct?: (productId: number) => void
}
