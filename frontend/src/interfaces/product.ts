export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}

export interface ProductRequest {
  name: string;
  price: number;
  description: string;
  isAdmin?: boolean;
} 
