import axios from 'axios'

const baseURL = 'http://72.140.157.98:8000/api/v1'
export default axios.create({
  baseURL,
})

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
