import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js'

export const Header = (props) => {

  const homeButton = (status) => {
    let classNames = 'navbar-items disable-selection';
    if (status) { classNames = 'selected navbar-items disable-selection'; }
    return(
      <Link
        className={'nav-button'}
        to={'/home'}
      ><li
        id='nav-button'
        className={classNames}
      >About</li></Link>
    )
  }

	const basketButton = (status) => {
    let classNames = 'navbar-items disable-selection';
    if (status) { classNames = 'selected navbar-items disable-selection'; }
		return(
			<Link
        className={'nav-button'}
				to={'/basket'}
			><li
				className={classNames}
				id="basket-button"
			>Basket ({props.getBasket.length})</li></Link>
		)
	}

	const galleryButton = (status) => {
    let classNames = 'navbar-items disable-selection';
    if (status) { classNames = 'selected navbar-items disable-selection'; }
		return(
			<Link
        className={'nav-button'}
				to={'/gallery'}
			><li
        id='nav-button'
				className={classNames}
			>Gallery ({props.getJpegs.length})</li></Link>
		)
	}

  const downloadButton = (status) => {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) { classNames = 'funcbar-items disable-selection'; }
    return (
			<a
				href={zipJpegs(props.getBasket.map((item) => {return item.file;} ))}
			><li
        id='nav-button'
				className={classNames}
			> Download </li></a>
	  )
	}

	const addAll = (status) => {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) { classNames = 'funcbar-items disable-selection'; }
		return(
			<Link
        className={'nav-button'}
				to={'/gallery'}
				onClick={ () => props.addAll(props.getJpegs) }
			><li
        id='nav-button'
				className={classNames}
			> Add All to basket</li></Link>
		)
	}

  const emptyBasketButton = (status) => {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) { classNames = 'funcbar-items disable-selection'; }
    return(
      <div
        className={'nav-button'}
        onClick={() => props.emptyBasket()}
      ><li
        id='nav-button'
        className={classNames}
      >Empty Basket</li></div>
    )
  }

	const buttonPicker = (button) => {
    const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters
    const urlRoute = () => {
      let pathNames = window.location.pathname.split('/')
      return '/' + pathNames[pathNames.length - 1];
    }

    switch (button) {

      case 'home':
        if (urlRoute() == '/home' || urlRoute() == '/') return homeButton(1);
        else return homeButton(0);

      case 'gallery':
        if (urlRoute() == '/gallery' || urlParams.get('origin') === 'gallery') {
          return galleryButton(1);
        } else return galleryButton(0)

      case 'basket':
        if (urlRoute() == '/basket' || urlParams.get('origin') === 'basket') {
          return basketButton(1);
        }
        else return basketButton(0);

			case 'download':
        if ((urlRoute() !== '/' || urlRoute() !== '/home') && props.getBasket.length === 0) return downloadButton(0);
        else return downloadButton(1);

      case 'addAll':
        if ((urlRoute() !== '/' || urlRoute() !== '/home') && props.getJpegs.length !== props.getBasket.length && urlRoute() === '/gallery') return addAll(1);
        else return addAll(0);

      case 'emptyBasket':
        if ((urlRoute() !== '/' || urlRoute() !== '/home') && props.getBasket.length > 0) {
          return emptyBasketButton(1);
        } else return emptyBasketButton(0);

  			default: break;
		  }
  }

	return(
		<div className="app-header">
      <ul className="navbar">
        { buttonPicker('home') }
        { buttonPicker('gallery') }
        { buttonPicker('basket') }
      </ul>

      <Link to={'/home'}>
			    <h1 className={'logo'}>React Gallery</h1>
      </Link>

      <ul className="function-bar">
      { buttonPicker('download') }
      { buttonPicker('addAll') }
      { buttonPicker('emptyBasket')}
      </ul>

		</div>
	);
}
