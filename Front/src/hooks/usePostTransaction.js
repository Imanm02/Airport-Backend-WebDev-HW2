import {useMutation} from "@tanstack/react-query";
import {buyTicket} from "../api/buyTicket";


export default function usePostTransaction() {
    const mutation = useMutation(
        buyTicket,
        {
            onSuccess: () => {
                console.log('success')
            }
        }
    );

    return {mutation};
}