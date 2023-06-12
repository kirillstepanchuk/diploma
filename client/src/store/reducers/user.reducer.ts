import { AuthrorizeUserActions, CheckIsAuthActions, GetCurrentUserActions, LogoutActions, RegisterUserActions } from "../actions/auth.actions";
import { SetFavoriteProductsAcions } from "../actions/products.actions";
import { AuthorizeActionTypes, CheckIsAuthActionTypes, LogoutActionType, SetFavoriteProductsActionTypes } from "../actionTypes";

export interface UserState {
  data: any | null,
  error: string | null,
  loading: boolean,
  isAuth: boolean | null,
}

export const initialState: UserState = {
  data: null,
  error: null,
  loading: false,
  isAuth: null,
};

type UserActionTypes = AuthrorizeUserActions
| RegisterUserActions
| GetCurrentUserActions
| LogoutActions
| CheckIsAuthActions
| SetFavoriteProductsAcions

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case AuthorizeActionTypes.AUTHORIZE_USER:
      return {
        ...state,
        error: null,
        data: null,
        isAuth: false,
        loading: true,
      }
    case AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        isAuth: true,
      }
    case AuthorizeActionTypes.AUTHORIZE_USER_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        isAuth: false,
        error: action.payload,
      }
    case CheckIsAuthActionTypes.CHECK_IS_AUTH:
      return {
        ...state,
        isAuth: null,
      };
    case CheckIsAuthActionTypes.CHECK_IS_AUTH_ERROR:
      return {
        ...state,
        isAuth: false,
      };
    case CheckIsAuthActionTypes.CHECK_IS_AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case LogoutActionType.LOGOUT_USER:
      return initialState;
    case SetFavoriteProductsActionTypes.SET_FAVORITE_PRODUCTS:
      return {
        ...state,
        data: {
          ...state?.data,
          user: {
            ...state?.data?.user,
            favoriteProducts: action?.payload?.productsIds || null
          }
        }
      }
    default:
      return state;
  }
}

export default userReducer;
