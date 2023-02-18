import React from 'react';
import Page from "../components/general/Page";
import images from "../constants/images";
import {Container, Typography} from "@mui/material";

const containerStyle = {
    // if innerHeight is more than 700px, container height will be 700px otherwise it will be innerHeight
    height: window.innerHeight > 700 ? '760px' : '100%',
}


function NotFound(props) {

    // if innerHeight is more than 700px, container height will be 700px otherwise it will be innerHeight

    return (
        <Page>
            <Container sx={containerStyle}>
                <img src={images.notFound} alt="not found"
                     height={'400px'}
                     style={{paddingTop: '2rem'}}
                     // if parent width has lower width than image width, image will be scaled down
                     width={'100%'}
                />

                <Typography variant="h4" align="center" color="textSecondary" gutterBottom sx={{marginBottom: '2rem'}}>
                    صفحه مورد نظر یافت نشد
                </Typography>

                <Typography  variant="h6" align="center" color="textSecondary" gutterBottom>
                    ممکن است آدرس صفحه را اشتباه وارد کرده باشید در غیر این صورت ممکن است مشکل داخلی باشد، لطفا کمی صبر کنید.
                </Typography>
            </Container>
        </Page>
    );
}

export default NotFound;