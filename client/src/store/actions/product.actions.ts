import { NavigateFunction } from "react-router";
import { CreateProductActionTypes, GetProductActionTypes, EditProductActionTypes } from "../actionTypes";

export interface GetProductAction {
  type: GetProductActionTypes.GET_PRODUCT,
  payload: any,
}
interface GetProductSuccessAction {
  type: GetProductActionTypes.GET_PRODUCT_SUCCESS,
  payload: any,
}
interface GetProductErrorAction {
  type: GetProductActionTypes.GET_PRODUCT_ERROR,
  payload: string,
}
export type GetProductActions =
  GetProductAction | GetProductSuccessAction | GetProductErrorAction;

export interface CreateProductAction {
  type: CreateProductActionTypes.CREATE_PRODUCT,
  payload: any,
}
interface CreateProductSuccessAction {
  type: CreateProductActionTypes.CREATE_PRODUCT_SUCCESS,
  payload: any,
}
interface CreateProductErrorAction {
  type: CreateProductActionTypes.CREATE_PRODUCT_ERROR,
  payload: string,
}
export type CreateProductActions =
  CreateProductAction | CreateProductSuccessAction | CreateProductErrorAction;

export interface EditProductAction {
  type: EditProductActionTypes.EDIT_PRODUCT,
  payload: any,
}
interface EditProductSuccessAction {
  type: EditProductActionTypes.EDIT_PRODUCT_SUCCESS,
  payload: any,
}
interface EditProductErrorAction {
  type: EditProductActionTypes.EDIT_PRODUCT_ERROR,
  payload: string,
}
export type EditProductActions =
  EditProductAction | EditProductSuccessAction | EditProductErrorAction;

export const getProduct = (user: any): GetProductAction => ({
  type: GetProductActionTypes.GET_PRODUCT,
  payload: user,
});
export const getProductSuccess = (data: any): GetProductSuccessAction => ({
  type: GetProductActionTypes.GET_PRODUCT_SUCCESS,
  payload: data,
});
export const getProductError = (error: string): GetProductErrorAction => ({
  type: GetProductActionTypes.GET_PRODUCT_ERROR,
  payload: error,
});

export const editProduct = (id:string, data: any, navigate: NavigateFunction): EditProductAction => ({
  type: EditProductActionTypes.EDIT_PRODUCT,
  payload: {
    id,
    data,
    navigate,
  },
});
export const editProductSuccess = (data: any): EditProductSuccessAction => ({
  type: EditProductActionTypes.EDIT_PRODUCT_SUCCESS,
  payload: data,
});
export const editProductError = (error: string): EditProductErrorAction => ({
  type: EditProductActionTypes.EDIT_PRODUCT_ERROR,
  payload: error,
});

export const createProduct = (formData: any, navigate: any): CreateProductAction => ({
  type: CreateProductActionTypes.CREATE_PRODUCT,
  payload: {
    formData,
    navigate,
  },
});
export const createProductSuccess = (data: any): CreateProductSuccessAction => ({
  type: CreateProductActionTypes.CREATE_PRODUCT_SUCCESS,
  payload: data,
});
export const createProductError = (error: string): CreateProductErrorAction => ({
  type: CreateProductActionTypes.CREATE_PRODUCT_ERROR,
  payload: error,
});