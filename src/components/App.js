import React from 'react';
import { BrowserRouter as Router,
 	Route,
	Switch
} from "react-router-dom";

import { Header } from "./Header.js";
import { Home } from "./Home.js";
import { Gallery } from "./Gallery.js";
import { SingleImage } from "./SingleImage.js";

// const path = require('path');

export default class App extends React.Component {
	render(){
		return (
			<div className="container">
			<Router>
		    	<div className="app">
		      		<Header />
					<Switch>
						<Route exact path={"/"} component={Home} />
						<Route path={"/home"} component={Home} />
						<Route path={"/gallery"} component={Gallery} />
						<Route path={"/single/:fileName"} component={SingleImage} />
					</Switch>
		    	</div>
			</Router>
			</div>
		);
	}
}
