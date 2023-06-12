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
    console.log('e: ', e);
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
    // yield call(deleteCookie, COOKIES.token);
    yield call(deleteUserCookies)
    console.log(1);
    // yield put(push('/login'));
    yield call(action.payload.navigate, '/login');

    // history.push('/login')
    // yield put(push(ROUTE_PAGES.checkEmail));
  } catch (e: any) {
    console.log('e: ', e);
    yield call(deleteUserCookies);
    // yield put(signupUserError(e.response?.data?.message));
  }
  // yield call(deleteUserCookies);
  // yield put(push(ROUTE_PAGES.main));
}

export function* checkIsAuth(): SagaIterator<void> {
  try {
    const data: any = yield call(
      fetchIsAuth
    );
    yield call(setCookie, COOKIES.token, data.accessToken);
    // yield call(localStorage.setItem, 'token', data.accessToken);
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
