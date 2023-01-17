import axios from 'axios';

export async function fetchProducts() {
  const response = await axios.get(`/api/products`);
  return response.data.allProducts;
}

// export async function fetchProducts() {
//   const request = await fetch(`/api/products`);
//   const responseFetch = await request.json()
//   return responseFetch;
// }

export default fetchProducts;
