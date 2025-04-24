import * as yup from "yup";
  

export const userSignupSchema = yup.object().shape({
    name: yup.string()
    .trim()
    .min(5, "Invalid name (minimum 5 characters)")
    .max(20, "Invalid name (maximum 20 characters)")
    .required("Name is required"),

    email: yup.string()
    .trim()
    .email("Email is invalid")
    .required("Email is required"),

    password: yup.string()
        .trim()
        .min(8, "Incorrect (minimum 8 characters)")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Include at least one number, uppercase letter")
        .required("Password is required")
});