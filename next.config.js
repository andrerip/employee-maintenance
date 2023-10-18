module.exports = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/employee',
        permanent: false
      }
    ]
  }
}
