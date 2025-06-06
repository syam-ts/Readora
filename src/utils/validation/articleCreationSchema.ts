import * as yup from "yup";
 
export const articleCreationSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(10, 'Invalid title (minimum 10 characters)')
        .max(80, 'Invalid title (maximum 80 characters)')
        .required("Title is required"),

    subtitle: yup
        .string()
        .trim()
        .min(10, 'Invalid subtitle (minimum 10 characters)')
        .max(50, 'Invalid subtitle (maximum 50 characters)')
        .required("Subtitle is required"),

    description: yup
        .string()
        .trim()
        .min(80, 'Description should have atleast 80 characters')
        .max(450, 'Description should be under 450 characters')
        .required("Description is required"),

    tags: yup
        .array()
        .min(3, "Minimum 3 tags needed")
        .max(5, "Maximum 5 tags are allowed")
        .required("Tags are required"),

    category: yup
        .string()
        .trim() 
        .required("Category is required"),
});
