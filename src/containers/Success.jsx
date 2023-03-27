import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Map from '../components/Map'
import useGoogleAddress from '../hooks/useGoogleAddress'
import '../styles/components/Success.css'

const Success = () => {
	const { state } = useContext(AppContext)
	const { buyer } = state
	const { address, city, country } = buyer[0]
	const location = useGoogleAddress(`${address}, ${city}, ${country}`)
	const { name } = buyer[0]
	if (!location) {
		return <div>Map cannot be loaded right now, sorry.</div>
	}
	return (
		<div className='Success'>
			<div className='Success-content'>
				<h2>{`${name}, Gracias por tu compra`}</h2>
				<span>Tu pedido llegará en tres días a tu dirección</span>
				<div className='Success-map'>
					{location ? <Map data={location} /> : <></>}
				</div>
			</div>
		</div>
	)
}

export default Success
