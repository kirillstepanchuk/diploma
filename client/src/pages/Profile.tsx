import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

import ProfileInfo from "../components/ProfileInfo";
import { selectUserState } from "../store/selectors/auth.selectors";
import UserProductTable from "../components/UserProductTable";

const Profile = () => {
  const { data } = useSelector(selectUserState);

  return (
    <Container component="main" maxWidth="lg" sx={{mt: 5}}>
      <ProfileInfo user={data?.user}/>
      <UserProductTable userId={data?.user?.id}/>
    </Container>
  )
}

export default Profile;