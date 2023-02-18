import axios from 'axios'

const authApi = axios.create({
    baseURL: `${process.env.REACT_APP_AUTH_HOST}:${process.env.REACT_APP_AUTH_PORT}/`
})

const ticketApi = axios.create({
    baseURL: `${process.env.REACT_APP_TICKET_HOST}:${process.env.REACT_APP_TICKET_PORT}/`
})

export {authApi, ticketApi}