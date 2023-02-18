import {useMutation} from "@tanstack/react-query";
import {postUser} from "../api/users";
import successToast from "../toast/customToast";
import {useNavigate} from "react-router-dom";
import {useSetUserLoginStatus} from "./useSetUserLoginStatus";

export default function useSignup() {
    const navigate = useNavigate();
    const {setIsRegistered} = useSetUserLoginStatus()
    const mutation = useMutation(
         postUser,
        {
            onSuccess: () => {
                successToast('ثبت نام با موفقیت انجام شد')
                setIsRegistered(true);
                navigate("/");
            },
            onError: (data) => {
                console.log('it will be all right')
                successToast(data);
            },
        });
    return {mutation};
}