import { useState, useEffect } from 'react'
import axios from 'axios'

const getCoordinates = async (api) => {
	const response = await axios(api)
	return response
}

const useGoogleAddress = (address) => {
	const [map, setMap] = useState({})
	const API_KEY = process.env.GOOGLE_MAPS_API_KEY
	const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`

	useEffect(() => {
		const handler = async () => {
			const res = await getCoordinates(API)
			setMap(res.data.results[0]?.geometry.location)
		}
		handler()
	}, [])
	return map
}

export default useGoogleAddress
