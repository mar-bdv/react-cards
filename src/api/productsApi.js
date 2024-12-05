const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/kitchen-accessories`);
    const data = await response.json();
    return data.products; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (response.ok) {
      const product = await response.json();
      return product;
    } else {
      console.warn(`Product with id ${id} not found in API.`);
    }
  } catch (error) {
    console.error(`Error fetching product from API with id ${id}:`, error);
  }

  const localProducts = JSON.parse(localStorage.getItem("products")) || [];
  const localProduct = localProducts.find((product) => product.id === id);

  if (localProduct) {
    return localProduct;
  }

  return null;
};