
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useState } from "react";

import ProductTable from "../components/ProductTable";
import UserTable from "../components/UserTable";
import CategorySettings from "../components/CategorySettings";

const AdminPanel = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="lg" sx={{mt: 5}}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Товары" value="1" />
            <Tab label="Пользователи" value="2" />
            <Tab label="Категории" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><ProductTable /></TabPanel>
        <TabPanel value="2"><UserTable /></TabPanel>
        <TabPanel value="3"><CategorySettings /></TabPanel>
      </TabContext>
    </Box>
    </Container>
  )
}

export default AdminPanel;