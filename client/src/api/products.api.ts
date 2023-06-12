import $api from ".";

export const fetchProducts = async (filters: any) => {
  const { queryString } = filters;
  const params: any = {};

  if (queryString) {
    params['q'] = queryString;
  }
  if (filters.filters) {
    // params['filters'] = filters.filters;
    params['min'] = filters.filters.price?.min;
    params['max'] = filters.filters.price?.max;
    params['category'] = filters.filters.category;
    params['additionalFields'] = filters.filters.additionalFields;
  }
  if (filters?.pagination) {
    params['page'] = filters.pagination.page;
    params['limit'] = filters.pagination.limit;
  }

  const response = await $api.get('/products', { params });

  return response.data;
}

export const fetchFavoriteProducts = async () => {
  const response = await $api.get('/favorite-products');

  return response.data;
}
