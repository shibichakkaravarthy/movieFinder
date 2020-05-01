import { ACTIONTYPES } from '../Constants'

const INITIAL_STATE = {
	movies: [],
	selectedMovie: {},
	searchTerm: '',
	searchYear: '',
	searchSuggestions: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.FETCHMOVIES:
			return { ...state, movies: action.payload }

		case ACTIONTYPES.UPDATEMOVIEDATA:
			return { ...state, [action.payload.field]: action.payload.value }

		default:
			return state
	}
}