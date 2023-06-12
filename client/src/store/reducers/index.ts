import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import userReducer from './user.reducer';
import productReducer from './product.reducer';
import productsReducer from './products.reducer';
import adminProductsReducer from './adminProducts';
import approveProductReducer from './approveProduct';
import deleteProductReducer from './deleteProduct';
import favoriteProductsReducer from './favoriteProducts';

export const history = createBrowserHistory();

const root = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  product: productReducer,
  products: productsReducer,
  adminProducts: adminProductsReducer,
  approveProduct: approveProductReducer,
  deleteProduct: deleteProductReducer,
  favoriteProducts: favoriteProductsReducer,
});

export type RootState = ReturnType<typeof root>;

export default root;