import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserTableRow from "./UserTableRow";
import $api from "../api";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const UserTable = () => {
  const [ users, setUsers ] = useState<any[] | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    $api.get('/users').then((data) => {
      setUsers(data.data);
      setLoading(false);
    })
  }, []);

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
            <TableCell align="right">Имя</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Роль</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row: any) => (<UserTableRow key={row._id} row={row} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;