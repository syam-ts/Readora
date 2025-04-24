import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),

    phone: yup
        .string()
        .trim()
        .test(
            "is-positive",
            "Invalid Number (must be positive)",
            (val: any) => !val.startsWith("-")
        )
        .test(
            "is-10-digits",
            "Invalid Number (must be at least 10 digits)",
            (val) => {
                if (!val) {
                    return;
                }
                if (val.startsWith("-")) return true;
                return /^\d{10}$/.test(val);
            }
        )
        .required("Phone Number is required"),

    dob: yup
        .date()
        .typeError("Date of Birth must be a valid date")
        .max(new Date(), "Date of Birth cannot be in the future")
        .required("Date of Birth is required"),

    preferences: yup
        .array()
        .min(3, "Minimum 4 preferences needed")
        .max(5, "Maximum 5 preferences are allowed")
        .required("Preferences required"),
});
