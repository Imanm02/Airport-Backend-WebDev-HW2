import * as yup from "yup";


//get current date in yyyy-mm-dd format
const today = new Date();

export const searchTicketSchema = yup.object(
    {
        origin: yup
            .string()
            .required('مبدا الزامی است!')
        ,
        destination: yup
            .string()
            .required('مقصد الزامی است!')
        ,
        // check if departure date is after today
        departureDate: yup
            .date('تاریخ رفت را به درستی وارد کنید')
            .typeError('تاریخ رفت را به درستی وارد کنید')
            .required('تاریخ رفت الزامی است!')
        ,
        // check if arrival date is after departure date
        returnDate: yup
            .date('تاریخ برگشت را به درستی وارد کنید')
            .typeError('تاریخ برگشت را به درستی وارد کنید')
            .min(yup.ref('departureDate'), 'تاریخ برگشت نباید قبل از تاریخ رفت باشد')
    }
)

