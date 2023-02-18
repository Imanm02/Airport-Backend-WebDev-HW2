import React from 'react';
import {Grid, Typography, Container} from "@mui/material";

function IntroSection({title, description, image, grid_direction, color}) {


    const leftDirection = grid_direction === 'left';

    return (
        <Container sx={{marginBottom: '2rem', marginTop: '1rem'}}>
            <Grid container direction={leftDirection ? 'row-reverse' : 'row'} spacing={5}>
                <Grid item xs={12} md={6} alignItems={'center'} display={'flex'}>
                    <Container>
                        <Typography variant={'h3'}
                                    component={'h2'}
                                    sx={{color: {color}, marginTop: '1rem'}}
                                    fontWeight={'bold'}
                                    gutterBottom
                        >{title}</Typography>

                        <Typography variant={'h5'} component={'p'} gutterBottom
                                    align={'justify'}>{description}</Typography>
                    </Container>
                </Grid>

                <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} xs={12} md={6}>
                    <img src={image} alt={title} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default IntroSection;