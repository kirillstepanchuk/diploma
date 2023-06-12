import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link as RouterLink } from 'react-router-dom';
import $api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteProducts } from "../store/actions/products.actions";
import { selectUserState } from "../store/selectors/auth.selectors";
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import CardActionArea from "@mui/material/CardActionArea";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
dayjs.locale('ru');

interface ProductItemProps {
  product: any;
}

const getTitle = (title: string): string => {
  if (title.length > 15) {
    const copy = title.slice(0, 15);
    return `${copy}...`
  }

  return title;
}

const getDescription = (description: string): string => {
  if (description.length > 70) {
    const copy = description.slice(0, 70);
    return `${copy}...`
  }

  return description;
}

const useStyles = makeStyles(({ palette }) => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
}));

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const styles = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const user = useSelector(selectUserState);

  const [isFavorite, setIsFavorite] = useState<boolean>(user?.data?.user?.favoriteProducts?.includes(product?._id) || false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(user?.data?.user?.favoriteProducts?.includes(product?._id) || false)
  }, [user?.data?.user?.favoriteProducts, product?._id])

  const onFavoriteButtonClick = () => {
    setIsLoading(true);
    $api.post('/switch-favorite-product', { id: product._id }).then((user) => {
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

  return (
    <Card sx={{ width: '100%', mt:2, display: 'flex', justifyContent: 'space-between' }}>
      <CardActionArea
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          // image={`http://localhost:3001/images/${product.imageFileName}`}
          image={`${process.env.REACT_APP_IMAGE_URL}/${product.imageFileName}`}
          alt="Live from space album cover"
        />
      
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant={md ? "body2" : "h5"} component="div">
              { md ? getTitle(product.title) : product.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {product.publicationDate ? dayjs(product.publicationDate).format('DD.MM.YYYY HH:mm') : null}
            </Typography>
            <span className={styles.subheader}>BYN {product.price?.toFixed(2)}</span>
            {
              !md ? (
                <Typography variant="body2" color="text.secondary">
                  {getDescription(product.description)}
                </Typography>
              ) : null
            }
            
        </CardContent>
      </CardActionArea>
      {
        user?.isAuth ? <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mr: 2}}>
        <IconButton onClick={onFavoriteButtonClick} disabled={isLoading} aria-label="add to favorites" sx={{ml: 'auto'}}>
          { isFavorite ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/> }
        </IconButton>
        {/* {JSON.stringify(user?.data?.user?.favoriteProducts)} */}
    </Box> : null
      }
        
    </Card>
  )
}

export default ProductItem;