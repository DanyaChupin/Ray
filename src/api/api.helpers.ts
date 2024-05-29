const API_KEY = '1evO4bgf2uiJGlmzsorurUN9zrOXOboAvLS8b27vM3T'
export const getHeaders = () => ({
	'Content-Type': 'application/json',

	Authorization: `Bearer ${API_KEY}`,
})
