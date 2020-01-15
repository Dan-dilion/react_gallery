import React from 'react';
import { BrowserRouter as Router,
 	Route,
	Switch
} from "react-router-dom";
import { connect } from 'react-redux';

import { Header } from '../components/Header.js';
import { Home } from '../components/Home.js';
import { Gallery } from '../components/Gallery.js';
import { SingleImage } from '../components/SingleImage.js';
import { Basket } from '../components/Basket.js';
import { FullZize } from '../components/FullZize.js';


import { setJpegs } from '../actions/fileActions.js';
import {
	addBasket,
	removeBasket
} from '../actions/basketActions.js';

// const path = require('path');

class App extends React.Component {
	render() {
		return (
			<div className="container">
			<Router basename={process.env.PUBLIC_URL}>
		    	<div className="app">
					<Switch>
						<Route exact path={"/"} component={Home}>
							<Header basketQuantity={this.props.basket.length} />
						</Route>

						<Route
							path={"/home"}
							component={Home}
						>
							<Header basketQuantity={this.props.basket.length} />
						</Route>

						<Route
							path={"/gallery"}
							render={(props) => <Gallery
								getJpegs={this.props.jpegs}
								getBasket={this.props.basket}
								addBasket={(jpeg) => this.props.ADD_BASKET(jpeg)}
								removeBasket={(index) => this.props.REMOVE_BASKET(index)}
							/>}
						>
							<Header basketQuantity={this.props.basket.length} />
						</Route>

						<Route
							path={"/basket"}
							render={(props) => <Basket
								getBasket={this.props.basket}
								removeBasket={(index) => this.props.REMOVE_BASKET(index)}
							/>}
						>
							<Header basketQuantity={this.props.basket.length} />
						</Route>

						<Route
							path={"/single"}
							render={(props) => <SingleImage
								getJpegs={this.props.jpegs}
								getBasket={this.props.basket}
								addBasket={(jpeg) => this.props.ADD_BASKET(jpeg)}
								removeBasket={(index) => this.props.REMOVE_BASKET(index)}
							/>}
						>
							<Header basketQuantity={this.props.basket.length} />
						</Route>

						<Route
							path={"/images/"}
							component={FullZize}
						/>

					</Switch>
		    	</div>
			</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		jpegs: state.fileReducer.jpegs,
		basket: state.basketReducer.basketJpegs
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		ADD_BASKET: (jpeg) => {
			dispatch(addBasket(jpeg));
		},
		REMOVE_BASKET: (index) => {
			dispatch(removeBasket(index));
		},

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
