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
			><a
				href={zipJpegs(props.getJpegs)}
			>Download All ({props.getJpegs.length})</a></li>
		)
	}

	const buttonPicker = (button) => {
		switch (button) {
			case 'basket':
				console.log('basketButtonDecider: ', window.location.pathname)
				if (window.location.pathname === '/basket' && props.basketQuantity) return downloadButton();
				else return basketButton();
				break;
			case 'gallery':
				console.log('galleryButtonDecider: ', window.location.pathname)
				if (window.location.pathname === '/gallery') return downloadAllButton();
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
