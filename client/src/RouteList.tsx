import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './pages/Login';
import SignUp from './pages/Registration';
import AddItem from './pages/AddItem';
import Products from './pages/Products';
import Product from './pages/Product';
import Profile from './pages/Profile';
import EditProduct from './pages/EditProduct';
import AdminPanel from './pages/AdminPanel';
import EditProfile from './pages/EditProfile';
import FavoriteProducts from './pages/FavoriteProducts';
import { useSelector } from 'react-redux';
import { selectIsUserAdmin, selectUserState } from './store/selectors/auth.selectors';
import GuardedRoute from './guards/GuardedRoute';

const RouteList = () => {
  const { isAuth } = useSelector(selectUserState);
  const isAdmin = useSelector(selectIsUserAdmin);

  return (
    <Routes>
      {/* Routes for all users */}
      <Route path="/" element={ <Products /> } />
      <Route path="/product/:id" element={ <Product /> } />
      {/* Routes only for auth users */}
      <Route element={<GuardedRoute isRouteAccessible={isAuth} redirectRoute={'/login'}/>}>
        <Route path="/favorite-products" element={ <FavoriteProducts /> } />
        <Route path="/edit-profile" element={ <EditProfile /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/add-product" element={ <AddItem /> } />
        <Route path="/edit-product/:id" element={ <EditProduct /> } />
        {/* Routes only for admin */}
        <Route element={<GuardedRoute isRouteAccessible={isAdmin} redirectRoute={'/'}/>}>
          <Route path="/admin-panel" element={ <AdminPanel /> } />
        </Route>
      </Route>
      {/* Routes only for unauth users */}
      <Route element={<GuardedRoute isRouteAccessible={!isAuth} redirectRoute={'/'}/>}>
        <Route path="/login" element={ <SignIn /> } />
        <Route path="/register" element={ <SignUp /> } />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default RouteList;