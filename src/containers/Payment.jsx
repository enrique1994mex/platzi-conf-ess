import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import '../styles/components/Payment.css'

const Payment = () => {
	const navigate = useNavigate()
	const { state, addNewOrder } = useContext(AppContext)
	const { cart, buyer } = state

	const handleSumTotal = () => {
		const reducer = (acumulator, currentValue) =>
			acumulator + currentValue.price
		const sum = cart.reduce(reducer, 0)
		return sum
	}

	const handlePaymentSuccess = (data) => {
		if (data.status === 'COMPLETED') {
			const newOrder = {
				buyer,
				product: cart,
				payment: data,
			}
			addNewOrder(newOrder)
			navigate('/checkout/success')
		}
	}
	return (
		<div className='Payment'>
			<div className='Payment-content'>
				<h3>Resumen del pedido:</h3>
				{cart.map((item) => (
					<div className='Payment-item' key={item.title}>
						<div className='Payment-element'>
							<h4>{item.title}</h4>
							<span>${item.price}</span>
						</div>
					</div>
				))}
				<div className='Payment-button'>
					<PayPalScriptProvider
						options={{
							'client-id': process.env.PAYPAL_CLIENT_ID,
							currency: 'MXN',
							intent: 'capture',
						}}
					>
						<PayPalButtons
							createOrder={(data, actions) => {
								return actions.order
									.create({
										purchase_units: [
											{
												amount: {
													value: Number.parseFloat(
														handleSumTotal(cart)
													).toFixed(2),
												},
											},
										],
									})
									.then((orderId) => {
										return orderId
									})
							}}
							onApprove={(data, actions) => {
								return actions.order
									.capture()
									.then((data) => {
										handlePaymentSuccess(data)
									})
									.catch((error) => console.log(error))
							}}
							style={{ layout: 'vertical' }}
						></PayPalButtons>
					</PayPalScriptProvider>
				</div>
			</div>
		</div>
	)
}

export default Payment
