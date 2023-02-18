import React from 'react';
import Page from "../components/general/Page";
import AddThree from "../components/AddThree";
import AddTwo from "../components/AddTwo";
import AddOne from "../components/AddOne";
import SearchTicket from "../components/SearchTicket";
import Footer from "../components/Footer";

function LandingPage() {
    return (
        <Page>
            <SearchTicket/>
            <AddThree/>
            <AddTwo/>
            <AddOne/>
        </Page>
    );
}

export default LandingPage;