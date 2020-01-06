import React from "react";

export const Gallery = (props) => {
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
									+ '?fileName='
									+ file
									+ '&index='
									+ i
								}
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
					<p>System Message: {files}</p>
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
				{imageComponent(props.getJpegs)}
			<p>{props.getJpegs}</p>
		</div>
	);
}
