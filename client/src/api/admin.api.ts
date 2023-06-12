import $api from ".";

export const fetchProducts = async () => {
  const response = await $api.get('/admin/products');

  return response.data;
}

export const fetchApproveProduct = async (id: string) => {
  console.log('id: ', id);
  const response = await $api.post(`/approve-product/${id}`);

  return response.data;
}

export const fetchDeleteProduct = async (id: string) => {
  const response = await $api.delete(`/product/${id}`);

  return response.data;
}
