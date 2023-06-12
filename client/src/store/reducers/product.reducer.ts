import { CreateProductActions, EditProductActions, GetProductActions } from "../actions/product.actions";
import { CreateProductActionTypes, EditProductActionTypes, GetProductActionTypes } from "../actionTypes";

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

type ProductActionTypes = CreateProductActions | EditProductActions | GetProductActions;

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch(action.type) {
    case CreateProductActionTypes.CREATE_PRODUCT:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      }
    case CreateProductActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }
    case CreateProductActionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      }
    case EditProductActionTypes.EDIT_PRODUCT:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      }
    case EditProductActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }
    case EditProductActionTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      }
    case GetProductActionTypes.GET_PRODUCT:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      }
    case GetProductActionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }
    case GetProductActionTypes.GET_PRODUCT_ERROR:
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

export default productReducer;
