import React from 'react'
import ImageGalleryItem from '../ImageGalleryItem'
import s from './imageGallery.module.css'
import PropTypes from 'prop-types'

const ImageGallery = ({ image, openModal }) => {
	return (
		<ul className={s.ImageGallery}>
			{image.map(({ id, webformatURL, largeImageURL, tags }) => {
				return (
					<ImageGalleryItem
						id={id}
						webformatURL={webformatURL}
						largeImageURL={largeImageURL}
						tags={tags}
						openModal={openModal}
					/>
				)
			})}
		</ul>
	)
}

ImageGallery.propTypes = {
	image: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired,
}

export default ImageGallery
