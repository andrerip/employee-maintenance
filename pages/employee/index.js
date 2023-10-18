import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { formatDate, timePassed } from "../utils/date";
import { RegularButton, RedButton } from '../../components/Buttons';

export default function EmployeeList() {
    const router = useRouter()
    const [employees, setEmployees] = useState([]);
    const apiEmployeeUrl = process.env.apiEmployeeUrl;

    useEffect(() => {
        fetch(apiEmployeeUrl)
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.log(error));
    }, []);

    const handleNewEmployee = () => {
        router.push('/employee/new');
    }

    const handleDetails = (id) => {
        router.push(`/employee/${id}`);
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            fetch(`${apiEmployeeUrl}/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setEmployees(employees.filter(employee => employee.id !== id));
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div className='max-w-2xl mx-auto'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold underline">Employees</h2>
                <RegularButton handle={handleNewEmployee} text="New Employee" />
            </div>
            {employees.map((employee) => (
                <div key={employee.id} className="flex items-center border-blue border-2 rounded-2xl h-28">
                    <div className="flex-none w-16 h-16 bg-blue-600 mr-4" />
                    <div className="flex-auto">
                        <div className="">
                            <b>{employee.firstName} {employee.lastName}</b> ({employee.Department.name})
                        </div>
                        <div className="">
                            <b>Hire Date</b>
                            <br />
                            {formatDate(employee.hireDate)} ({timePassed(employee.hireDate)})
                        </div>
                    </div>
                    <div className="flex-none">
                        <RegularButton handle={() => handleDetails(employee.id)} text="View Details" />
                    </div>
                    <div className="flex-none">
                        <RedButton handle={() => handleDelete(employee.id)} text="X" />
                    </div>
                </div>
            ))}
        </div>
    );
}