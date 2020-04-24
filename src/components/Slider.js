import React from 'react';
import { useTransition, animated } from 'react-spring';


export const Slider = (index, jpegs, props) => {

// CSS keyframes for the Spring animation
	const transitions = useTransition(jpegs[index], item => item.id, {
		from: {opacity: 0, transform: 'scale(1.2)'},
		enter: {opacity: 1, transform: 'scale(1)'},
		leave: {opacity: 0, transform: 'scale(0.8)'},
	})

	return transitions.map(({item, props, key}) => {
		return (
			<animated.div
				className={'slider'}
				key={key}
				style={{
					backgroundImage: `url(./images/resize1024/${
            encodeURIComponent(item.file).replace(/\(/g, "%28").replace(/\)/g, "%29")
          })`,
					...props
				}}
			/>
		)
	})

}
