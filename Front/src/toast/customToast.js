import { toast } from "react-toastify";

export default function successToast(message) {
    toast.success(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // style the progress bar
        progressStyle: {
            background: "#00d587",
        },
    });
}