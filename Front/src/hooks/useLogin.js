import {getToken} from "../api/users";
import successToast from "../toast/customToast";
import {useNavigate} from "react-router-dom";
import {useSetUserLoginStatus} from "./useSetUserLoginStatus";
import {useMutation} from "@tanstack/react-query";

export default function useLogin() {
    const navigate = useNavigate();
    const {setIsRegistered, setAccessToken} = useSetUserLoginStatus();

    const mutation = useMutation(
        getToken,
        {
            onSuccess: (data) => {
                localStorage.setItem("refresh_token", data.refreshToken)
                setAccessToken(data.accessToken)
                setIsRegistered(true);
                const message = "اطلاعات با موفقیت ارسال شدند.";
                successToast(message);
                navigate("/blogs");
            }
        });

    return {mutation};
}