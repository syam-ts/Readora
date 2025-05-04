import * as yup from 'yup';

export const articleEditSchema = yup.object().shape({

    title: yup
        .string()
        .trim()
        .min(10, 'Invalid title (minimum 10 characters)')
        .max(80, 'Invalid title (maximum 80 characters)'),

    subtitle: yup
        .string()
        .trim()
        .min(10, 'Invalid subtitle (minimum 10 characters)')
        .max(50, 'Invalid subtitle (maximum 50 characters)'),

    description: yup
        .string()
        .trim()
        .min(80, 'Description should have atleast 80 characters')
        .max(450, 'Description should be under 450 characters'),
    tags: yup
        .array()
        .min(3, 'Minimum 4 preferences needed')
        .max(5, 'Maximum 5 preferences are allowed')
});
