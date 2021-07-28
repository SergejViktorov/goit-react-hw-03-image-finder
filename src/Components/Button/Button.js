import React from 'react'
import s from './button.module.css'
import PropTypes from 'prop-types'

const Button = ({ onClick }) => {
	return (
		<button type="button" className={s.Button} onClick={onClick}>
			Load more ...
		</button>
	)
}

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export default Button
