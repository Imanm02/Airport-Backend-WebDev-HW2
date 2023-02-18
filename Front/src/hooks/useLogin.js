import {getToken} from "../api/users";
import successToast from "../toast/customToast";
import {useNavigate} from "react-router-dom";
import {useSetUserLoginStatus} from "./useSetUserLoginStatus";
import {useMutation} from "@tanstack/react-query";

export default function useLogin() {
    const navigate = useNavigate();
    const {setIsRegistered} = useSetUserLoginStatus()
    const mutation = useMutation(getToken, {
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.token);
            setIsRegistered(true);
            const message = "اطلاعات با موفقیت ارسال شدند.";
            successToast(message);
            navigate("/blogs");
        }
    });

    return {mutation};
}