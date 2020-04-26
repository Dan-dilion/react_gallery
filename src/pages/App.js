import React from 'react';
import { BrowserRouter as Router,
 	Route,
	Switch
} from "react-router-dom";
import { connect } from 'react-redux';

// Import all my components
import { Header } from '../components/Header.js';
import { Home } from '../components/Home.js';
import { Gallery } from '../components/Gallery.js';
import { SingleImage } from '../components/SingleImage.js';
import { Basket } from '../components/Basket.js';
import { FullSize } from '../components/FullSize.js';

// Import Redux actions from basketReducer
import {
	addBasket,
  addAll,
	removeBasket,
  removeBasketFadeDelay,
  emptyBasket,
} from '../actions/basketActions.js';

// Import Redux actions from fileReducer
import {
  refreshJpegs,
  toggleIsFetching
} from '../actions/fileActions.js';


// The App component has the React router in. It is the only component that
// instantiates the React component class. All other components are function
// components.
class App extends React.Component {
  constructor() {
    super();

    const urlRoute = () => {
      let pathNames = window.location.pathname.split('/')
      if (pathNames[pathNames.length - 1]) return pathNames[pathNames.length - 1];
      else return 'home';
    }

// This is the React state (separate from the Redux Store)
    this.state={
      selectedPage: urlRoute()
    };
  }

  changePage(newPage) {
    this.setState({
      selectedPage: newPage
    })
  }

// The Root React Render DOM
	render() {
		return (
			<div id="container">

{/*
* React router element with set base URL (environment variable retrieved from
* "homepage" attribute in package.json) used for deployment to a subdirectory.
* React's route switcher element
*/}
				<Router basename={process.env.PUBLIC_URL}>

{/*
* The header component will be displayed in front of every other route.
* selectedPage is passed to the header component as a prop and provides access
* to this components only state variable.
* changePage is a function that is passed in as a prop that provides the ability
* to change this components only state variable (this.state.selectedPage).
* getJpegs and getBasket are passed as props to the routed component. They
* provide access to and subscribe to state variables in the Redux store.
* addAll and emptyBasket provide access to dispatchable Redux actions
*/}
          <Header
            selectedPage={this.state.selectedPage}
            changePage={(newPage) => this.changePage(newPage)}
            getJpegs={this.props.jpegs}
            getBasket={this.props.basket}
            addAll={this.props.ADD_ALL}
            emptyBasket={this.props.EMPTY_BASKET}
          />

{/* All routes will be children of this 'app' element */}
			    <div id="app">
  					<Switch>


{/*
* Route -- Home screen
* Force exact match so route not triggered for all URLs beginning with '/'.
* If no route default to homescreen
*/}
  						<Route
  							exact path={"/"}
  							component={Home}
  						/>


{/*
* Route -- Home/about screen
*/}
  						<Route
  							path={"/home"}
  							component={Home}
  						/>

              <Route
  							path={"/about"}
  							component={Home}
  						/>

{/*
* Route -- Gallery view
* URL endpoint to activate route switch
* Render function returns the component to the DOM and passes in the props.
* selectedPage is passed to the component as a prop and provides access to this
* components only state variable.
* getJpegs, getBasket and isFetchingJpegs are passed as props to the routed
* component. They provide access to and subscribe to state variables in
* the Redux store.
* addBasket, removeBasket, refreshJpegs, toggleIsFetching provide access to
* dispatchable Redux actions
*/}
  						<Route
  							path={"/gallery"}
  							render={ (props) => <Gallery
                  selectedPage={this.state.selectedPage}
  								getJpegs={this.props.jpegs}
                  isFetchingJpegs={this.props.isFetchingJpegs}
                  toggleIsFetching={this.props.TOGGLE_FLAG}
                  refreshJpegs={this.props.refreshJpegs}
                  getBasket={this.props.basket}
  								addBasket={this.props.ADD_BASKET}
  								removeBasket={this.props.REMOVE_BASKET}
  							/>}
  						/>

{/*
* Route -- Basket view
*/}
  						<Route
  							path={"/basket"}
  							render={(props) => <Basket
                  selectedPage={this.state.selectedPage}
  								getBasket={this.props.basket}
  								removeBasket={this.props.removeBasketFadeDelay}
                  getJpegs={this.props.jpegs}
  							/>}
  						/>

{/*
* Route -- Single view (image slider)
*/}
  						<Route
  							path={"/single"}
  							render={(props) => <SingleImage
                  selectedPage={this.state.selectedPage}
  								getBasket={this.props.basket}
  								addBasket={this.props.ADD_BASKET}
  								removeBasket={this.props.REMOVE_BASKET}
                  refreshJpegs={this.props.refreshJpegs}
                  getJpegs={this.props.jpegs}
                  isFetchingJpegs={this.props.isFetchingJpegs}
                  toggleIsFetching={this.props.TOGGLE_FLAG}
  							/>}
  						/>

{/*
* Route -- Full size image view.
* There are no props for this component.
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
    isFetchingJpegs: state.fileReducer.isFetching,
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
    removeBasketFadeDelay: (index) => {
      dispatch(removeBasketFadeDelay(index));
    },
    EMPTY_BASKET: () => {
      dispatch(emptyBasket());
    },
    TOGGLE_FLAG: (state) => {
      dispatch(toggleIsFetching(state));
    },
    refreshJpegs: () => {
      dispatch(refreshJpegs());
    }
	};
};

/*
* The connect() method binds mapDispatchToProps and mapStateToProps to the
* App component allowing their attributes to be passed as props via this.props.
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
