import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import $api from "../api";
import CategorySettingsModal from "./CategorySettingsModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import AddCategoryModal from "./AddCategoryModal";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategorySettingsModal from "./AddCategorySettingsModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LinearProgress } from "@mui/material";

const CategorySettings = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const [fields, setFields] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState<boolean>(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState<boolean>(false);

  const [category, setCategory] = useState<string | null>(null);
  const [categoryFields, setCategoryFields] = useState<any[] | null>(null);
  const [, setAdditionalFields] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    $api.get(`/categories`).then((res) => {
      setFields(res.data);
      setLoading(false);

    }, (err) => {
      setLoading(false);
    })
  }, []);

  const changeCategory = (category: string) => {
    setCategory(category);
    const catFields = fields?.find((field) => field.sysname === category)?.fields;
    setCategoryFields(catFields || null);
  }


  useEffect(() => {
    if (fields) { 

      changeCategory(fields?.[0]?.sysname)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields])

  useEffect(() => {
    const addFields = categoryFields?.reduce((curr,categoryField) => {
      return {
        ...curr,
        [categoryField.sysname]: "none",
      }
    }, {})
    setAdditionalFields(addFields);
  }, [categoryFields])

  
  const onCategoryChange = (evt: SelectChangeEvent) => {
    changeCategory(evt.target.value as string);
  }

  const [modalData, setModalData] = useState<any | null>(null)

  const handleClickOpen = (value: any) => {
    setModalData(value);
    setOpen(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const getCurrCategory = () => fields?.find((field) => field.sysname === category);

  const handleClose = (value: any) => {
    setOpen(false);
    if (value) {
      const catInfo = fields?.find((field) => field.sysname === category);
      const newInfo = {
        ...catInfo,
        fields: catInfo.fields.map((field: any) => field.sysname === value.sysname ? value : field)
      }
      $api.put(`/categories/${catInfo._id}`, newInfo).then((res) => {
        setCategoryFields(newInfo.fields);
      })
    }
  };

  const handleCloseAdd = (value: any) => {
    setOpenAdd(false);
    if (value) {
      const catInfo = fields?.find((field) => field.sysname === category);

      $api.post(`/category-settings/${catInfo._id}`, value).then((res) => {
        setCategoryFields((prev) => prev ? [...prev, value] : [value])
      })
    }
  };

  const handleCloseAddCategoryModal = (value: any) => {
    if (value) {
      $api.post('/categories', { name: value}).then((res) => {
        setFields((prev) => prev ? [...prev, res.data] : [res.data]);
        setOpenAddCategoryModal(false);
        setCategory((prev) => res.data.sysname);

      }, (err) => {
        setOpenAddCategoryModal(false);

      })

    } else {
      setOpenAddCategoryModal(false);

    }
  }

  const handleCloseDeleteCategoryModal = (value: any, id: string) => {
    if (value) {
      $api.delete(`/categories/${id}`).then((res) => {
        setFields((prev) => prev?.filter((category: any) => category._id !== id)!);
        setOpenDeleteCategoryModal(false);
      }, (err) => {
        setOpenDeleteCategoryModal(false);
      })

    } else {
      setOpenDeleteCategoryModal(false);

    }
  }

  const deleteCategoryField = (field: any) => {
    const currCategory = getCurrCategory();

    $api.post(`/delete-category-field/${currCategory._id}`, {
      sysname: field.sysname,
    }).then((res) => {
      setCategoryFields((prev: any[] | null) => prev ? prev.filter((cField) => cField.sysname !==field.sysname) : prev)
    }, (err) => {

    })

  }

  const onAddCategoryButtonClick = () => {
    setOpenAddCategoryModal(true)
  }
  const onDeleteCategoryButtonClick = () => {
    setOpenDeleteCategoryModal(true)
  }

  if (loading) {
    return <LinearProgress />
  }

  if (!category) {
    return <></>
  }

  return <>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
      <FormControl fullWidth sx={{mt: 2, mb: 2}}>
        <InputLabel id="demo-simple-select-label">Категория</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category!}
          label="Категория"
          onChange={onCategoryChange}
        >
          {fields?.map((value) => <MenuItem key={value._id} value={value.sysname}>{value.name}</MenuItem>)}
        </Select>
      </FormControl>
      {
        md ? (
          <>
            <IconButton onClick={onAddCategoryButtonClick} title="Добавить категорию">
              <AddIcon />
            </IconButton>
            <IconButton onClick={onDeleteCategoryButtonClick} title="Удалить категорию">
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ ml: "10px" }} onClick={onAddCategoryButtonClick}>
              Добавить категорию
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ ml: "10px" }} onClick={onDeleteCategoryButtonClick}>
              Удалить категорию
            </Button>
          </>
        )
      }
      
    </Box>
    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpenAdd}>
      Добавить параметр категории
    </Button>

    <List
      sx={{
        width: '100%',
        // maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        // maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {categoryFields?.map((categoryField) => (
        <li key={`section-${categoryField.sysname}`}>
          <ul>
            <ListSubheader>
              {`${categoryField.name}`}
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleClickOpen(categoryField)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => deleteCategoryField(categoryField)}
              >
                <DeleteIcon />
              </IconButton>
            </ListSubheader>
            {categoryField.values.map((value: any) => (
              <ListItem key={`item-${value.value}`}>
                <ListItemText primary={`${value.name}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
    <CategorySettingsModal
      onClose={handleClose}
      currValue={modalData}
      open={open}
    />

    <AddCategorySettingsModal
      onClose={handleCloseAdd}
      open={openAdd}
    />

    <AddCategoryModal
      onClose={handleCloseAddCategoryModal}
      open={openAddCategoryModal}
    />

    <DeleteCategoryModal
      onClose={handleCloseDeleteCategoryModal}
      open={openDeleteCategoryModal}
      category={getCurrCategory()}
    />
    
  </>
}

export default CategorySettings;