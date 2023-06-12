import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../store/actions/admin.actions";
import { selectAdminProductsState } from "../store/selectors/adminProducts.selector";
import ProductTableRow from "./ProductTableRow";
import LinearProgress from "@mui/material/LinearProgress";

const ProductTable = () => {

  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectAdminProductsState)

  React.useEffect(() => {
    dispatch(getAdminProducts(1));
  }, [dispatch]);

  if (loading) {
    return (<LinearProgress />)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" size="small"></TableCell>
            <TableCell>ID</TableCell>
            <TableCell align="right">Название</TableCell>
            <TableCell align="right">Цена, BYN</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (<ProductTableRow key={row._id} row={row} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;