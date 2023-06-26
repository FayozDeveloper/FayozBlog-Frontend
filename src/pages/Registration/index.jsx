import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthSignUp, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: "onChange"
    })

    const data  = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuthSignUp(values))
        console.log(data)
        if (!data.payload){
            alert('Не удалось зарегистрироваться')
        }

        if (data.payload.token) {
            window.localStorage.setItem('token', data.payload.token)
        } else {
            alert('Не удалось зарегистрироваться')
        }
    }

    if (isAuth){
        return <Navigate to="/" />
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField className={styles.field} label="Полное имя" fullWidth
                     error={Boolean(errors.fullName?.message)}
                     helperText={errors.fullName?.message}
                     {...register('fullName', {required: 'Укажите имя',
                         minLength: {
                             value: 3,
                             message: 'Пароль должен быть не менее 3 символов'
                         }
                     })}
          />
          <TextField
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', {required: 'Укажите e-mail'})}
              className={styles.field} label="E-Mail" fullWidth type={"email"}
          />
          <TextField
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {required: 'Укажите пароль',
                  minLength: {
                      value: 5,
                      message: 'Пароль должен быть не менее 5 символов'
                  }
              })}
              className={styles.field} label="Пароль" fullWidth
          />
            <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
        </form>
    </Paper>
  );
};
