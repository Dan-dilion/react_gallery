import React, { useState, useEffect } from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/utils.js'

export const Gallery = (props) => {

const [jpegs, setJpegs] = useState(resequenceJpegs(props.getJpegs))

  useEffect( () => {                                                      // Use Effect is like componentDidMount for Function (stateless) components.
    const asyncWrapper = async () =>{                                     // I have wrapped refreshJpegs() in this async function because when using
      console.log('Gallery Calling Refresh')
      await props.refreshJpegs()                                          // the await method the function will return an empty promise even if there
      console.log('Gallery: Refresh called: ' + props.getJpegs.length)
    }                                                                     // is no data to return.
    asyncWrapper()                                                        // This way asyncWrapper() returns nothing and refreshJpegs() is called and
  }, [])                                                                  // waited for completion without error.



  const mediaQueryListener = window.matchMedia('(max-width: 800px)')      // This is the condition that will trigger the Media Query Listener
  const mediaQueryAction = (action) => {                                  // This is the action it will take when the condition is matched
    if (action.matches) {                                                 //
      console.log('Viewport is 800px or less')                            //
      setJpegs(resequenceJpegs(jpegs));                                   //
    } else {                                                              //
      console.log('Viewport is larger than 800px!')                       //
      setJpegs(resequenceJpegs(jpegs));                                   //
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

	return(
		<div className="phcontainer">
      {/*<button onClick={() => props.refreshJpegs()} >PressMe</button>*/}
			{imageComponent(jpegs)}
		</div>
	);
}
