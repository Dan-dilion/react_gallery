import '../css/Header.css';

import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js';

//export class Header extends React.Component {
export const Header = (props) => {

  function homeButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
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

  function basketButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
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

  function galleryButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
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

  function downloadButton(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    let files = [];
    if (status) {
      classNames = 'funcbar-items disable-selection';
      files = props.getBasket.map( item => item.file )
    }
    return (
      <a
        href={ zipJpegs( files ) }
      ><li
        id='nav-button'
        className={ classNames }
      > Download </li></a>
    )
  }

  function addAll(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) classNames = 'funcbar-items disable-selection';
    return(
      <div
        className={ 'nav-button' }
        onClick={ () => {
          if (status) {
            props.addAll(props.getJpegs)
            props.changePage('gallery')
          }
        } }
      ><li
        id='nav-button'
        className={ classNames }
      > Add All to Basket</li></div>
    )
  }

  function emptyBasketButton(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) classNames = 'funcbar-items disable-selection';
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

  function buttonPicker(button) {
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
          props.selectedPage !== 'home'
          && props.getBasket.length !== 0
        )
        return downloadButton(1);
        else return downloadButton(0);

      case 'addAll':
        if (
          props.selectedPage !== 'home'
          && props.getJpegs.length !== props.getBasket.length
          && props.selectedPage === 'gallery'
        )
        return addAll(1);
        else return addAll(0);

      case 'emptyBasket':
        if (
          props.selectedPage !== 'home'
          && props.getBasket.length > 0
        )
        return emptyBasketButton(1);
        else return emptyBasketButton(0);

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

      <Link to={'/home'} onClick={ () => props.changePage('home') }>
			    <h1 className={'logo'}>React Gallery</h1>
      </Link>

      <ul className="function-bar">
      { buttonPicker('download') }
      { buttonPicker('addAll') }
      { buttonPicker('emptyBasket') }
      </ul>
		</div>
	);
}
