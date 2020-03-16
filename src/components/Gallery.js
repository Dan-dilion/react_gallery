import React, { useEffect } from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/utils.js'

export const Gallery = (props) => {


  useEffect( () => {                        // Use Effect is like componentDidMount for Function (stateless) components.
    const asyncWrapper = async () =>{       // I have wrapped refreshJpegs() in this async function because when using
      await props.refreshJpegs()            // the await method the function will return an empty promise even if there
    }                                       // is no data to return.
    asyncWrapper()                          // This way asyncWrapper() returns nothing and refreshJpegs() is called and
  }, [])                                    // waited for completion without error.

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
			{imageComponent(resequenceJpegs(props.getJpegs))}
		</div>
	);
}
