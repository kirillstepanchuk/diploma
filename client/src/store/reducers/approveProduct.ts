import { ApproveProductActions } from "../actions/admin.actions";
import { ApproveProductActionTypes } from "../actionTypes";

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

type ApproveProductActionType = ApproveProductActions;

const approveProductReducer = (state = initialState, action: ApproveProductActionType): ProductState => {
  switch(action.type) {
    case ApproveProductActionTypes.APPROVE_PRODUCT:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: true,
      }
    case ApproveProductActionTypes.APPROVE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: null,
        error: null,
        loading: false,
      }
    case ApproveProductActionTypes.APPROVE_PRODUCT_ERROR:
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

export default approveProductReducer;
