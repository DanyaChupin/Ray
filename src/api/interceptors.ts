import axios from 'axios'
import { getHeaders } from './api.helpers'
import { API_URL } from '@/config/api.config'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getHeaders(),
})

export default axiosClassic
