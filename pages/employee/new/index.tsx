import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RedButton, SubmitButton } from '../../../components/Buttons';

const NewEmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    hireDate: Yup.date()
        .max(new Date(), 'Hire date must be today or earlier')
        .required('Hire date is required'),
    department: Yup.string()
        .required('Department is required'),
    phone: Yup.string()
        .required('Phone number is required'),
    address: Yup.string()
        .required('Address is required'),
});

interface Department {
    id: number;
    name: string;
}

export default function NewEmployee() {
    const router = useRouter();
    const apiEmployeeUrl = process.env.apiEmployeeUrl;
    const apiDepartmentUrl = process.env.apiDepartmentUrl;

    const [departments, setDepartments] = useState<Department[]>([]);
    useEffect(() => {
        fetch(apiDepartmentUrl)
            .then(response => response.json())
            .then(data => setDepartments(data));
    }, [apiDepartmentUrl]);

    const initialValues = {
        firstName: '',
        lastName: '',
        hireDate: '',
        department: '',
        phone: '',
        address: '',
    };

    const handleCancel = () => {
        router.push('/employee');
    }

    const handleSendNewEmployee = (values: any) => {
        fetch(apiEmployeeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, DepartmentId: values.department }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                router.push('/employee');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <center>
                <h2>Add New Employee</h2>
            </center>
            <Formik
                initialValues={initialValues}
                validationSchema={NewEmployeeSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleSendNewEmployee(values);
                        setSubmitting(true);
                    }, 400);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="max-w-md mx-auto">
                        <div className="mb-4">
                            <label htmlFor="firstName">
                                First Name
                            </label>
                            <Field
                                name="firstName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="firstName" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName">
                                Last Name
                            </label>
                            <Field
                                name="lastName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="lastName" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hireDate">
                                Hire Date
                            </label>
                            <Field
                                type="date"
                                name="hireDate"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="hireDate" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="department">
                                Department
                            </label>
                            <Field
                                as="select"
                                name="department"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select a department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="department" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone">
                                Phone Number
                            </label>
                            <Field
                                name="phone"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="phone" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address">
                                Address
                            </label>
                            <Field
                                name="address"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="address" className="text-red-500" />
                        </div>
                        <div className="flex justify-center space-x-4">
                            <SubmitButton text="Submit" />
                            <RedButton handle={handleCancel} text="Cancel" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};