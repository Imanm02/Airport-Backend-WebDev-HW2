import * as yup from "yup";

export const signUpSchema = yup.object({
    firstName: yup.string('نام را وارد کنید')
        .max(20, 'نام نباید بیشتر از 20 کاراکتر باشد')
        .required('نام الزامی است!')
    ,
    lastName: yup
        .string('نام خانوادگی را وارد کنید')
        .max(20, 'نام خانوادگی نباید بیشتر از 20 کاراکتر باشد')
        .required('نام خانوادگی الزامی است!')
    ,
    phoneNumber: yup // all digit and match iranian phone number pattern
        .string('شماره تلفن را وارد کنید')
        .matches(/^09[0-9]{9}$/, 'شماره تلفن وارد شده صحیح نیست')
        .required('شماره تلفن الزامی است!')
    ,
    email: yup
        .string('ایمیل را وارد کنید')
        .email('ایمیل وارد شده صحیح نیست')
        .required('ایمیل الزامی است!')
    ,
    password: yup
        .string('رمز عبور را وارد کنید')
        .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
        .required('رمز عبور الزامی است!')
    ,
    confirmPassword: yup
        .string('تکرار رمز عبور را وارد کنید')
        .oneOf([yup.ref('password'), null], 'رمز عبور و تکرار آن یکسان نیستند')
        .required('تکرار رمز عبور الزامی است!')

})


export const loginSchema = yup.object({
    email: yup
        .string('ایمیل را وارد کنید')
        .email('ایمیل وارد شده صحیح نیست')
        .required('ایمیل الزامی است!')
    ,
    password: yup
        .string('رمز عبور را وارد کنید')
        .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
        .required('رمز عبور الزامی است!')
    ,
})