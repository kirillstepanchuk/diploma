import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../store/selectors/auth.selectors';
import { logoutUser } from '../store/actions/auth.actions';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { Add } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { selectFavoriteProductsState } from '../store/selectors/favoriteProducts.selectors';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const userState = useSelector(selectUserState);
  const favoriteProductsState = useSelector(selectFavoriteProductsState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onAdminPanelButtonClick = () => {
    navigate('/admin-panel')
    handleClose();
  };

  const onProfileButtonClick = () => {
    navigate('/profile')
    handleClose();
  };

  const onLogoutButtonClick = () => {
    dispatch(logoutUser({navigate}));
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link component={RouterLink} to="/" color="inherit">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Товары
          </Typography>
          {!userState.isAuth && (
            <>
              {/* <Link component={RouterLink} to="/login" color="inherit">
                Войти
              </Link>

              <Link component={RouterLink} to="/register" color="inherit" sx={{ml: 1}}>
                Зарегистрироваться
              </Link> */}

              <Button color="inherit" component={RouterLink} to="/login">
                Вход / Регистрация
              </Button>
            </>
          )}
          {userState.isAuth && (
            <div>
              <Link component={RouterLink} to="/add-product" color="inherit">
                <IconButton
                  size="large"
                  aria-label="add item"
                  aria-controls="add-item"
                  aria-haspopup="false"
                  color="inherit"
                >
                  <Add />
                </IconButton>
              </Link>
              <Link component={RouterLink} to="/favorite-products" color="inherit">
                <IconButton
                  size="large"
                  aria-label="favorite"
                  aria-controls="favorite"
                  aria-haspopup="false"
                  color="inherit"
                >
                  <Badge badgeContent={favoriteProductsState?.total} color="secondary" max={99}>
                    <FavoriteBorderIcon />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userState?.data?.user?.roles?.includes("ADMIN") ? <MenuItem onClick={onAdminPanelButtonClick}>Админ-панель</MenuItem> : null}
                <MenuItem onClick={onProfileButtonClick}>Профиль</MenuItem>
                <MenuItem onClick={onLogoutButtonClick}>Выйти</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
