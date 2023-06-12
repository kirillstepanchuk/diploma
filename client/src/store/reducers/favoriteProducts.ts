import { SetFavoriteProductsAcions } from "../actions/products.actions";
import { SetFavoriteProductsActionTypes } from "../actionTypes";

export interface ProductState {
  data: any | null,
  productsIds: string[] | null,
  total: number | null,
}

export const initialState: ProductState = {
  data: null,
  productsIds: null,
  total: null,
};

type FavoriteProductsActionTypes = SetFavoriteProductsAcions;

const favoriteProductsReducer = (state = initialState, action: FavoriteProductsActionTypes): ProductState => {
  switch(action.type) {
    case SetFavoriteProductsActionTypes.SET_FAVORITE_PRODUCTS:
      return {
        ...state,
        data: action?.payload?.data || null,
        productsIds: action?.payload?.productsIds || null,
        total: action?.payload?.total || null,
      }
    default:
      return state;
  }
}

export default favoriteProductsReducer;
