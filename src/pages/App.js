import React from 'react';
import { BrowserRouter as Router,
 	Route,
	Switch
} from "react-router-dom";
import { connect } from 'react-redux';

// Import all my components
import { Home } from '../components/Home.js';
import { Gallery } from '../components/Gallery.js';
import { SingleImage } from '../components/SingleImage.js';
import { Basket } from '../components/Basket.js';
import { FullSize } from '../components/FullSize.js';

// Import Redux actions
import {
	addBasket,
  addAll,
	removeBasket,
  emptyBasket
} from '../actions/basketActions.js';

// The App component has the react Router in
class App extends React.Component {
	render() {
		return (
			<div className="container">


{/*
* React Router element with base URL
* app container element
* Route switcher element
*/}
				<Router basename={process.env.PUBLIC_URL}>
				    <div className="app">
						<Switch>


{/*
* First route -- Home screen
* Force exact match so route not triggered for all URLs.
* The render prop allows you to pass props to the render component in an inline
* function.
* getBasket prop is passed to the header so getBasket.length can be shown on the
* basket button.
*/}
							<Route
								exact path={"/"}
								render={(props) => <Home
                  getBasket={this.props.basket}
                  getJpegs={this.props.jpegs}
								/>}
							/>


{/*
* Second Route -- Home screen
* Path to activate switch
* inline function returns the component to render and the props to be passed in
* to the component. getBasket is passed to the header so getBasket.length can be
* shown on the basket button.
*/}
							<Route
								path={"/home"}
								render={(props) => <Home
									getBasket={this.props.basket}
                  getJpegs={this.props.jpegs}
								/>}
							/>

{/*
* Third Route -- Gallery view
* Path to activate switch
* inline function returns the component and passes in the props.
* getJpegs is itterated through to generate the thumnails.
* getJpegs and getBasket is passed to the headder component to show no. of items
* on the add-all and the basket buttons.
* getBasket is also used to pick either an add button or a remove button.
* addBasket and removeBasket are called by the add and remove buttons.
*/}
							<Route
								path={"/gallery"}
								render={(props) => <Gallery
									getJpegs={this.props.jpegs}
									getBasket={this.props.basket}
									addBasket={this.props.ADD_BASKET}
                  addAll={this.props.ADD_ALL}
									removeBasket={this.props.REMOVE_BASKET}
                  emptyBasket={this.props.EMPTY_BASKET}
								/>}
							/>

{/*
* Fourth route -- Basket view
* Path to activate switch
* inline function returns the component and passes in the props.
* getBasket to generate thumbnails and select add or remove button.
* removeBasket is called by the remove buttons
*/}
							<Route
								path={"/basket"}
								render={(props) => <Basket
									getBasket={this.props.basket}
									removeBasket={this.props.REMOVE_BASKET}
                  getJpegs={this.props.jpegs}
                  emptyBasket={this.props.EMPTY_BASKET}
								/>}
							/>

{/*
* Fifth route -- Single view (image slider)
* Path to activate switch
* getJpegs for next and previous list navigation
* getBasket for next and previous list navigation
* addBasket and removeBasket are called by the add and remove buttons.
*/}
							<Route
								path={"/single"}
								render={(props) => <SingleImage
									getJpegs={this.props.jpegs}
									getBasket={this.props.basket}
									addBasket={this.props.ADD_BASKET}
									removeBasket={this.props.REMOVE_BASKET}
								/>}
							/>

{/*
* Sixth route -- Full size image view.
* Path to activate switch.
* component to render.
* There are no props for this component therefore we don't need the render prop.
*/}
							<Route
								path={"/images/"}
								component={ FullSize }
							/>

						</Switch>
				    </div>
				</Router>
			</div>
		);
	}
}

/*
* map mapStateToProps allows us to pass objects in Redux's global state through
* to components in the react router.
*/
const mapStateToProps = (state) => {
	return {
		jpegs: state.fileReducer.jpegs,
		basket: state.basketReducer.basketJpegs
	};
};

/*
* mapDispatchToProps allows us to pass Redux's dispatchable actions through to
* components in the React router.
*/
const mapDispatchToProps = (dispatch) => {
	return {
		ADD_BASKET: (jpegItem) => {
			dispatch(addBasket(jpegItem));
		},
    ADD_ALL: (jpegsArray) => {
      dispatch(addAll(jpegsArray));
    },
		REMOVE_BASKET: (index) => {
			dispatch(removeBasket(index));
		},
    EMPTY_BASKET: () => {
      dispatch(emptyBasket());
    }
	};
};

/*
* The connect() method binds mapDispatchToProps and mapStateToProps to the
* App component allowing their attributes to be passed as props via this.props.
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
