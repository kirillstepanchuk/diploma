import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';


interface AddCategoryModalProps {
  onClose: (newValue: any | null) => void,
  open: boolean,
  loading: boolean,
  currValue: string,
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({currValue, onClose, open, loading}) => {
  const [value, setValue] = useState<string>(currValue || '');
  const [, setAddBtnDisabled] = useState<boolean>(true);

  const handleClose = (newValue: any | null) => {
    onClose(newValue);
    setValue("");
  };

  const onValueChange = (evt: any) => {
    setValue(evt.target.value);
  }

  useEffect(() => {
    setAddBtnDisabled(Boolean(value.length))
  }, [value])

  useEffect(() => {
    setValue(currValue || '');
  },[currValue])

  return (
    <Dialog onClose={() => handleClose(null)} open={open} fullWidth>
      <DialogTitle>Изменение категории</DialogTitle>
      <DialogContent>

        <div>
          <TextField
            fullWidth
            sx={{
              mt: 2
            }}
            value={value || ""}
            onChange={onValueChange}
            label="Название" 
            variant="outlined" 
            />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Отмена</Button>
        {
          loading ?<LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
        >Изменение</LoadingButton> : <Button onClick={() => handleClose(value)} disabled={!value?.length}>Изменить</Button>
        }
        
        
      </DialogActions>
    </Dialog>
  )
};
export default AddCategoryModal;