import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY}`,
	},
})

export default axiosClassic
