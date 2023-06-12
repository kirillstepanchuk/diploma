import { GetAdminProductsActions } from "../actions/admin.actions";
import { GetAdminProductsActionTypes } from "../actionTypes";

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

type AdminProductsActionTypes = GetAdminProductsActions;

const adminProductsReducer = (state = initialState, action: AdminProductsActionTypes): ProductState => {
  switch(action.type) {
    case GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      }
    case GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }
    case GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_ERROR:
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

export default adminProductsReducer;
