import axios from 'axios'
import { getHeaders } from './api.helpers'

const API_URL = 'https://sandbox.api.video'
export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getHeaders(),
})

export default axiosClassic
