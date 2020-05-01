import { ACTIONTYPES, API } from '../Constants'
import axios from 'axios'

export const fetchMovies = () => {
	return (dispatch) => {
		console.log('getting movies')
		axios.get(API+'s=bad&y=2020')
		.then(res => {
			console.log('response', res.data)
			dispatch({ type: ACTIONTYPES.FETCHMOVIES, payload: res.data.Search })
		})
		.catch(err => {
			console.log(err)
		})
	}
}

export const getMovieDetail = (imdbId) => {
	return (dispatch) => {
		axios.get(API+`i=${imdbId}&plot=full`)
		.then(res => {
			console.log('getMovieDetail', res.data)
			dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'selectedMovie', value: res.data } })
		})
		.catch(err => {
			console.log(err)
		})
	}
}

export const resetSuggestions = () => {
	return (dispatch) => {
		dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'searchSuggestions', value: [] } })
	}
}

export const setSuggestionsToMovies = () => {
	return (dispatch, getState) => {
		const suggestions = getState().movies.searchSuggestions
		if(suggestions.length) {
			dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'searchSuggestions', value: [] } })
			dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'movies', value: suggestions } })
		}

		else {
			const { searchYear, searchTerm } = getState().movies

			let query = `s=${searchTerm}`

			if(searchYear) {
				query = `s=${searchTerm}&y=${searchYear}`
			}

			axios.get(API+query)
			.then(res => {
				if(res.data.Response) {
					dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'movies', value: res.data.Search } })
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}

export const onSearch = (search) => {
	return (dispatch, getState) => {
		dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'searchTerm', value: search } })

		const year = getState().movies.searchYear

		let query = `s=${search}`

		if(year) {
			query = `s=${search}&y=${year}`
		}

		console.log('query', query)
		axios.get(API+query)
		.then(res => {
			if(res.data.Response) {
				dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'searchSuggestions', value: res.data.Search } })
			}
			else {
				dispatch({ type: ACTIONTYPES.UPDATEMOVIEDATA, payload: { field: 'searchSuggestions', value: [] } })
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
}

export const updateMovieData = (field, value) => {
	return { type: 'UPDATEMOVIEDATA', payload: { field, value } }
}