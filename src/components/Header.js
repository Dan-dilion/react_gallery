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
			>Basket ({props.getBasket.length})</Link></li>
		)
	}

	const downloadButton = () => {
		return (
			<li
				className="navbar-items"
				id="download-button"
			><a
				href={zipJpegs(props.getBasket)}
			>Download ({props.getBasket.length})</a></li>
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
			return '/' + pathNames[pathNames.length - 1];
		}

		switch (button) {
			case 'basket':
				if (urlRoute() === '/basket' && props.getBasket.length) return downloadButton();
				else return basketButton();
				break;
			case 'gallery':
				if (urlRoute() === '/gallery') return downloadAllButton();
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
