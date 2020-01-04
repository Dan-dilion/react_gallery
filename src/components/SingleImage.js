import React from "react";

export class SingleImage extends React.Component {
//	constructor() {

//	}

	render() {
		const { params } = this.props.match;	// Make an object out of the URL perameters
		return(
			<div className="single-container">
				<div>
					<img
						alt={"File Not Found " + params.fileName}
						className="single-image"
						src={process.env.PUBLIC_URL
							+ "../images/resize1024/"
							+ params.fileName
						}
					/>

					<div className="prev-image">Prev</div>
					<div className="next-image">Next</div>

				</div>
			</div>



		)
	}
}
