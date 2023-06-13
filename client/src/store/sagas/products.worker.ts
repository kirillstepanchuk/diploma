import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { fetchProducts } from "../../api/products.api";
import { getProductsError, getProductsSuccess } from "../actions/products.actions";
import { GetProductsActionTypes } from "../actionTypes";

export function* getProducts(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchProducts, action.payload);

    yield put(getProductsSuccess(data));
  } catch (e: any) {
    yield put(getProductsError(e.response?.data?.message));
  }
}

export default function* productsWatcher() {
  yield takeEvery(GetProductsActionTypes.GET_PRODUCTS, getProducts);
}