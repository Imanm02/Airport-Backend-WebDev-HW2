import React from 'react';
import {useFormik} from "formik";
import {
    Avatar,
    Box,
    CssBaseline, FormControlLabel, Radio, RadioGroup,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import useSignup from "../hooks/useSignup";
import {signUpSchema} from "../validationSchema/authSchema";
import {Link} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {FormSubmitButton, FormPasswordField, FormField} from "../components/general/FormComponents";


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

function Signup() {
    const {mutation} = useSignup();
    const formik = useFormik({
            initialValues: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                gender: 'male'
            },
            validationSchema: signUpSchema,
            onSubmit: (values) => {
                console.log(values)
                const user = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    gender: values.gender,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                }
                mutation.mutate(user)
            }

        }
    );

    return (
        <Container maxWidth="100%" sx={mainContainerStyle}>
            <Container sx={{backgroundColor: 'inherit'}} component="main"
                       maxWidth="xs">
                <CssBaseline/>
                <Box sx={formStyle}>
                    <Avatar sx={{width: 56, height: 56, bgcolor: '#20676b'}}>
                        <PersonIcon sx={{fontSize: 50}}/>
                    </Avatar>
                    <Typography component="h1" variant="h6" color={'#20676b'}>
                        ثبت نام
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormField id='firstName' name='firstName' label='نام' formik={formik}/>
                        <FormField id='lastName' name='lastName' label='نام خانوادگی' formik={formik}/>
                        <RadioGroup row aria-label="position" name="gender" value={formik.values['gender']}
                                    onChange={formik.handleChange}>
                            <FormControlLabel value="male" control={<Radio color="primary"/>} label="مرد"/>
                            <FormControlLabel value="female" control={<Radio color="primary"/>} label="زن"/>
                        </RadioGroup>
                        <FormField id='email' name='email' label='ایمیل' formik={formik}/>
                        <FormField id='phoneNumber' name='phoneNumber' label='شماره تلفن' formik={formik}/>
                        <FormPasswordField id='password' name='password' label='رمز عبور' formik={formik}/>
                        <FormPasswordField id='confirmPassword' name='confirmPassword' label='تکرار رمز عبور'
                                           formik={formik}/>
                        <FormSubmitButton text={'ثبت نام'}/>
                    </form>

                    <Container sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Link to='/login'>
                            <Typography variant='caption'>
                                قبلا حساب کاربری ساخته اید؟
                            </Typography>
                        </Link>
                    </Container>
                </Box>
            </Container>
        </Container>
    )
}

export default Signup;