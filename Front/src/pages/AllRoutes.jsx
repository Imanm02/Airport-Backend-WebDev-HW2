import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import Signup from "./Signup";
import Login from "./Login";
import Tickets from "./Tickets";
import NotFound from "./NotFound";

function AllRoutes() {
    /*
    useEffect(
        () => {
            // check if refresh token exist in local storage
            const refreshToken = localStorage.getItem("refresh_token");

            // if refresh token exist then get access token from server

        }, []
    )
       */
    console.log('miooo the mioo');
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tickets/:origin_destination" element={<Tickets/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default AllRoutes;