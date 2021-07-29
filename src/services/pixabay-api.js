import axios from 'axios'
import { toast } from 'react-toastify'

export const fetchImage = (query = '', page = 1) => {
	return axios
		.get('https://pixabay.com/api/', {
			params: {
				key: '21922631-b9054864096d193e79c9fc0a3',
				image_type: 'photo',
				orientation: 'horizontal',
				per_page: 12,

				q: query,
				page,
			},
		})
		.catch(function (error) {
			if (error.response) {
				toast.error(error.response.data)
				toast.error(error.response.status)
				toast.error(error.response.headers)
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				toast.error(error.request)
				console.log(error.request)
			} else {
				toast.error('Error', error.message)
				console.log('Error', error.message)
			}
			console.log(error.config)
		})
}

// const { data } = await axios.get('', {
// 	params: {
// 		q: query,
// 		page,
// 	},
// })
// axios.defaults.baseURL = 'https://pixabay.com/api/'
// axios.defaults.params = {
// 	key: '21922631-b9054864096d193e79c9fc0a3',
// 	image_type: 'photo',
// 	orientation: 'horizontal',
// 	per_page: 12,
// }

export default fetchImage
