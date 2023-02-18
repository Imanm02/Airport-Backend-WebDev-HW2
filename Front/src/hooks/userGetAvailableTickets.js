import {searchTicket} from '../api/searchTicket'
import {useQuery} from '@tanstack/react-query'

export default function useGetAvailableTickets({origin, destination, departureDate, returnDate}) {
    console.log('query with variables: ', origin, destination, departureDate, returnDate)


    const {data: availableTickets, status: availableTicketsStatus} = useQuery(
        ['availableTickets', origin, destination, departureDate, returnDate],
        () => searchTicket({origin, destination, departureDate, returnDate})
    )
    return {availableTickets, availableTicketsStatus}
}