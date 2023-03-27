import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const Map = ({ data }) => {
	const containerStyle = {
		width: '400px',
		height: '400px',
	}

	const center = {
		lat: parseFloat(data.lat),
		lng: parseFloat(data.lng),
	}
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
	})

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>
	}

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
			<Marker position={center} />
			{/* Child components, such as markers, info windows, etc. */}
		</GoogleMap>
	) : (
		<></>
	)
}

export default Map
