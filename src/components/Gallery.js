

import React from "react";

// Fetch XHR promise
async function serverRequest(url) {
	console.log('1 - Fetching')
	let fetchPromise = await fetch(url)
		.then(response => {
				console.log('XHR Response', response);
				return response;
		})
		console.log('2 - Fetched')
	return fetchPromise;
}

export class Gallery extends React.Component {
	constructor() {
		super();
		this.state = {
			jpegs: []
		};
	}

	componentDidMount() {						// componentDidMount() is part of the React lifecycle and will be
		console.log("ComponentDidMount");		// called every time a component is renendered/mounted.

		this.setState({
			jpegs: 'Processing Images Please wait...'
		})
// fetch() call
		console.log('0 - envoking request')
		serverRequest('http://localhost:8987/api/getjpegs')			// Make server request
			.then( response => {									// Error Handeling (if there is an error it will be text)
				if (response.ok) return response.json()				// If no error: converts the data streem into json object
				else return response.text()							// If Error: converts data stream in to text object
			})
			.then( responseData => {								// deposit returned data
				this.setState({										// in to the state variable
					jpegs: responseData								// which will trigger the
				})													// rerendering of all the
			})														// components that use
	}																// the variable.

	render() {
		console.log('3 - rendering')

// The imageSuccess function will be run in the case
// that getJpegs() returns an array, it contains the
// JSX for the webpage. Notice how it iterates through
// the jpegs array using the array.map method and for
// each itteration it returns a unique JSX image element.
// It uses the array's index value to assign a
// unique key perameter to each element.
// the browser will throw an error if the elements aren't
// unique in this way although the page will still render.
		const imageSuccess = (files) => {
			return (
				<div className="phcontainer">
					{files.map((file, i) => {
						return (
							<div key={i}>
								<a
									href={
										process.env.PUBLIC_URL
										+ 'single/'
										+ file
									}
									jpegs={this.state.jpegs}
								>
									<img
										alt={"Resizing Image... " + file}
										className="images"
										key={i}
										src={process.env.PUBLIC_URL
											+ "images/resize300/"
											+ file
										}
									/>
								</a>
							</div>
						);
					})}
				</div>
			)
		}


// The imageFail function will be called in the case that
// getJpegs() returns anything other that an array signifying
// that there was an error.
		const imageFail = (files) => {
			return(
				<div className="phcontainer">
					<div>
						<p>Error: {files}</p>
					</div>
				</div>
			)
		}


		let imageComponent = (files) => {
			if (Array.isArray(files)) {
				return imageSuccess(files);
			}
			else {
				return imageFail(files);
			}
		}


		return(
			<div>
				<h3>This is going to be my gallery</h3>
					{imageComponent(this.state.jpegs)}
				<p>{this.state.jpegs}</p>
			</div>
		);
	}
}
