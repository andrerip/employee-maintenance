import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { RegularButton, SubmitButton, RedButton } from '../../../components/Buttons';
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
    const router = useRouter();
    const apiEmployeeUrl = process.env.apiEmployeeUrl;
    const apiDepartmentUrl = process.env.apiDepartmentUrl;

    const { employeeId } = router.query

    const [employee, setEmployee] = useState({} as Employee);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>();
    const [departmentChanged, setDepartmentChanged] = useState<boolean>(false);
    const [deactivated, setDeactivated] = useState<boolean>(false);

    const fetchEmployeeData = () => {
        fetch(`${apiEmployeeUrl}/${employeeId}`)
            .then(response => response.json())
            .then(data => {
                setEmployee(data);
                setSelectedDepartmentId(data.Department.id);
                setDepartmentChanged(false);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchEmployeeData();
    }, [employeeId]);

    useEffect(() => {
        fetch(apiDepartmentUrl)
            .then(response => response.json())
            .then(data => setDepartments(data));
    }, []);

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(parseInt(event.target.value));
        setDepartmentChanged(true);
    }

    const handleCancel = () => {
        router.push('/employee');
    }

    const handleUpdateEmployeeDepartment = (e) => {
        e.preventDefault();
        fetch(`${apiEmployeeUrl}/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DepartmentId: selectedDepartmentId }),
        })
            .then(response => response.json())
            .then(() => {
                fetchEmployeeData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleDeactivation = () => {
        if (deactivated) {
            setDeactivated(false);
        } else {
            setDeactivated(true);
        }
    };

    return (
        <>
            <div className='flex max-w-2xl mx-auto'>
                <div className="basis-1/4 bg-blue-600 mr-4">
                    {deactivated
                        ?
                        <div className="flex h-8 bg-red-500 m-3 p-2 text-white justify-center" >
                            Inactive
                        </div>
                        : ''
                    }
                </div>
                <div className="flex-auto flex-col">
                    <h1 className='mb-2'>{employee.firstName} {employee.lastName}</h1>
                    <p>Employee ID: {employee.id}</p>
                    {employee.Department && <p>Department: {employee.Department.name}</p>}
                    <p>Telephone: {employee.phone}</p>
                    <p className='mb-2'>Address: {employee.address}</p>
                    <form onSubmit={handleUpdateEmployeeDepartment} className='space-x-2'>
                        <label htmlFor="department">Update Department</label>
                        <select id="department" name="department" value={selectedDepartmentId} onChange={handleDepartmentChange}>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                        <button type="submit" disabled={!departmentChanged} className="border-black border-2 rounded-2xl py-2 px-4 hover:bg-green-300">
                            {"Update"}
                        </button>
                    </form>
                </div>
                <div className="basis-1/4 mx-auto text-center">
                    <p>Hire Date</p>
                    <p>{formatDate(employee.hireDate)}</p>
                    <p>{timePassed(employee.hireDate)}</p>
                    <div className='flex-none'>
                        <button
                            onClick={handleDeactivation}
                            className={deactivated ? "bg-green-500 w-28 border-black border-2 rounded-2xl py-2 px-4" : "bg-red-500 w-28 border-black border-2 rounded-2xl py-2 px-4"}
                        >
                            {deactivated ? 'Activate' : 'Deactivate'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <RegularButton handle={handleCancel} text="Close" />
            </div>
        </>
    )
}