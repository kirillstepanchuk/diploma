import { ApproveProductActionTypes, DeleteProductActionTypes, GetAdminProductsActionTypes } from "../actionTypes";

// Get products for admin's panel
export interface GetAdminProductsAction {
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS,
  payload: any,
}
interface GetAdminProductsSuccessAction {
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_SUCCESS,
  payload: any,
}
interface GetAdminProductsErrorAction {
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_ERROR,
  payload: string,
}
export type GetAdminProductsActions =
GetAdminProductsAction | GetAdminProductsSuccessAction | GetAdminProductsErrorAction;

// Approve product
export interface ApproveProductAction {
  type: ApproveProductActionTypes.APPROVE_PRODUCT,
  payload: any,
}
interface ApproveProductSuccessAction {
  type: ApproveProductActionTypes.APPROVE_PRODUCT_SUCCESS,
  payload: any,
}
interface ApproveProductErrorAction {
  type: ApproveProductActionTypes.APPROVE_PRODUCT_ERROR,
  payload: string,
}
export type ApproveProductActions =
ApproveProductAction | ApproveProductSuccessAction | ApproveProductErrorAction;

// Delete product
export interface DeleteProductAction {
  type: DeleteProductActionTypes.DELETE_PRODUCT,
  payload: any,
}
interface DeleteProductSuccessAction {
  type: DeleteProductActionTypes.DELETE_PRODUCT_SUCCESS,
  payload: any,
}
interface DeleteProductErrorAction {
  type: DeleteProductActionTypes.DELETE_PRODUCT_ERROR,
  payload: string,
}
export type DeleteProductActions =
DeleteProductAction | DeleteProductSuccessAction | DeleteProductErrorAction;

export const getAdminProducts = (user: any): GetAdminProductsAction => ({
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS,
  payload: user,
});
export const getAdminProductsSuccess = (data: any): GetAdminProductsSuccessAction => ({
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_SUCCESS,
  payload: data,
});
export const getAdminProductsError = (error: string): GetAdminProductsErrorAction => ({
  type: GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS_ERROR,
  payload: error,
});

export const approveProduct = (id: any, onProductApproved: () => void): ApproveProductAction => ({
  type: ApproveProductActionTypes.APPROVE_PRODUCT,
  payload: {
    id,
    onProductApproved,
  },
});
export const approveProductSuccess = (data: any): ApproveProductSuccessAction => ({
  type: ApproveProductActionTypes.APPROVE_PRODUCT_SUCCESS,
  payload: data,
});
export const approveProductError = (error: string): ApproveProductErrorAction => ({
  type: ApproveProductActionTypes.APPROVE_PRODUCT_ERROR,
  payload: error,
});

export const deleteProduct = (id: any, onProductDeleted: () => void): DeleteProductAction => ({
  type: DeleteProductActionTypes.DELETE_PRODUCT,
  payload: {
    id,
    onProductDeleted,
  },
});
export const deleteProductSuccess = (data: any): DeleteProductSuccessAction => ({
  type: DeleteProductActionTypes.DELETE_PRODUCT_SUCCESS,
  payload: data,
});
export const deleteProductError = (error: string): DeleteProductErrorAction => ({
  type: DeleteProductActionTypes.DELETE_PRODUCT_ERROR,
  payload: error,
});
