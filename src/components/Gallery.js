import '../css/Gallery.css';


import React, { useState, useEffect } from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/utils.js'

export const Gallery = (props) => {

//const [jpegs, setJpegs] = useState(resequenceJpegs(props.getJpegs))

  props.refreshJpegs()
  
  let jpegs = [];

  if (!props.isFetchingJpegs) jpegs = resequenceJpegs(props.getJpegs)
  console.log('Current Jpegs: ', jpegs.length + ' Is Fetching: ', props.isFetchingJpegs)


  const mediaQueryListener = window.matchMedia('(max-width: 800px)')      // This is the condition that will trigger the Media Query Listener
  const mediaQueryAction = (action) => {
    console.log('matchMedia Action Called!!!')                            // This is the action it will take when the condition is matched
    if (action.matches) {                                                 //
      console.log('Viewport is 800px or less')                            //
      props.toggleIsFetching(true);
      jpegs = resequenceJpegs(jpegs);                                     //
      props.toggleIsFetching(false);
    } else {                                                              //
      console.log('Viewport is larger than 800px!')                       //
      props.toggleIsFetching(true);
      jpegs = resequenceJpegs(jpegs);                                     //
      props.toggleIsFetching(false);
    }
  }
  mediaQueryListener.addListener(mediaQueryAction)

	const imageSuccess = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, item, i) )
		})
	}

	// The imageFail function will be called in the case that
	// getJpegs() returns anything other than an array signifying
	// that there was an error.
	const imageFail = (jpegs) => {
		return(
			<div className="ph_fail_container">
				<div>
					<p>System Message: {jpegs}</p>
				</div>
			</div>
		)
	}

	let imageComponent = (jpegs) => {
		if (Array.isArray(jpegs)) {
			return imageSuccess(jpegs);
		}
		else {
			return imageFail(jpegs);
		}
	}

	return( !props.isFetchingJpegs ?
		<div className="phcontainer">
      {/*<button onClick={() => props.refreshJpegs()} >PressMe</button>*/}
			{imageComponent(jpegs)}
		</div> :
    <div> <h2>Loading Images...</h2> </div>
	);
}
