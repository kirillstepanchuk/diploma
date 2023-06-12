import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { useDispatch, useSelector } from "react-redux";
// import { getAdminProducts } from "../store/actions/admin.actions";
// import { selectAdminProductsState } from "../store/selectors/adminProducts.selector";
import LinearProgress from "@mui/material/LinearProgress";
import UserProductTableRow from "./UserProductTableRow";
import $api from "../api";
import { FC, useState } from "react";

interface UserProductTableProps {
  userId: string;
}

const UserProductTable: FC<UserProductTableProps> = ({ userId }) => {
  // const dispatch = useDispatch();
  // const { data, loading } = useSelector(selectAdminProductsState)
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true)
    // dispatch(getAdminProducts(1));
    $api.get(`/user-products/${userId}`).then((data) => {
      console.log('data: ', data);
      setProducts(data.data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (<LinearProgress />)
  }

  return (
    <TableContainer component={Paper} sx={{ mb: 10 }}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" size="small"></TableCell>
            <TableCell align="right">Название</TableCell>
            <TableCell align="right">Цена, BYN</TableCell>
            <TableCell align="right">Дата запроса</TableCell>
            <TableCell align="right">Дата публикации</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((row: any) => (<UserProductTableRow key={row._id} row={row} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserProductTable;