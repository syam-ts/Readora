import * as yup from "yup";

//title, subtitle, description, tags, category

export const articleSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),



    subtitle: yup
        .string()
        .trim()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),



    description: yup
        .string()
        .trim()
        .min(20, "Description should have atleast 20 300 characters")
        .max(500, "Maximum characters are 500")
        .required("Description is required"),





    tags: yup
        .array()
        .min(3, "Minimum 4 preferences needed")
        .max(5, "Maximum 5 preferences are allowed")
        .required("Preferences required"),


        
    category: yup
        .string()
        .trim()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),
});
