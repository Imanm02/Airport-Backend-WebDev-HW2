import {styled} from "@mui/material/styles";
import {Button, Container, TextField, Typography} from "@mui/material";
import React from "react";

const FormTextField = styled(TextField)(
    {
        margin: 0,
        padding: 0,
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
        margin: 0,
        padding: 0,
        marginTop: '0.3rem'

    }
)

export function Field({id, name, label, formik, inputProps}) {
    return (
        <FormTextField
            variant='outlined'
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
export function SubmitButton({text}) {
    return (
        <FormButton
            fullWidth
            type="submit"
            variant="contained"
            sx = {
                {
                    height: '56px',
                }
            }
        >
            <Typography>
                {text}
            </Typography>
        </FormButton>
    )
}