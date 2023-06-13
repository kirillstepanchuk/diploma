import { SagaIterator } from "redux-saga";
import { put, call, takeEvery } from 'redux-saga/effects';

import { fetchAuthorization, fetchIsAuth, fetchLogout, fetchRegistration } from "../../api/auth.api";
import { COOKIES } from "../../constants";
import { deleteCookie, setCookie } from "../../utils/cookiesUtils";
import { checkIsAuthFailed, checkIsAuthSuccess, loginUserError, loginUserSuccess, signupUserError, signupUserSuccess } from "../actions/auth.actions";
import { setFavoriteProducts } from "../actions/products.actions";
import { AuthorizeActionTypes, CheckIsAuthActionTypes, LogoutActionType, RegisterActionTypes } from "../actionTypes";

const deleteUserCookies = () => {
  deleteCookie(COOKIES.user);
  deleteCookie(COOKIES.token);
};

export function* authorizeUser(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(
      fetchAuthorization,
      action.payload,
    );
    yield call(setCookie, COOKIES.token, data.accessToken);
    // yield call(localStorage.setItem, 'token', data.accessToken);
    localStorage.setItem('token', data.accessToken)

    
    yield put(loginUserSuccess(data));
    yield put(setFavoriteProducts({
      productsIds: data?.user?.favoriteProducts,
      total: data?.user?.favoriteProducts?.length,
    }));
    yield call(action.payload.navigate, '/');

    // yield call(setCookie, COOKIES.user, data.userId);
    // yield put(push(ROUTE_PAGES.main));
  } catch (e:any) {
    const errorMessage = e.response?.data?.message || 'Неопознанная ошибка';
    yield call(action.payload.enqueueSnackbar, errorMessage, { variant: "error"});
    yield put(loginUserError(errorMessage));
  }
}

export function* registerUser(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchRegistration, action.payload);
    yield put(signupUserSuccess(data));
  } catch (e: any) {
    yield put(signupUserError(e.response?.data?.message));
  }
}

export function* logoutUser(action: any): SagaIterator<void> {
  try {
    yield call(fetchLogout);
    yield call(deleteUserCookies);
    yield call(action.payload.navigate, '/login');
  } catch (e: any) {
    yield call(deleteUserCookies);
  }
}

export function* checkIsAuth(action: any): SagaIterator<void> {
  try {
    const data: any = yield call(fetchIsAuth);
    console.log('data?.user: ', data?.user);
    if (data?.user?.isBlocked) {
      yield call(fetchLogout);
      yield call(deleteUserCookies);
      yield call(action.payload.navigate, '/login');

      return;
    }
    yield call(setCookie, COOKIES.token, data.accessToken);
    localStorage.setItem('token', data.accessToken)
    yield put(checkIsAuthSuccess());
    yield put(loginUserSuccess(data));
    yield put(setFavoriteProducts({
      productsIds: data?.user?.favoriteProducts,
      total: data?.user?.favoriteProducts?.length,
    }));
  } catch (e: any) {
    yield call(deleteUserCookies);
    yield put(checkIsAuthFailed());
  }
}

export default function* authorizationWatcher() {
  yield takeEvery(LogoutActionType.LOGOUT_USER, logoutUser);
  yield takeEvery(AuthorizeActionTypes.AUTHORIZE_USER, authorizeUser);
  yield takeEvery(RegisterActionTypes.REGISTER_USER, registerUser);
  yield takeEvery(CheckIsAuthActionTypes.CHECK_IS_AUTH, checkIsAuth);
}
