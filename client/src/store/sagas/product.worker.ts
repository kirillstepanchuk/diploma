
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { fetchCreateProduct, fetchEditProduct, fetchProduct } from "../../api/product.api";
import { createProductError, createProductSuccess, getProductError, getProductSuccess, editProductSuccess, editProductError } from "../actions/product.actions";
import { CreateProductActionTypes, EditProductActionTypes, GetProductActionTypes } from "../actionTypes";

export function* createProduct(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchCreateProduct, action.payload.formData);

    yield put(createProductSuccess(data));
    yield call(action.payload.navigate, `/product/${data.data.productId}`);
  } catch (e: any) {
    yield put(createProductError(e.response?.data?.message));
  }
}

export function* editProduct(action: any): SagaIterator<void> {
  console.log('action: ', action);
  try {
    const data: any = yield call(fetchEditProduct, action.payload.id, action.payload.data);
    console.log('data: ', data);

    yield put(editProductSuccess(data));
    yield call(action.payload.navigate, `/product/${data.data.productId}`);
  } catch (e: any) {
    yield put(editProductError(e.response?.data?.message));
  }
}

export function* getProduct(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchProduct, action.payload);

    yield put(getProductSuccess(data));
  } catch (e: any) {
    yield put(getProductError(e.response?.data?.message));
  }
}

export default function* productWatcher() {
  yield takeEvery(CreateProductActionTypes.CREATE_PRODUCT, createProduct);
  yield takeEvery(EditProductActionTypes.EDIT_PRODUCT, editProduct);
  yield takeEvery(GetProductActionTypes.GET_PRODUCT, getProduct);
}