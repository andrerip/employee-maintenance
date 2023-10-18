import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewEmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(50, 'First name must be 50 characters or less')
        .required('First name is required'),
    lastName: Yup.string()
        .max(50, 'Last name must be 50 characters or less')
        .required('Last name is required'),
    hireDate: Yup.date()
        .required('Hire date is required'),
    department: Yup.string()
        .required('Department is required'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    address: Yup.string()
        .required('Address is required'),
});

interface NewEmployeeFrameProps {
    onClose: () => void;
}

const NewEmployeeFrame = (props: NewEmployeeFrameProps) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        hireDate: '',
        department: '',
        phone: '',
        address: '',
    };

    const handleSubmit = (values: any) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={NewEmployeeSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" />
                            <ErrorMessage name="firstName" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" />
                            <ErrorMessage name="lastName" />
                        </div>
                        <div>
                            <label htmlFor="hireDate">Hire Date</label>
                            <Field type="date" name="hireDate" />
                            <ErrorMessage name="hireDate" />
                        </div>
                        <div>
                            <label htmlFor="department">Department</label>
                            <Field as="select" name="department">
                                <option value="">Select a department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                            </Field>
                            <ErrorMessage name="department" />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <Field name="phone" />
                            <ErrorMessage name="phone" />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <Field name="address" />
                            <ErrorMessage name="address" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewEmployeeFrame;