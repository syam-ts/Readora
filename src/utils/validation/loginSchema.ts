import * as yup from 'yup'


export const userLoginSchema = yup.object().shape({
    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),
    password: yup.string()
        .min(8, "minimum 8 characters need")
        .required("Password is required...")
});