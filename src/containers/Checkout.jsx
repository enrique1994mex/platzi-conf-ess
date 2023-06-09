import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import '../styles/components/Checkout.css'

const Checkout = () => {
	const { state, removeFromCart } = useContext(AppContext)
	const { cart } = state

	const handleRemove = (product, i) => () => {
		removeFromCart(product, i)
	}

	const handleSumTotal = () => {
		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue.price
		const sum = cart.reduce(reducer, 0)
		return sum
	}
	return (
		<div className='Checkout'>
			<div className='Checkout-content'>
				{cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos...</h3>}
				{cart.map((item, i) => (
					<div key={item.id} className='Checkout-item'>
						<div className='Checkout-element'>
							<h4>{item.title}</h4>
							<span>${item.price}</span>
						</div>
						<button type='button' onClick={handleRemove(item, i)}>
							<FaTrashAlt title='Eliminar' size='1.2rem' />
						</button>
					</div>
				))}
			</div>
			{cart.length > 0 && (
				<div className='Checkout-sidebar'>
					<h3>{`Precio total: $${handleSumTotal()}`}</h3>
					<Link to='/checkout/information'>
						<button type='button'>Continuar pedido</button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default Checkout
