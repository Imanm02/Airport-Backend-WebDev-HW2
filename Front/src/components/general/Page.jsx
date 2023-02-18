import React from 'react';
import {styled} from "@mui/material/styles";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Container = styled('div')(({color = '#f5f4f4'}) => ({
    width: '100%',
    height: '1000px',
    backgroundColor: color,
}));

function Page({children}) {

    return (
        <Container>
            <Navbar/>
            {children}
            <Footer/>
        </Container>
    );
}

export default Page;