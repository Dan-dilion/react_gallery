import React from "react";
import { Link } from "react-router-dom";

import { zipJpegs } from '../utils/serverRequest.js';

export class Header extends React.Component {

  homeButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
    return(
      <Link
        className={ 'nav-button' }
        to={ '/home' }
        onClick={ () => this.props.changePage('home') }
      ><li
        id='nav-button'
        className={ classNames }
      >About</li></Link>
    )
  }

  basketButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
    return(
      <Link
        className={ 'nav-button' }
        to={'/basket'}
        onClick={ () => this.props.changePage('basket') }
      ><li
        className={classNames}
        id="basket-button"
      ><div>Basket</div><div>( { this.props.getBasket.length } )</div></li></Link>
    )
  }

  galleryButton(status) {
    let classNames = 'navbar-items disable-selection';
    if (status) classNames = 'selected navbar-items disable-selection';
    return(
      <Link
        className={ 'nav-button' }
        to={ '/gallery' }
        onClick={ () => this.props.changePage('gallery') }
      ><li
        id='nav-button'
        className={ classNames }
      ><div>Gallery</div><div>( { this.props.getJpegs.length } )</div></li></Link>
    )
  }

  downloadButton(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    let files = [];
    if (status) {
      classNames = 'funcbar-items disable-selection';
      files = this.props.getBasket.map( item => item.file )
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

  addAll(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) classNames = 'funcbar-items disable-selection';
    return(
      <div
        className={ 'nav-button' }
        onClick={ () => {
          if (status) {
            this.props.addAll(this.props.getJpegs)
            this.props.changePage('gallery')
          }
        } }
      ><li
        id='nav-button'
        className={ classNames }
      > Add All to basket</li></div>
    )
  }

  emptyBasketButton(status) {
    let classNames = 'funcbar-items funcbar-items-ghost disable-selection';
    if (status) classNames = 'funcbar-items disable-selection';
    return(
      <div
        className={ 'nav-button' }
        onClick={ () => { if (status) this.props.emptyBasket() } }
      ><li
        id='nav-button'
        className={ classNames }
      >Empty Basket</li></div>
    )
  }

  buttonPicker(button) {
    switch (button) {

      case 'home':
        if (this.props.selectedPage === 'home')
          return this.homeButton(1);
        else return this.homeButton(0);

      case 'gallery':
        if (this.props.selectedPage === 'gallery')
          return this.galleryButton(1);
        else return this.galleryButton(0);

      case 'basket':
        if (this.props.selectedPage === 'basket')
          return this.basketButton(1);
        else return this.basketButton(0);

      case 'download':
        if (
          this.props.selectedPage !== 'home'
          && this.props.getBasket.length !== 0
        )
        return this.downloadButton(1);
        else return this.downloadButton(0);

      case 'addAll':
        if (
          this.props.selectedPage !== 'home'
          && this.props.getJpegs.length !== this.props.getBasket.length
          && this.props.selectedPage === 'gallery'
        )
        return this.addAll(1);
        else return this.addAll(0);

      case 'emptyBasket':
        if (
          this.props.selectedPage !== 'home'
          && this.props.getBasket.length > 0
        )
        return this.emptyBasketButton(1);
        else return this.emptyBasketButton(0);

        default: break;
      }
  }

  render() {
  	return(
  		<div className="app-header">
        <ul className="navbar">
          { this.buttonPicker('home') }
          { this.buttonPicker('gallery') }
          { this.buttonPicker('basket') }
        </ul>

        <Link to={'/home'} onClick={ () => this.props.changePage('home') }>
  			    <h1 className={'logo'}>React Gallery</h1>
        </Link>

        <ul className="function-bar">
        { this.buttonPicker('download') }
        { this.buttonPicker('addAll') }
        { this.buttonPicker('emptyBasket') }
        </ul>
  		</div>
  	);
  }
}
