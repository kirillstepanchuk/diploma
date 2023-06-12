import $api from ".";

export const fetchCreateProduct = async (productData: FormData) => {
  const response = await $api.post('/add-product', productData);

  return response.data;
}

export const fetchEditProduct = async (id: string, productData: FormData) => {
  console.log('id: ', id);
  const response = await $api.put(`/product/${id}`, productData);

  return response.data;
}

export const fetchProduct = async (id: string) => {
  const response = await $api.get(`/product/${id}`);

  return response.data;
}

