import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";

import { selectUserState } from "../store/selectors/auth.selectors";
import $api from "../api";
import { useNavigate } from "react-router";
import { fetchIsAuth } from "../api/auth.api";
import { setCookie } from "../utils/cookiesUtils";
import { COOKIES } from "../constants";
import { loginUserSuccess } from "../store/actions/auth.actions";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data } = useSelector(selectUserState);
  const dispatch = useDispatch();

  const [ phoneNumber, setPhoneNumber ] = useState<string>(data?.user?.phoneNumber || '');
  const [ email, setEmail ] = useState<string>(data?.user?.email || '');
  const [ name, setName ] = useState<string>(data?.user?.name || '');

  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    setPhoneNumber(data?.user?.phoneNumber || '');
    setEmail(data?.user?.email || '');
    setName(data?.user?.name || '');
  }, [data])


  const onSubmit = async () => {
    setLoading(true);
    $api.put('/profile', { name, phoneNumber }).then(async () => {
      const data = await fetchIsAuth();
      setCookie(COOKIES.token, data.accessToken);
      localStorage.setItem('token', data.accessToken);
      dispatch(loginUserSuccess(data));
      setLoading(false);
      navigate('/profile');
    }, () => {
      setLoading(false);
    })
  } 

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Имя пользователя"
        name="name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <TextField
        margin="normal"
        required
        disabled
        fullWidth
        id="email"
        label="Email"
        name="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <InputMask
        mask="+375(99) 999 99 99"
        value={phoneNumber}
        onChange={(evt) => setPhoneNumber(evt.target.value)}
      >
        {/* @ts-ignore */} 
        {() => <TextField
          id="phone-number"
          name="phone-number"
          margin="normal"
          required
          fullWidth
          label="Номер телефона"
          variant="outlined" />}
      </InputMask>

      {
        !loading ? <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}
        >
          Изменить
        </Button> : null
      }
      {
        loading ? <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Изменение...
        </LoadingButton> : null
      }
    </Container>
  )
}

export default EditProfile;
