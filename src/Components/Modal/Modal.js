import React, { Component } from 'react'
import s from './modal.module.css'
import PropTypes from 'prop-types'

export default class Modal extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown = (e) => {
		if (e.code === 'Escape') {
			this.props.onClose()
		}
	}

	handleBackdropClick = (e) => {
		if (e.currentTarget === e.target) {
			this.props.onClose()
		}
	}

	render() {
		return (
			<div className={s.Overlay} onClick={this.handleBackdropClick}>
				<div className={s.Modal}>{this.props.children}</div>
			</div>
		)
	}
}
