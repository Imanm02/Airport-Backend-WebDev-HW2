import React from 'react';
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AirplaneTicketForm from "./AirplaneTicketForm";


const containerStyle = {
    marginTop: '2rem',
    padding: '1rem',
    minHeight: '300px'

}

const ticketContainerStyle = {
    backgroundColor: 'white',
    minHeight: '210px',
    borderRadius: '15px 15px 0 0',
}

const HeaderButton = styled(Button)(({theme}) => ({
    // set color for the button
    color: '#20676b',
    // set background color for the button
}));


function AirplaneHeader({isActive, setActiveHeader}) {
    const borderBottom = isActive ? '2px solid ' : 'none';
    return (<HeaderButton
        onClick={() => {
            setActiveHeader(0);
            // add border to the button
        }}
        sx={{
            // set radius for up left and up right corner
            borderRadius: '10px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderBottom: borderBottom,
            margin: 0,
            padding: 0,
            paddingTop: '7px',
            width: '100px',
        }}
    >
        <AirplanemodeActiveIcon/>
        <Typography variant="h6">
            پرواز
        </Typography>
    </HeaderButton>)
}


function HotelHeader({isActive, setActiveHeader}) {
    const borderBottom = isActive ? '2px solid ' : 'none';
    return (<HeaderButton
        onClick={() => setActiveHeader(1)}
        sx={{
            // set radius for up left and up right corner
            borderRadius: '0 10px 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderBottom: borderBottom,
            margin: 0,
            padding: 0,
            paddingTop: '7px',
            width: '100px',
        }}
    >
        <HotelIcon/>
        <Typography variant="h6">
            هتل
        </Typography>
    </HeaderButton>)
}


function SearchTicket() {

    const [activeHeader, setActiveHeader] = React.useState(0);


    const airplaneHeaderIsActive = activeHeader === 0;
    const hotelHeaderIsActive = activeHeader === 1;

    return (// create a table for ticket contains 3 header destination, date, origin
        // under each header create a field for user to enter the information
        // create a button for user to submit the ticket using material ui styles

        <Container sx={containerStyle}>
            <Container sx={ticketContainerStyle}>
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'row',
                    }}
                >
                    <AirplaneHeader isActive={airplaneHeaderIsActive} setActiveHeader={setActiveHeader}/>
                    <HotelHeader isActive={hotelHeaderIsActive} setActiveHeader={setActiveHeader}/>
                </Box>

                <AirplaneTicketForm/>

            </Container>
        </Container>
    );
}

export default SearchTicket;