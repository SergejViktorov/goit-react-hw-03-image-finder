import React from 'react'
import s from './searchbar.module.css'

const Searchbar = () => {
	return (
		<header className={s.Searchbar}>
			<form className={s.SearchForm}>
				<button type="submit" className={s.SearchFormButton}>
					<span className={s.SearchFormButtonLabel}>Search</span>
				</button>

				<input
					className={s.SearchFormInput}
					type="text"
					autocomplete="off"
					autofocus
					placeholder="Search images and photos"
				/>
			</form>
		</header>
	)
}

export default Searchbar
