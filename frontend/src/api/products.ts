export async function fetchProducts() {
  const response = await fetch(`/api/products`);
  const products = await response.json();
  return products;
}

export default fetchProducts;
