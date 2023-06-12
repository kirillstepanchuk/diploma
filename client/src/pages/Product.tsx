import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link as RouterLink } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { getProduct } from "../store/actions/product.actions";
import { selectProductState } from "../store/selectors/product.selectors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import $api from "../api";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Image from 'mui-image'
import { selectIsUserAdmin, selectUserState } from "../store/selectors/auth.selectors";
import { setFavoriteProducts } from "../store/actions/products.actions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const isCurrentUserOwner = (userData: any, productOwnerId: string): boolean => {
  return userData?.id === productOwnerId;
}

const Product = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useSelector(selectProductState);
  const userState = useSelector(selectUserState);
  const [isFavorite, setIsFavorite] = useState<boolean>(userState?.data?.user?.favoriteProducts?.includes(id) || false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(userState?.data?.user?.favoriteProducts?.includes(id) || false)
  }, [userState?.data?.user?.favoriteProducts, id])

  const onFavoriteButtonClick = () => {
    setIsLoading(true);
    $api.post('/switch-favorite-product', { id }).then((user) => {
      setIsFavorite((prev) => !prev);
      setIsLoading(false);
      dispatch(setFavoriteProducts({
        productsIds: user?.data?.favoriteProducts,
        total: user?.data?.favoriteProducts?.length,
      }))
    }, () => {
      setIsLoading(false);
    })
  } 

  const isAdmin = useSelector(selectIsUserAdmin);

  const [fields, setFields] = useState<any[] | null>(null);

  useEffect(() => {
    dispatch(getProduct(id))
  }, [ dispatch, id ])

  useEffect(() => {
    $api.get(`/categories`).then((res) => {
      setFields(res.data);
    }, (err) => { })
  }, []);

  const getCategoryInfo = (category: string) => {
    return fields?.find((field) => field.sysname === category);
  }

  const onDeleteButtonClick = () => {
    $api.delete(`/product/${id}`).then((res) => {
      dispatch(setFavoriteProducts({
        productsIds: res?.data?.favoriteProducts,
        total: res?.data?.favoriteProducts?.length,
      }))
      navigate('/');
    }, (err) => { })
  }

  if (loading) {
    return (
      <LinearProgress/>
    )
  }
  if (!data) {
    return null;
  }
  return (
    <Container component="main" maxWidth="lg" sx={{mt: 5}}>
      <Grid container spacing={md ? 2 : 4}>
        <Grid item xs={md ? 12 : 8}>
          {data?.imageFileName ?
          <Image
            src={`${process.env.REACT_APP_IMAGE_URL}/${data?.imageFileName}`}
            fit={'scale-down'}
            height={500} 
          />: null}
        </Grid>
        <Grid item xs={md ? 12 : 4}>
          {
            userState.isAuth ? (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <IconButton onClick={onFavoriteButtonClick} disabled={isLoading} aria-label="add to favorites">
                  { isFavorite ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/> }
                </IconButton>
                {
                  isCurrentUserOwner(userState?.data?.user, data?.author!) || isAdmin ? (
                    <><Link component={RouterLink} to={`/edit-product/${id}`} color="inherit" sx={{ mr: 3, ml: 3 }}>
                      <IconButton
                        edge="end"
                        aria-label="edit"

                      >
                        <EditIcon />
                      </IconButton>
                    </Link><IconButton
                      aria-label="edit"
                      onClick={onDeleteButtonClick}
                    >
                        <DeleteIcon />
                      </IconButton></>
                  ) : null
                }
                
              </Box>
            ) : null
          }
          
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                О продавце
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BadgeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Имя"
                secondary={data?.sellerName || 'Не указано'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Номер телефона"
                secondary={data?.sellerPhoneNumber || 'Не указано'}
              />
            </ListItem>
          </List>
          <Button fullWidth component={RouterLink} to={`tel:${data?.sellerPhoneNumber}`} variant="outlined" startIcon={<LocalPhoneIcon />}>
            Позвонить
          </Button>
        </Grid>

        <Grid item>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                О товаре
              </ListSubheader>
            }
          >
            <ListItem
            >
              <ListItemAvatar>
                <Avatar>
                  <SubtitlesIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Название товара"
                secondary={data?.title || 'Не указано'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalOfferIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Цена"
                secondary={data?.price ? `BYN ${data?.price?.toFixed(2)}` : 'Не указано'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Описание"
                secondary={data?.description || 'Не указано'}
              />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Дополнительная информация
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText
                primary="Категория"
                secondary={data?.category ? getCategoryInfo(data?.category)?.name : 'Не указана'}
              />
            </ListItem>

            {
              getCategoryInfo(data?.category)
                ? getCategoryInfo(data?.category).fields.map((field: any) => 
                <ListItem key={field.sysname}>
                  <ListItemText
                    primary={field.name}
                    secondary={field.values.find((val: any) => val.value === data?.additionalFields[field?.sysname])?.name || "Не указано"}
                  />
                </ListItem>) : null
            }
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Product;