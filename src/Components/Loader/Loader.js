import React from 'react'
import Loader from 'react-loader-spinner'

const CustomLoader = () => {
	return (
		<Loader
			type="ThreeDots"
			color="#00BFFF"
			height={100}
			width={100}
			timeout={30000} //3 secs
			alignSelf="center"
			justifyContent="center"
			alignItems="center"
		/>
	)
}

export default CustomLoader
