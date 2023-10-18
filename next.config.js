module.exports = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/employee',
        permanent: false
      }
    ]
  },
  env: {
    apiEmployeeUrl: process.env.API_EMPLOYEE_URL,
    apiDepartmentUrl: process.env.API_DEPARTMENT_URL,
  },
}