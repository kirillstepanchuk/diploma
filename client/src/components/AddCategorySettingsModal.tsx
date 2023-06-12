import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CategorySettingsModalProps {
  onClose: (newValue: any | null) => void,
  open: boolean,
}

const AddCategorySettingsModal: FC<CategorySettingsModalProps> = ({ onClose, open }) => {
  const [value, setValue] = useState<any>({
    name: "",
    sysname: uuidv4(),
    values: [],
  });

  const handleClose = (newValue: any | null) => {
    onClose(newValue);
    
  };

  useEffect(() => {
    setValue(() => ({
      name: "",
      sysname: uuidv4(),
      values: [],
    }))
  }, [open])

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  // const onValueChange = (newText: string, key: string) => {
  //   setValue((prev: any) => {
  //     const newValues = prev.values.map((val: any) => {
  //       if (val.value === key) {
  //         return {
  //           ...val,
  //           value: newText,
  //         }
  //       }

  //       return val;
  //     })
  //     return {
  //       ...prev,
  //       values: newValues
  //     }
  //   })
  // }

  const onNameChange = (newText: string, key: string) => {
    setValue((prev: any) => {
      const newValues = prev.values.map((val: any) => {
        if (val.value === key) {
          return {
            ...val,
            name: newText,
          }
        }

        return val;
      })
      return {
        ...prev,
        values: newValues
      }
    })
  }

  const onCategoryNameChange = (newText: string) => {
    setValue((prev: any) => ({
      ...prev,
      name: newText,
    }))
  }


  const onDeleteButtonClick = (key: string) => {
    setValue((prev: any) => {
      const newVal = {
        ...prev,
        values: prev.values.filter((val: any) => val.value !== key)
      }
      console.log('newVal: ', newVal);
    
      return newVal;
    })
  }

  const onAddButtonClick = () => {
    setValue((prev: any) => ({
      ...prev,
      values: [
        { value: uuidv4(), name: ""},
        ...prev.values,
      ]
    }))
  }

  return (
    <Dialog fullWidth onClose={() => handleClose(null)} open={open}>
      <DialogTitle>Добавление параметра</DialogTitle>
      <DialogContent>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <TextField fullWidth margin="dense" value={value?.name || ""} onChange={(evt) => onCategoryNameChange(evt.target.value)} label="Название" variant="outlined" />
        <Button sx={{ml:2}} onClick={onAddButtonClick}>Добавить</Button>
      </Box>
      <Typography sx={{mt:2}}>Значения:</Typography>

      {value?.values?.map((val: any, index: number) => (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={val.value}>
          <TextField fullWidth margin="dense" value={val.name} onChange={(evt) => onNameChange(evt.target.value, val.value)} label="Название" variant="outlined" />
          <Button sx={{ml:2}} onClick={() => onDeleteButtonClick(val.value)}>Удалить</Button>
        </Box>
      ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Отмена</Button>
        <Button onClick={() => handleClose(value)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCategorySettingsModal;