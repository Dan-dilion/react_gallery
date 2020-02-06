import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';


export const Slider = (index, jpegs, props) => {

	const item = jpegs[index];

	const transitions = useTransition(jpegs[index], item => item.id, {
		from: {opacity: 0, transform: 'scale(1.2)'},
		enter: {opacity: 1, transform: 'scale(1)'},
		leave: {opacity: 0, transform: 'scale(0.8)'},
	})

	console.log(index + ' ' + jpegs[index].file)
	console.log(window.location)



	return transitions.map(({item, props, key}) => {
		return (
			<animated.div
				className={'single-image'}
				key={key}
				style={{
					backgroundImage: `url(/images/resize1024/${encodeURIComponent(item.file)})`,
					...props
				}}
			/>
		)
	})

}
