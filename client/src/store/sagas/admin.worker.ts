import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { fetchApproveProduct, fetchDeleteProduct, fetchProducts } from "../../api/admin.api";
import { approveProductError, approveProductSuccess, deleteProductError, deleteProductSuccess, getAdminProductsError, getAdminProductsSuccess } from "../actions/admin.actions";
import { ApproveProductActionTypes, DeleteProductActionTypes, GetAdminProductsActionTypes } from "../actionTypes";

export function* getAdminProducts(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchProducts);

    yield put(getAdminProductsSuccess(data));
  } catch (e: any) {
    yield put(getAdminProductsError(e.response?.data?.message));
  }
}

export function* approveProduct(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchApproveProduct, action.payload.id);

    yield put(approveProductSuccess(data));
    yield call(action.payload.onProductApproved);
  } catch (e: any) {
    yield put(approveProductError(e.response?.data?.message));
  }
}

export function* deleteProduct(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchDeleteProduct, action.payload.id);

    yield put(deleteProductSuccess(data));
    yield call(action.payload.onProductDeleted);
  } catch (e: any) {
    yield put(deleteProductError(e.response?.data?.message));
  }
}

export default function* adminWatcher() {
  yield takeEvery(GetAdminProductsActionTypes.GET_ADMIN_PRODUCTS, getAdminProducts);
  yield takeEvery(ApproveProductActionTypes.APPROVE_PRODUCT, approveProduct);
  yield takeEvery(DeleteProductActionTypes.DELETE_PRODUCT, deleteProduct);
}