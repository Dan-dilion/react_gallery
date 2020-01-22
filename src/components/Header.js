import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js'

export const Header = (props) => {

	const basketButton = () => {
		return(
			<li
				className="navbar-items"
				id="basket-button"
			><Link
				to={'/basket'}
			>Basket ({props.basketQuantity})</Link></li>
		)
	}

	const downloadButton = () => {
		return (
			<li
				className="navbar-items"
				id="download-button"
			><Link
				to={'/basket'}
				onClick={() => {return zipJpegs(props.getBasket)}}
			>Download ({props.basketQuantity})</Link></li>
		)
	}

	const buttonPicker = () => {
		console.log('buttonDecider: ', window.location.pathname)
		if (window.location.pathname === '/basket') return downloadButton();
		else return basketButton();
	}

	return(
		<div>
			<div className="app-header">
				<h1>React Gallery</h1>
				<nav className="navbar">
					<div>
						<ul>
							<li className="navbar-items"><Link to={'/home'}>Home</Link></li>
							<li className="navbar-items"><Link to={'/gallery'}>Gallery</Link></li>
							{ buttonPicker() }
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}
