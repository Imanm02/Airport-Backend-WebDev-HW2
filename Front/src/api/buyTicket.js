import {handelTicketRequests} from "./handleAuthRequests";


export async function buyTicket(buyTicketData) {
    return await handelTicketRequests({
        url: 'ticket',
        method: 'POST',
        data: buyTicketData
    }).then(
        function (response) {
            window.location.href = response.data.redirect_url
        }
    )
}

