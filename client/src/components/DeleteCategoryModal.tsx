import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";


interface AddCategoryModalProps {
  onClose: (newValue: boolean | null, id: string) => void,
  open: boolean,
  category: any,
}

const DeleteCategoryModal: FC<AddCategoryModalProps> = ({onClose, open, category}) => {

  const handleClose = (newValue: boolean | null) => {
    onClose(newValue, category._id);
  };

  return (
    <Dialog onClose={() => handleClose(null)} open={open} fullWidth>
      <DialogTitle>Удаление категории</DialogTitle>
      <DialogContent>
        Вы уверены, что хотите удалить категорию "{category?.name}" ?
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Отмена</Button>
        <Button onClick={() => handleClose(true)}>Удалить</Button>
      </DialogActions>
    </Dialog>
  )
};
export default DeleteCategoryModal;