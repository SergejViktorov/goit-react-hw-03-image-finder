// import axios from 'axios'
import React, { Component } from 'react'
import 'modern-normalize'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from './services/pixabay-api'

import Searchbar from './Components/Searchbar'
import ImageGallery from './Components/ImageGallery/ImageGallery'
import Modal from './Components/Modal'
import Button from './Components/Button'
import CustomLoader from './Components/Loader'

class App extends Component {
	state = {
		image: [],
		query: '',
		errors: null,
		loading: false,
		currentPage: 1,
		showModal: false,
		modalImgProps: { largeImageURL: '', tags: '' },
	}

	hendleFormSubmit = (query) => {
		this.setState({ query })
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			try {
				this.setState({ loading: true, query: this.state.query })
				const { query } = this.state
				const img = await api(query)
				this.setState({ image: img.data.hits, loading: false })
			} catch (error) {
				this.setState({ errors: error, loading: false })
			}
		}

		if (prevState.currentPage !== this.state.currentPage) {
			try {
				this.setState({ loading: true, query: this.state.query })
				const { query } = this.state
				const { currentPage } = this.state

				const img = await api(query, currentPage)

				this.setState({
					image: [...prevState.image, ...img.data.hits],
					loading: false,
				})

				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'smooth',
				})
			} catch (error) {
				this.setState({ errors: error.response.status, loading: false })
			}
		}
	}

	nextPage = () => {
		this.setState({ currentPage: this.state.currentPage + 1 })
	}

	resetPage = () => ({
		currentPage: this.state.currentPage,
	})

	toggleModal = () => {
		this.setState(({ showModal }) => ({
			showModal: !showModal,
		}))
	}

	handleImgClick = (props) => {
		this.setState({ modalImgProps: props })
		this.toggleModal()
		console.log(props)
	}

	render() {
		const { image, loading, errors, query, showModal } = this.state
		const see = image.length
		console.log('image', image.length)
		const largeImageURL = this.state.modalImgProps
		const content = errors ? (
			<h2>Упс, ошибка {errors}</h2>
		) : (
			<>
				<ImageGallery image={image} openModal={this.handleImgClick} />
			</>
		)

		const newContent =
			query === '' ? <p>Enter what picture you want to find</p> : content

		return (
			<>
				<div>
					<Searchbar onSubmit={this.hendleFormSubmit} />
					<ToastContainer position="top-right" autoClose={4000} />

					{newContent}
					{loading && <CustomLoader />}

					{see > 0 && <Button onClick={this.nextPage} />}
					{showModal && (
						<Modal onClose={this.toggleModal}>
							<img src={largeImageURL} alt="" className={s.ModalImg} />
						</Modal>
					)}
				</div>
			</>
		)
	}
}

export default App
