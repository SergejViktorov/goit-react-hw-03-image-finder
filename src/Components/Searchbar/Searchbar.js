import React from 'react'
import { toast } from 'react-toastify'
import s from './searchbar.module.css'
import PropTypes from 'prop-types'

class Searchbar extends React.Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	}
	state = {
		query: '',
	}

	handleSearchInput = (e) => {
		this.setState({ query: e.currentTarget.value.toLowerCase() })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		if (this.state.query.trim() === '') {
			toast.error('Неккоректный запрос !')
			return
		}

		this.props.onSubmit(this.state.query)

		this.resetForm()
	}

	resetForm = () =>
		this.setState({
			query: '',
		})

	render() {
		return (
			<header className={s.Searchbar}>
				<form className={s.SearchForm} onSubmit={this.handleSubmit}>
					<button type="submit" className={s.SearchFormButton}>
						<span className={s.SearchFormButtonLabel}>Search</span>
					</button>

					<input
						className={s.SearchFormInput}
						type="text"
						autocomplete="off"
						autofocus
						placeholder="Search images and photos"
						value={this.state.query}
						onChange={this.handleSearchInput}
						name="query"
					/>
				</form>
			</header>
		)
	}
}
export default Searchbar
