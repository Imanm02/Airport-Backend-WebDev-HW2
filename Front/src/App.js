import './App.css';
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import {CacheProvider} from "@emotion/react";
import LandingPage from "./pages/LandingPage";
import {Route} from "react-router-dom";
import {Helmet} from "react-helmet";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginContextProvider from "./context/LoginContextProvider";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tickets from "./pages/Tickets";
import AllRoutes from "./pages/AllRoutes";


const cacheRtl = createCache({
    key: "muirtl",
    // prefixer is the only stylis plugin by default, so when
    // overriding the plugins you need to include it explicitly
    // if you want to retain the auto-prefixing behavior.
    stylisPlugins: [prefixer, rtlPlugin]
});

// first color : #0B9AA1
// second color : #ff8945
// third color : #ffe8d2
// fourth color : ##946f5c

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#0B9AA1',
            dark: '#0B9AA1',
            light: '#0B9AA1',

            contrastText: '#fff',
        },
        secondary: {
            main: '#ff8945',
            dark: '#ff8945',
            light: '#ff8945',

            contrastText: '#fff',
        },
        text: {
            primary: '#0B9AA1',
            secondary: '#ff8945',
        }
    },
    typography: {
        fontFamily: [
            'Vazir'
        ].join(','),
    },
})

function App() {
    const queryClient = new QueryClient();
    React.useLayoutEffect(() => {
        document.body.setAttribute("dir", "rtl");
    }, []);

    return (
        <div className="App">
            <ToastContainer rtl={true}/>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>بلینو</title>

                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Helmet>
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        <LoginContextProvider>
                            <AllRoutes/>
                        </LoginContextProvider>
                    </ThemeProvider>
                </CacheProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
