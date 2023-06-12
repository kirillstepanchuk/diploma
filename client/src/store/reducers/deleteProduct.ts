import { DeleteProductActions } from "../actions/admin.actions";
import { DeleteProductActionTypes } from "../actionTypes";

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

type DeleteProductActionType = DeleteProductActions;

const deleteProductReducer = (state = initialState, action: DeleteProductActionType): ProductState => {
  switch(action.type) {
    case DeleteProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: true,
      }
    case DeleteProductActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: null,
        error: null,
        loading: false,
      }
    case DeleteProductActionTypes.DELETE_PRODUCT_ERROR:
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

export default deleteProductReducer;
