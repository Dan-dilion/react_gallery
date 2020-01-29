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
			><a
				href={zipJpegs(props.getBasket)}
			>Download ({props.basketQuantity})</a></li>
		)
	}

	const galleryButton = () => {
		return(
			<li
				className="navbar-items"
			><Link
				to={'/gallery'}
			>Gallery</Link></li>
		)
	}

	const downloadAllButton = () => {
		return(
			<li
				className="navbar-items"
			><Link
				to={'/gallery'}
				onClick={() => { props.getJpegs.forEach(file => props.addBasket(file))} }
			>All To Basket ({props.getJpegs.length})</Link></li>
		)
	}

	const buttonPicker = (button) => {
		const urlRoute = () => {
			let pathNames = window.location.pathname.split('/')
			console.log('pathNames: ', pathNames)
			return '/' + pathNames[pathNames.length - 1];
		}

		switch (button) {
			case 'basket':
				console.log('buttonPicker: ', urlRoute())
				if (urlRoute() == '/basket' && props.basketQuantity) return downloadButton();
				else return basketButton();
				break;
			case 'gallery':
				console.log('galleryButtonDecider: ', urlRoute())
				if (urlRoute() == '/gallery') return downloadAllButton();
				else return galleryButton();
				break;
		}
	}

	return(
		<div>
			<div className="app-header">
				<h1>React Gallery</h1>
				<nav className="navbar">
					<div>
						<ul>
							<li className="navbar-items"><Link to={'/home'}>Home</Link></li>
							{ buttonPicker('gallery') }
							{ buttonPicker('basket') }
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}
