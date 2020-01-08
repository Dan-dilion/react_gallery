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

import { setJpegs } from '../actions/fileActions.js';

// const path = require('path');

class App extends React.Component {
	render() {
		return (
			<div className="container">
			<Router basename={process.env.PUBLIC_URL}>
		    	<div className="app">
		      		<Header />
					<Switch>
						<Route exact path={"/"} component={Home} />

						<Route
							path={"/home"}
							component={Home}
						/>

						<Route
							path={"/gallery"}
							render={(props) => <Gallery
								getJpegs={this.props.jpegs}
							/>}
						/>

						<Route
							path={"/single"}
							render={(props) => <SingleImage
								getJpegs={this.props.jpegs}
							/>}
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
//		files: state.fileReducer
		jpegs: state.jpegs
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		SET_JPEGS: (jpegs) => {
			dispatch(setJpegs(jpegs));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
