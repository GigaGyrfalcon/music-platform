import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/v1'
export default axios.create({
  baseURL,
})

export const axiosPrivate = (token: string) => {
  const ax = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  ax.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  return ax
}
