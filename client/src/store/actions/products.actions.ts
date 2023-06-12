import { GetProductsActionTypes, SetFavoriteProductsActionTypes } from "../actionTypes";

export interface GetProductsAction {
  type: GetProductsActionTypes.GET_PRODUCTS,
  payload: any,
}
interface GetProductsSuccessAction {
  type: GetProductsActionTypes.GET_PRODUCTS_SUCCESS,
  payload: any,
}
interface GetProductsErrorAction {
  type: GetProductsActionTypes.GET_PRODUCTS_ERROR,
  payload: string,
}
export type GetProductsActions =
  GetProductsAction | GetProductsSuccessAction | GetProductsErrorAction;

// favorite porducts
export interface SetFavoriteProductsAcion {
  type: SetFavoriteProductsActionTypes.SET_FAVORITE_PRODUCTS,
  payload: any,
}
export type SetFavoriteProductsAcions = SetFavoriteProductsAcion;

export const getProducts = (user: any): GetProductsAction => ({
  type: GetProductsActionTypes.GET_PRODUCTS,
  payload: user,
});
export const getProductsSuccess = (data: any): GetProductsSuccessAction => ({
  type: GetProductsActionTypes.GET_PRODUCTS_SUCCESS,
  payload: data,
});
export const getProductsError = (error: string): GetProductsErrorAction => ({
  type: GetProductsActionTypes.GET_PRODUCTS_ERROR,
  payload: error,
});

export const setFavoriteProducts = (data: any): SetFavoriteProductsAcion => ({
  type: SetFavoriteProductsActionTypes.SET_FAVORITE_PRODUCTS,
  payload: data,
});
