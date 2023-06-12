import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import $api from '../api';


export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('confirmPassword') || !data.get('password') || !data.get('email')) {
      enqueueSnackbar('Заполните все поля для регистрации!', { variant: "error"});
      return;
    }

    if (data.get('password') !== data.get('confirmPassword')) {
      enqueueSnackbar('Пароли не сопадают!', { variant: "error"});
      return;
    }

    await $api.post('/register', {
      email: data.get('email'),
      password: data.get('password'),
    }).then(() => {
      navigate('/login');
      enqueueSnackbar('На почту отправлено письмо подтверждения', { variant: "success"});
    }, (err) => {
      const errorMessage = err.response?.data?.message || 'Неопознанная ошибка';
      enqueueSnackbar(errorMessage, { variant: "error"});
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Имя пользователя"
                autoFocus
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Повторите пароль"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="../login">Уже есть учетная запись? Войдите</RouterLink>
              {/* {"Нет учетной записи? Зарегистрируйся"} */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
