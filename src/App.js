import axios from 'axios'
import React from 'react'
import 'modern-normalize'

import Searchbar from './Components/Searchbar'
import ImageGallery from './Components/ImageGallery/ImageGallery'

const fetchImage = async () => {
	const data = await axios.get(
		'https://pixabay.com/api/?q=cat&page=1&key=21922631-b9054864096d193e79c9fc0a3&image_type=photo&orientation=horizontal&per_page=12'
	)
	console.log('data', data)
}

function App() {
	fetchImage()
	return (
		<div>
			<Searchbar />
			<ImageGallery />
		</div>
	)
}

export default App
