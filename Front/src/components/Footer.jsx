import React from 'react';
import {Container, Grid, Link, Typography} from "@mui/material";
import Groups2Icon from '@mui/icons-material/Groups2';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MailIcon from '@mui/icons-material/Mail';

// create footer container based on Container component
const containerStyle = {
    backgroundColor: '#0B9AA1',
}

const typographyStyle = {
    color: 'white',
}

function Footer() {
    return (
        <footer>
            <Container maxWidth={false} sx={containerStyle}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Grid display={'flex '} container direction="row" alignItems="center" justifyContent="center"
                              spacing={2}>
                            <Grid item>
                                <Typography sx={typographyStyle} color={'white'} variant="h5" fontWeight={'bold'}
                                            gutterBottom>
                                    تیم ما
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Groups2Icon fontSize="large" sx={{color: 'white'}}/>
                            </Grid>

                            <Container>
                                <Typography sx={typographyStyle} variant="subtitle1" gutterBottom>
                                    هستی کریمی
                                </Typography>
                                <Typography sx={typographyStyle} variant="subtitle1" gutterBottom>
                                    آرش یادگاری
                                </Typography>
                                <Typography sx={typographyStyle} variant="subtitle1" gutterBottom>
                                    ایمان محمدی
                                </Typography>
                            </Container>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={typographyStyle} fontWeight={'bold'} variant="h6" gutterBottom>
                            تماس با ما
                        </Typography>
                        <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2}>

                            <Grid item>
                                <ContactPhoneIcon fontSize="large" sx={{color: 'white'}}/>
                            </Grid>
                            <Grid item>
                                <Typography sx={typographyStyle} variant="subtitle1" gutterBottom>
                                    تلفن: 09123456789
                                </Typography>
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2}>

                            <Grid item>
                                <MailIcon fontSize="large" sx={{color: 'white'}}/>
                            </Grid>
                            <Grid item>
                                <Typography sx={typographyStyle} variant="subtitle1" gutterBottom>
                                    ایمیل: bilico@cblic.com
                                </Typography>
                            </Grid>


                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={typographyStyle} fontWeight={'bold'} variant="h6" gutterBottom>
                            درباره ما
                        </Typography>
                        <Typography textAlign={'justify'} sx={typographyStyle} variant="subtitle1" gutterBottom>
                            تیم بیلیکو در سال ۱۴۰۱ شروع به فعالیت کرد.

                            این تیم متشکل از چند جوان خوش نام و با انگیزه است و قصد دارد جهان را تکان دهد.

                            بیلیکو تلاش دارد تا فرآیند خرید بلیت را برای مشتریان تسهیل کند.
                        </Typography>
                    </Grid>
                </Grid>

                {/*copy right section*/}

            </Container>


            <div style={{backgroundColor: '#c7751d'}}>
                <Typography sx={typographyStyle} variant="subtitle1" align="center"
                            component="p">
                    © کلیه‌ی حقوق متعلق به بیلیکو می‌باشد
                </Typography>

            </div>
        </footer>
    );
}

export default Footer;