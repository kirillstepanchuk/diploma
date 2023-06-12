import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import $api from "../api";
import ProductItem from "../components/ProductItem";

const FavoriteProducts = () => {
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    $api.get('/favorite-products').then((products) => {
      setProducts(products.data);
      setLoading(false);
    }, () => {
      setLoading(false);
    })
  }, [])

  if (loading) {
    return (
      <LinearProgress/>
    )
  }

  return (
    <Container component="main" maxWidth="lg" sx={{mt: 5}}>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
        {products?.length ? products.map((product: any) => (<ProductItem key={product._id} product={product} />)) : null}
      {/* </Grid> */}
    </Container>
  )
}

export default FavoriteProducts;
