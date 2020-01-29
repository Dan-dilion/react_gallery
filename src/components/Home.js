import React from "react";
// import { render } from "react-dom";

import { Header } from './Header.js';

export const Home = (props) => {
	return(
		<div className="home-container">
			<Header getBasket={props.getBasket} />

			<h3>This is my home page. Welcome!!!</h3>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
			<p>This is a whole load of text about nothing much at all and in no perticular font with nothing important to say</p>
		</div>
	);
}
