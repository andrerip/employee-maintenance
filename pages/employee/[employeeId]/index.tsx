import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik';
import { RegularButton, SubmitButton } from '../../../components/Buttons';
import { formatDate, timePassed } from '../../utils/date';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    phone: string;
    address: string;
    Department: Department;
}

interface Department {
    id: number;
    name: string;
}

export default function EmployeeDetail() {
    const router = useRouter()
    const { employeeId } = router.query
    const [employee, setEmployee] = useState({} as Employee);

    const apiEmployeeUrl = process.env.apiEmployeeUrl;
    const apiDepartmentUrl = process.env.apiDepartmentUrl;

    useEffect(() => {
        fetch(`${apiEmployeeUrl}/${employeeId}`)
            .then(response => response.json())
            .then(data => setEmployee(data))
            .catch(error => console.log(error));
    }, [employeeId]);

    const [departments, setDepartments] = useState<Department[]>([]);
    useEffect(() => {
        fetch(apiDepartmentUrl)
            .then(response => response.json())
            .then(data => setDepartments(data));
    }, []);

    const handleCancel = () => {
        router.push('/employee');
    }

    const initialValues = {
        department: employee.Department?.id || ''
    };

    const handleUpdateEmployeeDepartment = (values: any) => {
        fetch(`${apiEmployeeUrl}/${values.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DepartmentId: values.department }),
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
        <>
            <div className='flex max-w-2xl mx-auto'>
                <div className="flex-none w-32 h-32 bg-blue-600 mr-4" />
                <div className="flex-auto flex-col">
                    <h1 className='mb-2'>{employee.firstName} {employee.lastName}</h1>
                    <p>Employee ID: {employee.id}</p>
                    {employee.Department && <p>Department: {employee.Department.name}</p>}
                    <p>Telephone: {employee.phone}</p>
                    <p className='mb-2'>Address: {employee.address}</p>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                handleUpdateEmployeeDepartment(values);
                                setSubmitting(true);
                            }, 400);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="max-w-md mx-auto">
                                <label htmlFor="department">
                                    Update Department
                                </label>
                                <div className="flex space-x-4">
                                    <Field
                                        as="select"
                                        name="department"
                                        className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <SubmitButton text="Update" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="flex-none">
                    Hire Date
                    <p>{formatDate(employee.hireDate)}</p>
                    {timePassed(employee.hireDate)}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <RegularButton handle={handleCancel} text="Cancel" />
            </div>
        </>
    )
}