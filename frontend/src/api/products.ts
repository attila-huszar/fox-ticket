import axios from 'axios';

export async function fetchProducts() {
  const response = await axios.get('/api/products');
  return response.data.allProducts;
}
