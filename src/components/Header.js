import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js'

export const Header = (props) => {

	const basketButton = () => {
		return(
			<Link
        className={'nav-button'}
				to={'/basket'}
			><li
				className="navbar-items disable-selection"
				id="basket-button"
			>Basket ({props.getBasket.length})</li></Link>
		)
	}

	const downloadButton = () => {
		return (
			<a
        className={'nav-button'}
				href={zipJpegs(props.getBasket.map((item) => {return item.file;} ))}
			><li
				className="navbar-items disable-selection"
				id="download-button"
			>Download ({props.getBasket.length})</li></a>
		)
	}

	const galleryButton = () => {
		return(
			<Link
        className={'nav-button'}
				to={'/gallery'}
			><li
				className="navbar-items disable-selection"
			>Gallery</li></Link>
		)
	}

	const downloadAllButton = () => {
		return(
			<Link
        className={'nav-button'}
				to={'/gallery'}
				onClick={() => { props.getJpegs.forEach(item => props.addBasket(item))} }
			><li
				className="navbar-items disable-selection"
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
		<div className="app-header">
      <ul className="navbar">
        <Link className={'nav-button'} to={'/home'}><li className="navbar-items disable-selection">Home</li></Link>
        { buttonPicker('gallery') }
        { buttonPicker('basket') }
      </ul>
      <Link to={'/home'}>
			    <h1 className={'logo'}>React Gallery</h1>
      </Link>

		</div>
	);
}
