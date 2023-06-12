import { RootState } from '../reducers';

export const selectUserState = (state: RootState) => state.user;

export const selectIsUserAdmin = (state: RootState) => state.user?.data?.user?.roles?.includes('ADMIN') || false;

