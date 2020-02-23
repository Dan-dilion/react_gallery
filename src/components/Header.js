import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js'

export const Header = (props) => {

	const basketButton = () => {
		return(
			<Link
				to={'/basket'}
			><li
				className="navbar-items standard-button disable-selection"
				id="basket-button"
			>Basket ({props.getBasket.length})</li></Link>
		)
	}

	const downloadButton = () => {
		return (
			<a
				href={zipJpegs(props.getBasket.map((item) => {return item.file;} ))}
			><li
				className="navbar-items standard-button disable-selection"
				id="download-button"
			>Download ({props.getBasket.length})</li></a>
		)
	}

	const galleryButton = () => {
		return(
			<Link
				to={'/gallery'}
			><li
				className="navbar-items standard-button disable-selection"
			>Gallery</li></Link>
		)
	}

	const downloadAllButton = () => {
		return(
			<Link
				to={'/gallery'}
				onClick={() => { props.getJpegs.forEach(item => props.addBasket(item))} }
			><li
				className="navbar-items standard-button disable-selection"
			>Add All ({props.getJpegs.length})</li></Link>
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
			case 'gallery':
				if (urlRoute() === '/gallery') return downloadAllButton();
				else return galleryButton();
			default:
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
							<Link to={'/home'}><li className="navbar-items standard-button disable-selection">Home</li></Link>
							{ buttonPicker('gallery') }
							{ buttonPicker('basket') }
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}
