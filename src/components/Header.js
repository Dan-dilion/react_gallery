import '../css/Header.css';

import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js';

export const Header = (props) => {

// homeButton() is the 'About' button!
  function homeButton(status) {
    let classNames = 'navbar-items';
    if (status) classNames = 'selected navbar-items';       // adds the 'selected' class name if status is true
    return(
      <Link
        className={ 'nav-button' }
        to={ '/home' }
        onClick={ () => props.changePage('home') }
      ><li
        id='nav-button'
        className={ classNames }
      >About</li></Link>
    )
  }

// basketButton()
  function basketButton(status) {
    let classNames = 'navbar-items';
    if (status) classNames = 'selected navbar-items';       // adds the 'selected' class name if status is true
    return(
      <Link
        className={ 'nav-button' }
        to={'/basket'}
        onClick={ () => props.changePage('basket') }
      ><li
        className={classNames}
        id="basket-button"
      ><div>Basket</div><div>( { props.getBasket.length } )</div></li></Link>
    )
  }

// galleryButton()
  function galleryButton(status) {
    let classNames = 'navbar-items';
    if (status) classNames = 'selected navbar-items';       // adds the 'selected' class name if status is true
    return(
      <Link
        className={ 'nav-button' }
        to={ '/gallery' }
        onClick={ () => props.changePage('gallery') }
      ><li
        id='nav-button'
        className={ classNames }
      >Gallery</li></Link>
    )
  }

// downloadButton()
  function downloadButton(status) {
    let classNames = 'funcbar-items disable-selection funcbar-items-ghost';     // If status is true remove the 'ghost' classname
    if (status) classNames = 'funcbar-items';                                   // "disable-selection" is only necessary for div elements

// a conditional/turnery return statement that will return a disfunctional button if status is false
    return ( status ?
      <a
        href={ zipJpegs( props.getBasket.map( item => item.file ) ) }
      ><li
        id='nav-button'
        className={ classNames }
      > Download </li></a> :
      <div><li
        id='nav-button'
        className={ classNames }
      > Download </li></div>
    )
  }

// addAll()
  function addAll(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';     // "disable-selection" is only necessary for divs, it disables text selection
    if (status) classNames = 'funcbar-items disable-selection';                 // If status is true remove 'funcbar-items-ghost' from classNames
    return(
      <div
        className={ 'nav-button' }
        onClick={ () => { if (status) props.addAll(props.getJpegs) } }
      ><li
        id='nav-button'
        className={ classNames }
      > Add All to Basket</li></div>
    )
  }

// emptyBasketButton()
  function emptyBasketButton(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';     // "disable-selection" is only necessary for divs, it disables text selection
    if (status) classNames = 'funcbar-items disable-selection';                 // If status is true remove 'funcbar-items-ghost' from classNames
    return(
      <div
        className={ 'nav-button' }
        onClick={ () => { if (status) props.emptyBasket() } }
      ><li
        id='nav-button'
        className={ classNames }
      >Empty Basket</li></div>
    )
  }

// buttonDispenser() inputs the type of button and will dispense the appropriate
// button with the appropriate state
  const buttonDispenser = (button) => {
    switch (button) {
      case 'home':
        if (props.selectedPage === 'home')
          return homeButton(1);
        else return homeButton(0);

      case 'gallery':
        if (props.selectedPage === 'gallery')
          return galleryButton(1);
        else return galleryButton(0);

      case 'basket':
        if (props.selectedPage === 'basket')
          return basketButton(1);
        else return basketButton(0);

      case 'download':
        if (
          props.selectedPage !== 'home'                       // If not on homepage and
          && props.getBasket.length !== 0                     // there are items in the basket
        )
        return downloadButton(1);
        else return downloadButton(0);

      case 'addAll':
        if (
          props.getJpegs.length !== props.getBasket.length    // If all images are not already in the
          && props.selectedPage === 'gallery'                 // basket and selected page is 'gallery'
        )
        return addAll(1);
        else return addAll(0);

      case 'emptyBasket':
        if (
          props.selectedPage !== 'home'                       // If not on homepage and
          && props.getBasket.length > 0                       // basket is not empty
        )
        return emptyBasketButton(1);
        else return emptyBasketButton(0);

      default: break;
    }
  }

// The main header element defines the navbar, the title and the function=bar
// It calls the button dispenser for each button and sets the title.
	return(
		<div id="app-header">
      <ul id="navbar">
        { buttonDispenser('home') }
        { buttonDispenser('gallery') }
        { buttonDispenser('basket') }
      </ul>

      <Link to={'/home'} onClick={ () => props.changePage('home') }>
			    <h1 id='logo'>React Gallery</h1>
      </Link>

      <ul id="function-bar">
      { buttonDispenser('download') }
      { buttonDispenser('addAll') }
      { buttonDispenser('emptyBasket') }
      </ul>
		</div>
	);
}
