import React from 'react';
import {Container, Grid, Typography, Box, Divider, Button} from "@mui/material";
import images from "../constants/images";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import usePostTransaction from "../hooks/usePostTransaction";
import {styled} from "@mui/material/styles";

const airplaneCompany = [
    {
        name: 'آسمان',
        logo: images.aseman,
    },
    {
        name: 'ساها',
        logo: images.saha,
    },
    {
        name: 'کیش ایر',
        logo: images.kishAir,
    },
    {
        name: 'زاگرس',
        logo: images.zagros,
    }
]

const containerStyle = {
    backgroundColor: 'white',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    padding: '1rem',
    marginTop: '1rem',
}


function toPersianNumber(number) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return number.toString().replace(/\d/g, function (w) {
        return persianNumbers[+w]
    });
}

const StyledBox = styled(Box)(({theme}) => ({
    marginTop: '0.5em',
}));


const getRandomAirplaneCompany = () => {
    return airplaneCompany[Math.floor(Math.random() * airplaneCompany.length)];
}

const buyTicketClassCondition = (flightInfo, flight_class) => {
    console.log(flightInfo, flight_class)
    console.log(flightInfo[`${flight_class}_class_free_capacity`])
    if (flightInfo[`${flight_class}_class_free_capacity`] > 40) {
        return true;
    }
}

const buyTicketStyle = {
    // width is 100px for large screens otherwise it is 80px
    width: {xs: '100%', lg: '100px'},
    margin: '2px',
}

const BuyTicketButton = ({flightInfo, flightClass, flightData, mutation}) => {
    const isDisabled = buyTicketClassCondition(flightInfo, flightClass);
    const price = flightInfo[`${flightClass}_price`];
    return (
        <div style={{marginLeft: '2px'}}>
            <Typography variant='body1' color='primary'>
                {toPersianNumber(price)} تومان
            </Typography>
            <Button variant='contained' color='primary'
                    sx = {buyTicketStyle}
                    disabled={isDisabled}
                    onClick={() => {
                        mutation.mutate({
                            ...flightData,
                            offer_price: price,
                            offer_class: flightClass,
                        })
                    }
                    }
            >
                {
                    isDisabled ? 'ظرفیت تکمیل!' : `خرید بلیط کلاس ${flightClass.toUpperCase()}`
                }
            </Button>
        </div>
    )
}

function TicketView({flightInfo}) {


    console.log('flight info', flightInfo)
    const randomAirplaneCompany = getRandomAirplaneCompany();

    const departureDateTime = new Date(flightInfo.departure_local_time);
    const departureDate = departureDateTime.toLocaleDateString('fa-IR');
    const departureTime = departureDateTime.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'});


    const arrivalDateTime = new Date(flightInfo.arrival_local_time);
    const arrivalDate = arrivalDateTime.toLocaleDateString('fa-IR');
    const arrivalTime = arrivalDateTime.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'});

    const origin = flightInfo.origin;
    const destination = flightInfo.destination;

    console.log(departureTime, arrivalTime)


    const flightdata = {
        corresponding_user_id: 1,
        flight_id: flightInfo.flight_id,
        title: 'پرواز',
    }

    const {mutation} = usePostTransaction();
    console.log(flightInfo)
    return (
        <Container sx={containerStyle}>
            <Grid container>
                <Grid item xs={12} sm={8}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src={randomAirplaneCompany.logo} alt={randomAirplaneCompany.name} width='50px'
                                     style={{borderRadius: '50%'}}
                                     height='50px'/>
                                <Typography variant='body1' color='primary'>{randomAirplaneCompany.name}</Typography>
                            </Container>
                        </Grid>
                        <Grid item xs={10}>
                            <StyledBox sx={{justifyContent: 'space-evenly', display: 'flex'}}>
                                <Box>
                                    <Typography variant='h6' color='secondary' sx={{display: 'flex'}}>
                                        <CalendarMonthIcon sx={{color: '#ff8945'}}/>
                                        زمان پرواز
                                    </Typography>

                                    <Typography variant='h6' color='primary'>{departureTime}</Typography>
                                    {/*    calendar icon below*/}

                                </Box>

                                {/*add vertical line here*/}
                                <Divider orientation="vertical" flexItem/>

                                <Box>
                                    <Typography variant='h6' color='secondary' sx={{display: 'flex'}}>
                                        <FlightTakeoffIcon sx={{color: '#ff8945'}}/>
                                        مبدا
                                    </Typography>
                                    <Typography variant='h6' color='primary'>{origin}</Typography>
                                </Box>

                                <Divider orientation="vertical" flexItem/>

                                <Box>
                                    <Typography variant='h6' color='secondary' sx={{display: 'flex'}}>
                                        <FlightTakeoffIcon sx={{color: '#ff8945'}}/>
                                        مقصد
                                    </Typography>
                                    <Typography variant='h6' color='primary'>{destination}</Typography>
                                </Box>

                            </StyledBox>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Container sx={{display: 'flex', alignItems: 'center', flexDirection: 'inherit'}}>
                        <BuyTicketButton flightInfo={flightInfo} flightClass='y' flightData={flightdata}
                                         mutation={mutation}/>
                        <BuyTicketButton flightInfo={flightInfo} flightClass='j' flightData={flightdata}
                                         mutation={mutation}/>
                        <BuyTicketButton flightInfo={flightInfo} flightClass='f' flightData={flightdata}
                                         mutation={mutation}/>

                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}

export default TicketView;