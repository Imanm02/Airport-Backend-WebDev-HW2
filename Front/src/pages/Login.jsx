import React from 'react';
import {useFormik} from "formik";
import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {FormSubmitButton, FormPasswordField, FormField} from "../components/general/FormComponents";
import {loginSchema} from "../validationSchema/authSchema";
import {Link} from "react-router-dom";
import useLogin from "../hooks/useLogin";


const mainContainerStyle = {
    backgroundColor: '#20676b',
    height: '100vh',
    backgroundSize: 'cover',
    display: 'flex'
}

const formStyle = {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'white'
}


function Login() {
    const {mutation} = useLogin();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const auth = {
                email: values.email,
                password: values.password,
            }

            mutation.mutate(auth)
        },
    });

    return (
        <Container maxWidth="100%" sx={mainContainerStyle}>
            <Container sx={{backgroundColor: 'inherit'}} component="main"
                       maxWidth="xs">
                <CssBaseline/>
                <Box sx={formStyle}>
                    <Avatar sx={{width: 56, height: 56, bgcolor: '#20676b'}}>
                        <LoginIcon sx={{fontSize: 40}}/>
                    </Avatar>
                    <Typography component="h1" variant="h6" sx={{color: '#20676b'}}>
                        {'ورود'}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormField id={'username'} name={'username'} label={'نام کاربری'} formik={formik}/>
                        <FormPasswordField id={'password'} name={'password'} label={'رمز عبور'} formik={formik}/>
                        <FormSubmitButton text={'ورود'}/>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link to='..'>
                                <Typography variant="caption">
                                    {'رمز عبور خود را فراموش کرده اید؟'}
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/signup' >
                                <Typography variant="caption">
                                    {"عضو نیستید؟ ثبت نام کنید"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container>
    )
}

export default Login;