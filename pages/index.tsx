import Link from 'next/link'

export default function Page() {
    return (
        <>
            <h1>Welcome Home</h1>
            <Link href='/employee'>
                Employees
            </Link>
        </>
    );
}