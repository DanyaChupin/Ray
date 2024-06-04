import axios from 'axios'
export const axiosClassic = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `APIKey ${process.env.NEXT_PUBLIC_API_KEY}`,
	},
})

export default axiosClassic
