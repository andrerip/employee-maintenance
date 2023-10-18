import { useState, useEffect } from 'react';
import { formatDate, timePassed } from "../utils/date";
import NewEmployeeFrame from './NewEmployeeFrame';
import { redirect } from 'next/navigation';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3030/employees')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3030/employees/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => console.log(error));
    }

    const handleNewEmployeeClick = () => {
        setShowNewEmployeeModal(true);
    }

    const handleNewEmployeeClose = () => {
        setShowNewEmployeeModal(false);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Employees</h2>
                <button className="big-button" onClick={redirect('/new-employee')}>New Employee</button>
            </div>
            {employees.map((employee) => (
                <div key={employee.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    {/* <img src={employee.image} alt={employee.firstName} style={{ width: '100px', height: '100px', marginRight: '1rem' }} /> */}
                    <div style={{ width: '100px', height: '100px', backgroundColor: 'blue', marginRight: '1rem' }} />
                    <div style={{ flex: 1 }}>
                        <b>{employee.firstName} {employee.lastName}</b> ({employee.Department.name})
                        <p>
                            <b>Hire Date</b>
                            <br />
                            {formatDate(employee.hireDate)} ({timePassed(employee.hireDate)})
                        </p>
                    </div>
                    <button>View Details</button>
                    <button onClick={() => handleDelete(employee.id)}>X</button>
                </div>
            ))}
            {showNewEmployeeModal && <NewEmployeeFrame onClose={handleNewEmployeeClose} />}
        </>
    );
}