import {handelTicketRequests} from "./handleAuthRequests";


export async function searchTicket({origin, destination, departureDate, returnDate}) {
    let url;
    if (returnDate) {
        url = `/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}`
    } else {
        url = `/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`
    }
    return await handelTicketRequests({url, method: 'GET'})
}

