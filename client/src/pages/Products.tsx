import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { selectProductsState } from "../store/selectors/products.selectors";
import { getProducts } from "../store/actions/products.actions";
import ProductItem from "../components/ProductItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from "../hooks/useDebounce";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PriceSlider from "../components/PriceSlider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import $api from "../api";
import DynamicForm from "../components/DynamicForm";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const LIMIT = 6;

const FILTERS = {
  currMin: null,
  currMax: null,
  category: "none",
  additionalFields: null,
}

const Products = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectProductsState);

  const [ searchText, setSearchText ] = useState<string>('');

  // filters
  const [currMin, setCurrMin] = useState<string | null>(null);
  const [currMax, setCurrMax] = useState<string | null>(null);

  const [category, setCategory] = useState<string>("none");
  const [fields, setFields] = useState<any[] | null>(null);
  const [categoryFields, setCategoryFields] = useState<any[] | null>(null);
  const [additionalFields, setAdditionalFields] = useState<any | null>(null);

  const debouncedSearchText = useDebounce<string>(searchText, 1000);

  const [aplleidFilters, setAppliedFilters] = useState<any>(FILTERS);

  useEffect(() => {
    $api.get(`/categories`).then((res) => {
      setFields(res.data);
    }, (err) => { })
  }, []);


  const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    dispatch(getProducts({
      queryString: debouncedSearchText,
      pagination: {
        page: value,
        limit: LIMIT,
      },
      filters: {
        price: {
          min: aplleidFilters.currMin,
          max: aplleidFilters.currMax,
        },
        category: aplleidFilters.category,
        additionalFields: aplleidFilters.additionalFields,
      },
    }))
  };

  useEffect(() => {
    setPage(1)
    dispatch(getProducts({
      queryString: debouncedSearchText,
      pagination: {
        page: 1,
        limit: LIMIT,
      },
      filters: {
        price: {
          min: aplleidFilters.currMin,
          max: aplleidFilters.currMax,
        },
        category: aplleidFilters.category,
        additionalFields: aplleidFilters.additionalFields,
      },
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, debouncedSearchText])

  const onApplyButtonClick = () => {
    setPage(1);
    setAppliedFilters({
      currMin,
      currMax,
      category,
      additionalFields,
    })
    dispatch(getProducts({
      queryString: debouncedSearchText,
      pagination: {
        page: 1,
        limit: LIMIT,
      },
      filters: {
        price: {
          min: currMin,
          max: currMax,
        },
        category,
        additionalFields,
      },
    }))
  }

  const changeCategory = (newCategory: string): void => {
    setCategory(newCategory);
    const catFields = fields?.find((field) => field.sysname === newCategory)?.fields;
    setCategoryFields(catFields || null);
  }

  const onCategoryChange = (evt: SelectChangeEvent) => {
    changeCategory(evt.target.value as string);
  }

  useEffect(() => {
    const addFields = categoryFields?.reduce((curr,categoryField) => {
      return {
        ...curr,
        [categoryField.sysname]: "none",
      }
    }, {})
    setAdditionalFields(addFields);
  }, [categoryFields])

  const onFieldChange = (fieldName: string, value: string) => {
    setAdditionalFields({
      ...additionalFields,
      [fieldName]: value,
    })
  }

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (newValue: any | null) => {
    if (newValue === 'apply') {
      onApplyButtonClick()
    }
    setOpen(false);

  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      {
        !md ? (
          <Box
            sx={{
              width: 345,
              border: '1px solid rgba(0, 0, 0, 0.2)',
              boxSizing: 'border-box',
              borderRadius: '4px',
              mr: 2,
              p: 2,
            }}
          >
              <Typography variant="body2" color="text.secondary">Цена, BYN</Typography>
              <PriceSlider
                currMin={currMin}
                currMax={currMax}
                setCurrMin={setCurrMin}
                setCurrMax={setCurrMax}
              />

            <FormControl fullWidth margin="normal">
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

            <DynamicForm
              categoryFields={categoryFields}
              onFieldChange={onFieldChange}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              onClick={onApplyButtonClick}
            >
              Применить
            </Button>
          </Box>
        ) : null
      }
      
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            label="Поиск по названию"
            fullWidth
            value={searchText}
            onChange={onSearchTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {
            md ? (
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  ml: 1,
                  mr:1,
                }}
                aria-label="filters"
                size="large"
              >
                <FilterAltIcon fontSize="inherit" />
              </IconButton>
            ) : null
          }
          
        </Box>
        
        { loading
          ? <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
          : <>
            {data?.products?.length ? data.products.map((product: any) => (<ProductItem key={product._id} product={product} />)) : null}
          </>
        }

        {
          (!loading && !data?.products?.length) ? 
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h6" gutterBottom>
            По этому запросу ничего не найдено

            </Typography>
            <Typography variant="body2" gutterBottom>Попробуйте написать по-другому название товара или измените значения в фильтрах</Typography>
          </Box> : null
        }

        {
          data?.products?.length ? <Box
            sx={{mt:2}}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Pagination
              count={data?.totalPages}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              />
          </Box> : null
        }
        
      </Box>

      <Dialog onClose={() => handleClose(null)} open={open} fullWidth>
        <DialogTitle>Фильтры</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">Цена, BYN</Typography>
          <PriceSlider
            currMin={currMin}
            currMax={currMax}
            setCurrMin={setCurrMin}
            setCurrMax={setCurrMax}
          />

          <FormControl fullWidth margin="normal">
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

        <DynamicForm
          categoryFields={categoryFields}
          onFieldChange={onFieldChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(null)}>Отмена</Button>
          <Button onClick={() => handleClose('apply')}>Применить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Products;