import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import dayjs from 'dayjs';

import { selectApproveProductState } from "../store/selectors/approveProduct.selector";
import { deleteProduct } from "../store/actions/admin.actions";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import { selectDeleteProductState } from "../store/selectors/deleteProduct.selector";



interface UserTableRowProps {
  row: any,
}

const UserProductTableRow: FC<UserTableRowProps> = ({ row }) => {
  // const [ isApproved, setIsApproved ] = useState(false);
  const [ isDeleted, setIsDeleted ] = useState(false);

  const dispatch = useDispatch();
  const { loading: approveLoading } = useSelector(selectApproveProductState);
  const { loading: deleteLoading } = useSelector(selectDeleteProductState);

  // const onProductApproved = () => {
  //   setIsApproved(true);
  // }

  const onProductDeleted = () => {
    setIsDeleted(true);
  }

  // const onApproveButtonClick = () => {
  //   dispatch(approveProduct(row._id, onProductApproved));
  // }

  const onDeleteButtonClick = () => {
    dispatch(deleteProduct(row._id, onProductDeleted));
  }

  return (
    <TableRow
      hover
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: 'pointer' }}
    >
      
      <TableCell align="center">
        <Link component={RouterLink} to={`/product/${row._id}`} target="_blank" color="inherit">
          <IconButton>
            <OpenInNewIcon />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell align="right">{row.title}</TableCell>
      <TableCell align="right">{row.price?.toFixed(2)}</TableCell>
      <TableCell align="right">{row?.requestDate ? dayjs(row?.requestDate).format('DD.MM.YYYY HH:mm') : 'Не определена'}</TableCell>
      <TableCell align="right">{row?.publicationDate ? dayjs(row?.publicationDate).format('DD.MM.YYYY HH:mm') : 'Не определена'}</TableCell>
      <TableCell align="right">{row?.isApproved ? 'Опубликовано' : 'На рассмотрении'}</TableCell>
      <TableCell align="right">
        <Button onClick={onDeleteButtonClick} disabled={approveLoading || deleteLoading || isDeleted}>
          {isDeleted ? 'Удалено' : 'Удалить'}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default UserProductTableRow;