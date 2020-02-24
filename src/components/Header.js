import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js'

export const Header = (props) => {

  const urlRoute = () => {
    let pathNames = window.location.pathname.split('/')
    return '/' + pathNames[pathNames.length - 1];
  }

  let basketSelected = 'navbar-items disable-selection';
  let gallerySelected = 'navbar-items disable-selection';
  let homeSelected = 'navbar-items disable-selection';
  if (urlRoute() == '/basket') basketSelected = 'selected navbar-items disable-selection';
  if (urlRoute() == '/gallery') gallerySelected = 'selected navbar-items disable-selection';
  if (urlRoute() == '/home') homeSelected = 'selected navbar-items disable-selection';

  console.log('URL: ', urlRoute())
  console.log('STYLE: ', gallerySelected)
	const basketButton = () => {
		return(
			<Link
        className={'nav-button'}
				to={'/basket'}
			><li
				className={" navbar-items disable-selection"}
				id="basket-button"
			>Basket ({props.getBasket.length})</li></Link>
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

  const downloadButton = (status) => {
    if (status) return (
			<a
        className={'nav-button'}
				href={zipJpegs(props.getBasket.map((item) => {return item.file;} ))}
			><li
				className={"funcbar-items disable-selection"}
				id="download-button"
			>Download ({props.getBasket.length})</li></a>
		)
    else return (
      <div
        className={'nav-button'}
			><li
				className={"funcbar-items funcbar-items-ghost disable-selection"}
				id="download-button"
			>Download ({props.getBasket.length})</li></div>
		)
	}

	const addAll = () => {
		return(
			<Link
        className={'nav-button'}
				to={'/gallery'}
				onClick={ async () => { await props.getJpegs.forEach( async item => await props.addBasket(item))} }
			><li
				className="funcbar-items disable-selection"
			>Add All ({props.getJpegs.length})</li></Link>
		)
	}

  const emptyBasketButton = (status) => {
    if (status) { return(
      <div
        className={'nav-button'}
      ><li
        className="funcbar-items disable-selection"
      >Empty Basket</li></div>
    ) } else return (
      <div
        className={'nav-button'}
      ><li
        className="funcbar-items-ghost disable-selection"
      >Empty Basket</li></div>
    )

  }

	const buttonPicker = (button) => {
    if (urlRoute() === '/gallery' || urlRoute() === '/basket'){
		  switch (button) {
  			case 'download':
          if (props.getBasket.length > 0) return downloadButton(1);
				  else return downloadButton(0);

        case 'fillBasket':
          if (urlRoute() === '/gallery') return addAll();
          else if (urlRoute() === '/basket' && props.getBasket.length > 0) return emptyBasketButton(1);
				  else return emptyBasketButton(0);

  			default:
  				break;

		  }
	  }
  }

	return(
		<div className="app-header">
      <ul className="navbar">
        <Link
          className={'nav-button'}
          to={'/home'}
        ><li
          className={homeSelected}
        >About</li></Link>
        <Link
          className={'nav-button'}
  				to={'/gallery'}
  			><li
  				className={gallerySelected}
  			>Gallery</li></Link>
        <Link
          className={'nav-button'}
          to={'/basket'}
        ><li
          className={basketSelected}
          id="basket-button"
        >Basket</li></Link>
      </ul>

      <Link to={'/home'}>
			    <h1 className={'logo'}>React Gallery</h1>
      </Link>

      <ul className="function-bar">
      { buttonPicker('download') }
      { buttonPicker('fillBasket') }
      </ul>

		</div>
	);
}
