import { GetProductsActions } from "../actions/products.actions";
import { GetProductsActionTypes } from "../actionTypes";

export interface ProductState {
  data: any | null,
  error: string | null,
  loading: boolean,
}

export const initialState: ProductState = {
  data: null,
  error: null,
  loading: false,
};

type ProductsActionTypes = GetProductsActions;

const productsReducer = (state = initialState, action: ProductsActionTypes): ProductState => {
  switch(action.type) {
    case GetProductsActionTypes.GET_PRODUCTS:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      }
    case GetProductsActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }
    case GetProductsActionTypes.GET_PRODUCTS_ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default productsReducer;
