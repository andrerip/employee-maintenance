import { useRouter } from 'next/router'

export default function EmployeeDetail() {
    const router = useRouter()
    const { employeeId } = router.query

    return (
        <div>
            <h1>Employee Detail</h1>
            <p>Employee ID: {employeeId}</p>
        </div>
    )
}