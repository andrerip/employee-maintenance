import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { RegularButton } from '../../../components/Buttons';
import { formatDate, timePassed } from '../../../components/utils/date';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    phone: string;
    address: string;
    active: boolean;
    Department: Department;
}

interface Department {
    id: number;
    name: string;
}

interface DepartmentHistory {
    id: number;
    startDate: string;
    Department: Department;
}

export default function EmployeeDetail() {
    const router = useRouter();
    const apiEmployeeUrl = process.env.apiEmployeeUrl;
    const apiDepartmentUrl = process.env.apiDepartmentUrl;

    const { employeeId } = router.query

    const [employee, setEmployee] = useState({} as Employee);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [departmentHistory, setDepartmentHistory] = useState<DepartmentHistory[]>([]);

    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>();
    const [departmentChanged, setDepartmentChanged] = useState<boolean>(false);

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

    const fetchDepartmentHistory = () => {
        fetch(`${apiEmployeeUrl}/${employeeId}/departmentHistory`)
            .then(response => response.json())
            .then(data => {
                setDepartmentHistory(data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchEmployeeData();
    }, [employeeId]);

    useEffect(() => {
        fetchDepartmentHistory();
    }, [employeeId]);

    useEffect(() => {
        fetch(apiDepartmentUrl)
            .then(response => response.json())
            .then(data => setDepartments(data));
    }, [apiDepartmentUrl]);

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
                fetchDepartmentHistory();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleUpdateEmployeeActive = (active: boolean) => {
        fetch(`${apiEmployeeUrl}/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active: active }),
        })
            .then(response => response.json())
            .then(() => {
                fetchEmployeeData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const toggleActivation = () => {
        const isActive = employee.active;
        if (isActive) {
            handleUpdateEmployeeActive(false);
        } else {
            handleUpdateEmployeeActive(true);
        }
    };

    return (
        <>
            <div className='flex max-w-2xl mx-auto'>
                <div className="basis-1/4 relative bg-blue-600">
                    {employee.active
                        ? ''
                        : <div className="flex absolute inset-x-0 bottom-0 h-8 bg-red-500 m-3 p-2 items-center text-white">Inactive</div>
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
                        <button type="submit" disabled={!departmentChanged} className="bg-green-500 w-28 border-black border-2 rounded-2xl py-2 px-4">
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
                            onClick={toggleActivation}
                            className={employee.active ? "bg-red-500 w-28 border-black border-2 rounded-2xl py-2 px-4" : "bg-green-500 w-28 border-black border-2 rounded-2xl py-2 px-4"}
                        >
                            {employee.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex max-w-2xl mx-auto'>
                <h2>Department History</h2>
            </div>
            <div className='max-w-2xl mx-auto'>
                <table className="table-fixed">
                    <thead>
                        <tr className='bg-gray-500 text-center'>
                            <th className="px-6 py-2">Date</th>
                            <th className="px-6 py-2">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(departmentHistory) && departmentHistory.map(history => (
                            <tr key={history.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-4 py-2">{formatDate(history.startDate)}</td>
                                <td className="px-6 py-2">{history.Department.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center">
                <RegularButton handle={handleCancel} text="Close" />
            </div>
        </>
    )
}