import React from 'react';
import {useParams} from "react-router-dom";
import useGetAvailableTickets from "../hooks/userGetAvailableTickets";
import Page from "../components/general/Page";
import SearchInfo from "../components/SearchInfo";
import {Typography, Container} from "@mui/material";
import TicketView from "../components/TicketView";

function Tickets() {
    const param = useParams();
    const org_dst = param.origin_destination;
    const [org, dst] = org_dst.split('_');

    const searchParams = new URLSearchParams(window.location.search);
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');

    // if departureDate is not set, set it to today
    if (!departureDate) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const todayString = yyyy + '-' + mm + '-' + dd;
        window.location.search = `?departureDate=${todayString}`;
    }

    const {availableTickets, availableTicketsStatus} = useGetAvailableTickets({
            origin: org, destination: dst, departureDate, returnDate
        }
    );

    return (
        <Page>
            <SearchInfo departureDate={departureDate} returnDate={returnDate} destination={dst} origin={org}/>
            <div style={{height: '100vh'}}>
                {availableTicketsStatus === 'success' &&
                    <>
                        <Container>
                            <Typography
                                variant='h6'
                                color='primary'
                                sx={{margin: '10px 0 10px 0', textAlign:'initial'}}
                            >
                                {
                                    returnDate ?
                                        'پروازهای رفت'
                                        : 'پروازهای موجود'
                                }

                            </Typography>

                        </Container>
                        {
                            availableTickets['data']['flight'].map((ticket, index) => {
                                return <TicketView key={index} flightInfo={ticket}/>
                            })
                        }
                    </>
                }
                {availableTicketsStatus === 'success' && returnDate &&
                    <>
                        <Container>
                            <Typography
                                variant='h5'
                                color='primary'
                                sx={{margin: '10px 0 10px 0', textAlign:'initial'}}
                            >
                                پروازهای برگشت
                            </Typography>


                        </Container>
                        {
                            availableTickets['data']['returnFlight'].map((ticket, index) => {
                                return <TicketView key={index} flightInfo={ticket}/>
                            })}
                    </>
                }


            </div>
        </Page>
    );
}

export default Tickets;