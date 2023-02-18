import React from 'react';
import {useParams} from "react-router-dom";
import useGetAvailableTickets from "../hooks/userGetAvailableTickets";
import Page from "../components/general/Page";
import SearchInfo from "../components/SearchInfo";
import {Typography} from "@mui/material";
import TicketView from "../components/TicketView";

function Tickets() {
    const param = useParams();
    const org_dst = param.origin_destination;
    const [org, dst] = org_dst.split('_');

    const searchParams = new URLSearchParams(window.location.search);
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');

    const {availableTickets, availableTicketsStatus} = useGetAvailableTickets({
            origin: org, destination: dst, departureDate, returnDate
        }
    );
    console.log(availableTickets, availableTicketsStatus)

    return (
        <Page>
            <SearchInfo departureDate={departureDate} returnDate={returnDate} destination={dst} origin={org}/>
            <div style={{height: '100vh'}}>
                {availableTicketsStatus === 'success' &&
                    <>
                        <Typography
                            variant='h5'
                            color='primary'
                            sx={{margin: '10px 0 10px 0'}}
                        >
                            پروازهای رفت
                        </Typography>

                        {
                            availableTickets['data']['flight'].map((ticket, index) => {
                                return <TicketView key={index} flightInfo={ticket}/>
                            })
                        }
                    </>
                }
                {availableTicketsStatus === 'success' && returnDate &&
                    <>
                        <Typography
                            variant='h5'
                            color='primary'
                            sx={{margin: '10px 0 10px 0'}}
                        >
                            پروازهای برگشت
                        </Typography>
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