import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import $api from "../api";

// const roles = [
//   {
//     value: 'ADMIN',
//     name: 'Админ',
//   },
//   {
//     value: 'USER',
//     name: 'Пользователь',
//   },
// ]

const roles = [ 'ADMIN', 'USER' ];

interface UserTableRowProps {
  row: any,
}

const UserTableRow: FC<UserTableRowProps> = ({ row }) => {
  const [ isBlocked, setIsBlocked ] = useState<boolean>(row.isBlocked);
  const [ isBlockedLoading, setIsBlockedLoading ] = useState<boolean>(false);
  const [ currRoles, setCurrRoles ] = useState<any[]>(row.roles);
  const [ rolesLoading, setRolesLoading ] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<typeof currRoles>) => {
    setRolesLoading(true);
    const { target: { value } } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    if (!newValue.includes('USER') || newValue.length) {
      newValue.push('USER');
    }

    // @ts-ignore
    const uniq = [...new Set(newValue)];

    $api.post('/update-user-roles', { id: row._id, roles: uniq }).then(() => {
      setRolesLoading(false);
      setCurrRoles(uniq);
    }, () => { 
      setRolesLoading(false);
    })
  };

  const onSwitchBlockButton = () => {
    setIsBlockedLoading(true);
    const newBlockValue = !isBlocked;
  
    $api.post('/switch-block-user', { id: row._id, block: newBlockValue }).then(() => {
      setIsBlocked(newBlockValue);
      setIsBlockedLoading(false);
    }, () => {
      setIsBlockedLoading(false);
    })
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

      <TableCell component="th" scope="row">
        {row._id}
      </TableCell>
      <TableCell align="right">{row.name || 'Не указано'}</TableCell>
      <TableCell align="right">{row.email}</TableCell>
      <TableCell align="right" sx={{width: '145px'}}>{isBlocked ? 'Заблокирован' : 'Действующий'}</TableCell>
      <TableCell align="right">
        <Select
          multiple
          value={currRoles}
          onChange={handleChange}
          size="small"
          disabled={rolesLoading}
          sx={{
            width: '100px'
          }}
        >
          {roles.map((role, index) => (
            <MenuItem
              key={index}
              value={role}
            >
              {role}
            </MenuItem>
          ))}
        </Select>
        
      </TableCell>
      <TableCell align="right">
        <Button onClick={onSwitchBlockButton} disabled={isBlockedLoading} sx={{width: '145px'}}>
          {isBlocked ? 'Разблокировать' : 'Заблокировать'}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow;