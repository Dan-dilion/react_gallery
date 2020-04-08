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

// Import Redux actions
import {
	addBasket,
  addAll,
	removeBasket,
  emptyBasket,
} from '../actions/basketActions.js';

import {
  refreshJpegs,
  toggleIsFetching
} from '../actions/fileActions.js';


// The App component has the react Router in
class App extends React.Component {
  constructor() {
    super();

    const urlRoute = () => {
      let pathNames = window.location.pathname.split('/')
      if (pathNames[pathNames.length - 1]) return pathNames[pathNames.length - 1];
      else return 'home';
    }

    this.state={
      selectedPage: urlRoute()
    };
  }

  changePage(newPage) {
    this.setState({
      selectedPage: newPage
    })
  }


	render() {

    console.log('This urlRoute: ', this.state.selectedPage);

		return (
			<div className="container">

{/*
* React Router element with base URL
* The header component to be displayed on every route
* app container element
* Route switcher element
*/}
				<Router basename={process.env.PUBLIC_URL}>

          <Header
            selectedPage={this.state.selectedPage}
            changePage={(newPage) => this.changePage(newPage)}
            getJpegs={this.props.jpegs}
            getBasket={this.props.basket}
            addAll={this.props.ADD_ALL}
            emptyBasket={this.props.EMPTY_BASKET}
          />

          {/*<div className='header-spacer' />*/}

			    <div className="app">
  					<Switch>


{/*
* Route -- Home screen
* Force exact match so route not triggered for all URLs.
* If no route default to homescreen
*/}
  						<Route
  							exact path={"/"}
  							component={Home}
  						/>


{/*
* Route -- Home/about screen
* Path to activate switch
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
* Path to activate switch
* The render tag allows you to pass props to the render component in an inline
* function which returns the component to render.
* getJpegs is itterated through to generate the thumnails.
* getBasket is also used to pick either an add button or a remove button.
* addBasket and removeBasket are called by the add and remove buttons.
*/}
  						<Route
  							path={"/gallery"}
  							render={(props) => <Gallery
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
* Path to activate switch
* inline function returns the component and passes in the props.
* getBasket to generate thumbnails and select add or remove button.
* removeBasket is called by the remove buttons
*/}
  						<Route
  							path={"/basket"}
  							render={(props) => <Basket
                  selectedPage={this.state.selectedPage}
  								getBasket={this.props.basket}
  								removeBasket={this.props.REMOVE_BASKET}
                  getJpegs={this.props.jpegs}
  							/>}
  						/>

{/*
* Route -- Single view (image slider)
* Path to activate switch
* getJpegs for next and previous list navigation
* getBasket for next and previous list navigation
* addBasket and removeBasket are called by the add and remove buttons.
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
