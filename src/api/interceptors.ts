import axios from 'axios'
import { getHeaders } from './api.helpers'

export const axiosClassic = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API,
	headers: getHeaders(),
})

export default axiosClassic
