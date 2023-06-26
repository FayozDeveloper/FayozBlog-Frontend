import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthData, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const {
      register,
      handleSubmit,
      formState: { errors, isValid},
  } = useForm({
      defaultValues: {
          email: '',
          password: '',
      },
      mode: "onTouched"
  })
    const data  = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuthData(values))
        console.log(data)
        if (!data.payload){
            alert('Не удалось авторизоваться')
        }

        if (data.payload.token) {
           window.localStorage.setItem('token', data.payload.token)
        } else {
            alert('Не удалось авторизоваться')
        }
    }

    if (isAuth){
        return <Navigate to="/" />
    }

      return (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Вход в аккаунт
          </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className={styles.field}
                label="E-Mail"
                type={"email"}
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Укажите почту'})}
                fullWidth
              />
              <TextField
                  error={Boolean(errors.password?.message)}
                  type={"password"}
                  helperText={errors.password?.message}
                  {...register('password', { required: 'Укажите пароль',
                      minLength: {
                          value: 5,
                          message: 'Пароль должен быть не менее 5 символов',
                      },
                  })}
                  className={styles.field} label="Пароль"
                  fullWidth />
              <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Войти
              </Button>
            </form>
        </Paper>
      );
};
