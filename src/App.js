import axios from 'axios'
import React, { Component } from 'react'
import 'modern-normalize'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Searchbar from './Components/Searchbar'
import ImageGallery from './Components/ImageGallery/ImageGallery'
import Modal from './Components/Modal'
import Button from './Components/Button'
import CustomLoader from './Components/Loader'

const fetchImage = async (query = '', page = 1) => {
	console.log('query fetchImage', query)
	return await axios.get(
		`https://pixabay.com/api/?q=${query}&page=${page}&key=21922631-b9054864096d193e79c9fc0a3&image_type=photo&orientation=horizontal&per_page=12`
	)
}

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

	componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			;(async () => {
				try {
					this.setState({ loading: true, query: this.state.query })
					const { query } = this.state
					const img = await fetchImage(query)
					this.setState({ image: img.data.hits, loading: false })
				} catch (error) {
					this.setState({ errors: error.response.status, loading: false })
				}
			})()
		}

		if (prevState.currentPage !== this.state.currentPage) {
			;(async () => {
				try {
					this.setState({ loading: true, query: this.state.query })
					const { query } = this.state
					const { currentPage } = this.state

					const img = await fetchImage(query, currentPage)

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
			})()
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
		const largeImageURL = this.state.modalImgProps
		const content = errors ? (
			<h2>Ошибка: {errors}</h2>
		) : (
			<>
				<ImageGallery image={image} openModal={this.handleImgClick} />
				<Button onClick={this.nextPage} />
			</>
		)

		const newContent =
			query === '' ? <p>Enter what picture you want to find</p> : content

		return (
			<>
				<div>
					<Searchbar onSubmit={this.hendleFormSubmit} />
					<ToastContainer position="top-right" autoClose={2000} />

					{newContent}
					{showModal && (
						<Modal onClose={this.toggleModal}>
							<img src={largeImageURL} alt="" className={s.ModalImg} />
						</Modal>
					)}
					{loading && <CustomLoader />}
				</div>
			</>
		)
	}
}

export default App
