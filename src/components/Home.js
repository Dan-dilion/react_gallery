import React from "react";
// import { render } from "react-dom";

import { Header } from './Header.js';
import { Welcome } from './Welcome.js';

export const Home = (props) => {
	return(
		<div className="home-container">
			<Header getBasket={props.getBasket} />
			{ Welcome() }
    </div>
	);
}
