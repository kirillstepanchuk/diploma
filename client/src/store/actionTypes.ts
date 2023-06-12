export enum AuthorizeActionTypes {
  AUTHORIZE_USER = 'AUTHORIZE_USER',
  AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS',
  AUTHORIZE_USER_ERROR = 'AUTHORIZE_USER_ERROR',
}

export enum CheckIsAuthActionTypes {
  CHECK_IS_AUTH = 'CHECK_IS_AUTH',
  CHECK_IS_AUTH_SUCCESS = 'CHECK_IS_AUTH_SUCCESS',
  CHECK_IS_AUTH_ERROR = 'CHECK_IS_AUTH_ERROR',
}

export enum RegisterActionTypes {
  REGISTER_USER = 'REGISTER_USER',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
}

export enum GetCurrentUserActionTypes {
  GET_CURRENT_USER = 'GET_CURRENT_USER',
  GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR',
}

export enum EditUserActionTypes {
  EDIT_USER_DATA = 'EDIT_USER_DATA',
  EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
  EDIT_USER_ERROR = 'EDIT_USER_ERROR',
}

export enum ConfirmUserActionTypes {
  CONFIRM_USER = 'CONFIRM_USER',
  CONFIRM_USER_SUCCESS = 'CONFIRM_USER_SUCCESS',
  CONFIRM_USER_ERROR = 'CONFIRM_USER_ERROR',
}

export enum LogoutActionType {
  LOGOUT_USER = 'LOGOUT_USER',
}

export enum CreateProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR',
}

export enum EditProductActionTypes {
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
  EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR',
}

export enum GetProductActionTypes {
  GET_PRODUCT = 'GET_PRODUCT',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR',
}

export enum GetProductsActionTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
}

export enum GetAdminProductsActionTypes {
  GET_ADMIN_PRODUCTS = 'GET_ADMIN_PRODUCTS',
  GET_ADMIN_PRODUCTS_SUCCESS = 'GET_ADMIN_PRODUCTS_SUCCESS',
  GET_ADMIN_PRODUCTS_ERROR = 'GET_ADMIN_PRODUCTS_ERROR',
}

export enum ApproveProductActionTypes {
  APPROVE_PRODUCT = 'APPROVE_PRODUCT',
  APPROVE_PRODUCT_SUCCESS = 'APPROVE_PRODUCT_SUCCESS',
  APPROVE_PRODUCT_ERROR = 'APPROVE_PRODUCT_ERROR',
}

export enum DeleteProductActionTypes {
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR',
}

export enum SetFavoriteProductsActionTypes {
  SET_FAVORITE_PRODUCTS = 'SET_FAVORITE_PRODUCTS',
}
