import axios from 'axios'
import { toast } from 'react-toastify'

axios.defaults.baseURL = 'https://pixabay.com/api/'
axios.defaults.params = {
	key: '21922631-b9054864096d193e79c9fc0a3',
	image_type: 'photo',
	orientation: 'horizontal',
	per_page: 12,
}

export const fetchImage = (query = '', page = 1) => {
	return axios
		.get('', {
			params: {
				q: query,
				page,
			},
		})
		.catch(function (error) {
			if (error.response) {
				toast.error(error.response.data)
				toast.error(error.response.status)
				toast.error(error.response.headers)
			} else if (error.request) {
				toast.error(error.request)
			} else {
				toast.error('Error', error.message)
			}
			toast.error('Error', error.config)
			return console.log(error.config)
		})
}

export default fetchImage
