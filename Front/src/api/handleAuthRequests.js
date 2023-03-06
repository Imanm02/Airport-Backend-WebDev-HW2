import {authApi, ticketApi} from "./axios";

export async function handleAuthRequests({url, method, data, headers}) {
    switch (method){
        case 'GET':
            return await authApi.get(url, {headers})
        case 'POST':
            return await authApi.post(url, data, {headers})
        case 'PUT':
            return await authApi.put(url, data, {headers})
        default:
            return Error('Method not supported')
    }
}

export async function handelTicketRequests({url, method, data, headers}) {
    switch (method){
        case 'GET':
            return await ticketApi.get(url, {headers})
        case 'POST':
            return await ticketApi.post(url, data, {headers})
        case 'PUT':
            return await ticketApi.put(url, data, {headers})
        default:
            return Error('Method not supported')
    }
}