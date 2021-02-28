import request from './axiosInstance'

export default async function checkToken() {
  const token = window.localStorage.getItem('token')
  if (!token) return { success: false }
  const res = await request.post('/checktoken', { token })
  return res.data
}
