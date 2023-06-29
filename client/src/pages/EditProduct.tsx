import { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import InputMask from "react-input-mask";
import IconButton from "@mui/material/IconButton";
import { PhotoCamera } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// @ts-ignore
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { selectProductState } from "../store/selectors/product.selectors";
import { editProduct, getProduct } from "../store/actions/product.actions";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditDynamicForm from "../components/EditDynamicForm";
import $api from "../api";
import { useSnackbar } from "notistack";

const EditProduct = () => {
  const { data, loading } = useSelector(selectProductState);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string>(data?.title || '');
  const [description, setDescription] = useState<string>(data?.description || '');
  const [sellerName, setSellerName] = useState<string>(data?.sellerName || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(data?.sellerPhoneNumber || '');
  const [price, setPrice] = useState<string | null>(data?.price || null);

  const [category, setCategory] = useState<string>(data?.category || "none");
  const [fields, setFields] = useState<any[] | null>(null);
  const [categoryFields, setCategoryFields] = useState<any[] | null>(null);
  const [additionalFields, setAdditionalFields] = useState<any | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const changeCategoryFields = useCallback((newCategory: string) => {
    setCategory(newCategory as string);
    const catFields = fields?.find((field) => field.sysname === newCategory)?.fields;
    setCategoryFields(catFields || null);
  }, [fields])

  const onCategoryChange = (evt: SelectChangeEvent) => {
    changeCategoryFields(evt.target.value as string);
  }

  const onFieldChange = (fieldName: string, value: string) => {
    setAdditionalFields((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }))
  }

  useEffect(() => {
    $api.get(`/categories`).then((res) => {
      setFields(res.data);
    }, (err) => { })
  }, []);

  useEffect(() => {
    if (data) {

      setTitle(data?.title || '');
      setDescription(data?.description || '');
      setSellerName(data?.sellerName || '');
      setPhoneNumber(data?.sellerPhoneNumber || '');
      setPrice(data?.price || null);
      // setCategory(data?.category || "none");
      // onCategoryChange()
      changeCategoryFields(data?.category || "none")
      if (data?.additionalFields) {
        Object.entries<string>(data?.additionalFields).forEach((field: [string, string]) => {
          onFieldChange(field[0], field[1]);
        })
      }
      if (data?.imageFileName) {
        setImageUrl(`${process.env.REACT_APP_IMAGE_URL}/${data?.imageFileName}`);
      }
    }
  }, [data, changeCategoryFields])

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getProduct(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = async (evt: any) => {
    evt.preventDefault();

    if (!title) {
      return enqueueSnackbar('Заполните поле названия товара.', {variant: "error"});
    }

    if (!description) {
      return enqueueSnackbar('Заполните поле описания товара.', {variant: "error"});
    }

    if (!price) {
      return enqueueSnackbar('Заполните поле цены товара.', {variant: "error"});
    }

    if (!sellerName) {
      return enqueueSnackbar('Заполните поле имени продавца товара.', {variant: "error"});
    }

    if (!phoneNumber) {
      return enqueueSnackbar('Заполните поле телефон продавца товара.', {variant: "error"});
    }

    let formData = new FormData();
    formData.append('image', image!);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price!);
    formData.append('sellerName', sellerName);
    formData.append('sellerPhoneNumber', phoneNumber);
    formData.append('category', category);
    if (additionalFields) {
      formData.append('additionalFields', JSON.stringify(additionalFields));
    }

    dispatch(editProduct(id!, formData, navigate));

  }

  const onCloseClick = () => {
    setImage(null);
    setImageUrl(null);
  }

  const onChangePrice = (evt: any, value: string) => {
    setPrice(value)
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Typography component="h1" variant="h5" align="center" sx={{ ml: 3, mt: 1, width: '100%'  }}>О товаре</Typography>
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth startIcon={<PhotoCamera />}>
              Загрузить фото товара
              <input hidden accept="image/*" type="file" onChange={handleFileChange}/>
            </Button>
          </Grid>
          <Grid item xs={12}>
            {
              (imageUrl)
                ? 
                <ImageListItem>
              <img
                src={imageUrl!}
                srcSet={imageUrl!}
                alt={imageUrl}
                loading="lazy"
                />
              <ImageListItemBar
                title={''}
                actionIcon={
                  <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about`}
                  onClick={onCloseClick}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                />
            </ImageListItem> : null
            }
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              required
              fullWidth
              id="title"
              label="Название товара"
              autoFocus
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CurrencyTextField
              minimumValue={"0"}
              label="Цена"
              variant="outlined"
              value={price}
              fullWidth
              currencySymbol="BYN"
              outputFormat="string"
              onChange={onChangePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Описание"
              required
              multiline
              fullWidth
              rows={4}
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Категория</InputLabel>
            <Select
              defaultValue="none"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category!}
              label="Категория"
              
              onChange={onCategoryChange}
            >
              <MenuItem value={"none"}>Не выбрано</MenuItem>
              {fields?.map((value) => <MenuItem key={value._id} value={value.sysname}>{value.name}</MenuItem>)}
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={12}>
            <EditDynamicForm
              values={additionalFields}
              categoryFields={categoryFields}
              onFieldChange={onFieldChange} />
          </Grid>

          <Typography component="h1" variant="h5" align="center" sx={{ ml: 3, mt: 1, width: '100%' }}>О продавце</Typography>
          <Grid item xs={12}>
            <TextField
              id="seller-name"
              name="seller-name"
              label="Имя"
              required
              fullWidth
              value={sellerName}
              onChange={(evt) => setSellerName(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <FormControl variant="outlined">
              <Input
                id="phone-number"
                name="phone-number"
                required
                fullWidth
                value={phoneNumber}
                onChange={(evt) => setPhoneNumber(evt.target.value)}
                inputComponent={MaskedPhoneInput as any}
              />
            </FormControl> */}

            <InputMask
              mask="+375(99) 999 99 99"
              value={phoneNumber}
              onChange={(evt) => setPhoneNumber(evt.target.value)}
            >
              {/* @ts-ignore */} 
              {() => <TextField
                id="phone-number"
                name="phone-number"
                required
                fullWidth
                label="Номер телефона"
                variant="outlined" />}
            </InputMask>

          </Grid>
        </Grid>
        {
          !loading ? <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmit}
          >
            Редактировать товар
          </Button> : null
        }
        {
          loading ? <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >Редактирование товара</LoadingButton> : null
        }


      </Box>
    </Container>
  )
}

export default EditProduct;
