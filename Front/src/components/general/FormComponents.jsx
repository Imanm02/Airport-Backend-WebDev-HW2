import {styled} from "@mui/material/styles";
import {Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";

const FormTextField = styled(TextField)(
    {
        marginTop: '0.3rem',
        '& .MuiInput-underline:before': {borderBottomColor: '#20676b'},
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {borderBottomColor: '#20676b'},
        '& label': {
            color: '#20676b',
        },
    }
)
const FormButton = styled(Button)(
    {
        background: '#20676b',
        marginTop: '1rem',
        marginBottom: '1rem',
    }
)

const LogoContainer = styled(Container)(
    {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0.6rem',
        marginBottom: '0.6rem'
    }
)

export function FormField({id, name, label, formik, inputProps}) {
    return (
        <FormTextField
            fullWidth
            variant='standard'
            id={id}
            name={name}
            label={label}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            InputProps={inputProps}
        />
    )
}


export function FormPasswordField({id, name, label, formik, inputProps}) {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
        <FormTextField
            fullWidth
            variant='standard'
            id={id}
            name={name}
            label={label}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            InputProps={{
                ...inputProps,
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                    <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                    >
                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </IconButton>
                ),
            }}
        />
    )
}

export function FormSubmitButton({text}) {
    return (
        <FormButton
            type="submit"
            fullWidth
            variant="contained"
        >
            <Typography>
                {text}
            </Typography>
        </FormButton>
    )
}