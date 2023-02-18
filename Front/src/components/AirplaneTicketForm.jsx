import React from 'react';
import {Grid} from "@mui/material";
import {Field, SubmitButton} from "./general/SearchBarComponents";
import {useFormik} from "formik";
import {searchTicketSchema} from "../validationSchema/searchTicketSchema";
import {redirect, useNavigate} from "react-router-dom";

function AirplaneTicketForm() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            origin: '',
            destination: '',
            departureDate: '',
            returnDate: ''
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
        <form onSubmit={formik.handleSubmit}>
            <Grid container sx={{marginTop: '1rem'}} spacing={2}>
                <Grid item xs={12} sm={5} display={'flex'}>
                    <Field id={'origin'} name={'origin'} label={'مبدا'} formik={formik}/>
                    <Field id={'destination'} name={'destination'} label={'مقصد'} formik={formik}/>
                </Grid>

                <Grid item xs={12} sm={5} display={'flex'}>
                    <Field id={'departureDate'} name={'departureDate'} label={'تاریخ رفت'} formik={formik}/>
                    <Field id={'returnDate'} name={'returnDate'} label={'تاریخ برگشت'} formik={formik}/>
                </Grid>

                <Grid item xs={12} sm={2} display={'flex'}>
                    <SubmitButton text={'جست‌وجو'}/>
                </Grid>
            </Grid>
        </form>
    );
}

export default AirplaneTicketForm;