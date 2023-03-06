import React from 'react';
import {Button, Container, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {searchTicketSchema} from "../validationSchema/searchTicketSchema";

const containerStyle = {
    display: 'flex',
    rowDirection: 'row',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
}

const textFiledStyle = {
    width: '100%',
    margin: '0.5rem',
}

export function SearchInfo({origin, destination, departureDate, returnDate}) {
    const returnDateInit = returnDate === null ? '' : returnDate;

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            origin: origin,
            destination: destination,
            departureDate: departureDate,
            returnDate: returnDateInit
        },
        validationSchema: searchTicketSchema,
        onSubmit: (values) => {
            const origin = values.origin;
            const destination = values.destination;
            const org_dst = origin + '_' + destination;
            // format date to yyyy-mm-dd
            const departureDate = values.departureDate.split('/').join('-');

            // check if return date is not empty
            if (values.returnDate === '') {
                const url = '/tickets/' + org_dst + `?departureDate=${departureDate}`;
                navigate(url)

            } else {

                const returnDate = values.returnDate.split('/').join('-');
                const url = '/tickets/' + org_dst + `?departureDate=${departureDate}&returnDate=${returnDate}`;
                navigate(url)

            }
        },
    });

    return (
        <Container sx={containerStyle}>
            <TextField
                sx={textFiledStyle}
                id="origin"
                name="origin"
                label="مبدا"
                variant="standard"
                value={formik.values.origin}
                onChange={formik.handleChange}
                error={formik.touched.origin && Boolean(formik.errors.origin)}
                helperText={formik.touched.origin && formik.errors.origin}
            />

            <TextField
                sx={textFiledStyle}
                id="destination"
                name="destination"
                label="مقصد"
                variant="standard"
                value={formik.values.destination}
                onChange={formik.handleChange}
                error={formik.touched.destination && Boolean(formik.errors.destination)}
                helperText={formik.touched.destination && formik.errors.destination}
            />

            <TextField
                sx={textFiledStyle}
                id="departureDate"
                name="departureDate"
                label="تاریخ رفت"
                variant="standard"
                value={formik.values.departureDate}
                onChange={formik.handleChange}
                error={formik.touched.departureDate && Boolean(formik.errors.departureDate)}
                helperText={formik.touched.departureDate && formik.errors.departureDate}
            />

            <TextField
                sx={textFiledStyle}
                id="returnDate"
                name="returnDate"
                label="تاریخ برگشت"
                variant="standard"
                value={formik.values.returnDate}
                onChange={formik.handleChange}
                error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
                helperText={formik.touched.returnDate && formik.errors.returnDate}
            />

            <Button
                variant="contained"
                type="submit"
                onClick={formik.handleSubmit}
            >
                جست‌وجو
            </Button>

        </Container>
    );
}

export default SearchInfo;