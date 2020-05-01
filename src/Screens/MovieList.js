import React, {useState, useEffect, useRef} from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity, LayoutAnimation, Platform, UIManager, Dimensions, Image } from 'react-native'
import RangeSlider from 'rn-range-slider';
import { Icon, Input, Text, Button, Item, Picker } from 'native-base'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getMovieDetail, onSearch, setSuggestionsToMovies, resetSuggestions, updateMovieData } from '../Components/Actions'

import Styles from '../Styles'
import { ScreenHeader, MovieCard } from '../Components'

const { width, height } = Dimensions.get('window')

let config = {
	"create": {
		"property": "scaleY", 
		"type": "spring",
		"springDamping": 0.7,
	},

	"delete": {
		"property": "scaleXY", 
		"type": "spring",
		"springDamping": 0.7,
	}, 

	"duration": 400, 
	"update": {
		"springDamping": 0.4,
		"type": "spring"
	}
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
  }

export const MovieList = ({ navigation }) => {
	
	const [filter, toggleFilter] = useState(true)
	const [range, setRange] = useState({ low: 0, high: 0 })
	const [yearRange, setYears] = useState({ low: 0, high: 0 })

	const slider = useRef(null)

	const dispatch = useDispatch()
	const { movies, searchTerm, searchYear, searchSuggestions } = useSelector(state => {
		// console.log('state', state)
		return state.movies
	}, shallowEqual)

	useEffect(() => {
		dispatch(fetchMovies())
	}, [ dispatch ])

	useEffect(() => {
		LayoutAnimation.configureNext(config);
	})

	const currentYear = parseInt(new Date().getFullYear()) - 1870 //Oldest Movie in IMDb is dated back to 1874

	let filteredMovies = movies

	if(movies.length) {
		let moviesTimeRange = movies.map(movie => {
			return parseInt(movie.Year)
		})

		moviesTimeRange.sort()
		
		if(yearRange.low !== moviesTimeRange[0] && yearRange.high !== moviesTimeRange[moviesTimeRange.length-1]) {
			setYears({ low: moviesTimeRange[0], high: moviesTimeRange[moviesTimeRange.length-1] })
			console.log(slider)
			// slider.current.setLowValue(moviesTimeRange[0])
			slider.current.setHighValue(moviesTimeRange[moviesTimeRange.length-1])
		}

		console.log('yearRange', yearRange)
	}

	if(range.low) {
		filteredMovies = movies.filter(movie => {
			if(movie.Year >= range.low && movie.Year <= range.high) {
				return movie
			}
		})
	}

	return (
		<SafeAreaView style={[ Styles.flex1 ]} >
			<View style={[ Styles.backgroundBlack, Styles.flex1 ]} >
				<ScreenHeader title='Movie Finder' />
				
				<View  style={[ Styles.margin20, Styles.flexRow, Styles.alignCenter, Styles.justifySpaceAround ]} >
					<Item style={[ Styles.flex3 ]} >
						<Icon style={[ Styles.fontColorWhite ]} active name='ios-search' type='Ionicons' />
						<Input value={searchTerm} placeholder='Search' onChangeText={text => dispatch(onSearch(text))} style={[ Styles.fontColorWhite ]} />
					</Item>

					<Item picker style={[ Styles.flex2, { marginLeft: 10 } ]} >
						<Picker mode="dropdown" style={{ width: undefined, color: '#fff' }} itemStyle={[ Styles.backgroundBlack ]} selectedValue={searchYear} onValueChange={year => dispatch(updateMovieData('searchYear', year))} >
							<Picker.Item label='All Years' value={false} />
							{
								Array.from(Array(currentYear).keys()).map((x, i) => {
									return <Picker.Item key={x} label={(parseInt(new Date().getFullYear()) - x).toString()} value={(parseInt(new Date().getFullYear()) - x).toString()} />
								})
							}
						</Picker>
					</Item>

					<TouchableOpacity onPress={() => dispatch(setSuggestionsToMovies())} >
						<Icon style={[ Styles.fontColorWhite ]} active name='arrowright' type='AntDesign' />
					</TouchableOpacity>
				</View>

				<View style={[{ position: 'relative' }, Styles.padding10]} >
					{
						(searchSuggestions && searchSuggestions.length)
						?
						<ScrollView keyboardShouldPersistTaps="always" style={[{ position: 'absolute', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 99, left: 0, right: 0, maxHeight: height*0.5 }, Styles.backgroundBlack, Styles.borderColorBlue, Styles.border1, Styles.padding10 ]} >
							{
								searchSuggestions.map(movie => {
									return (
										<TouchableOpacity key={movie.Title} onPress={() => { dispatch(getMovieDetail(movie.imdbID)), dispatch(resetSuggestions()), navigation.navigate('Movie Detail') }} >
											<View style={[ Styles.flexRow, Styles.alignCenter, Styles.padding10, Styles.margin5]} >
												<View>
													<Image style={{ width: 40, height: 40 }} source={{ uri: movie.Poster }} />
												</View>
												<View style={{ paddingLeft: 10 }} >
													<Text style={[ Styles.fontColorWhite ]} >{movie.Title}</Text>
													<Text style={[ Styles.fontColorWhite ]} >{movie.Year}</Text>
												</View>
											</View>
										</TouchableOpacity>
									)
								})
							}
						</ScrollView>
						:
						null
					}
				</View>

				{
					(filter)
					?
					<View style={[ Styles.alignCenter, Styles.justifyCenter ]} >
						<Text style={[ Styles.fontColorWhite, Styles.fontSize18, Styles.textAlignCenter, { marginBottom: -40 } ]} >Select Time Period (in Years)</Text>
						<RangeSlider ref={slider} style={{width: width*0.8, height: 80}} gravity={'center'} min={yearRange.low} max={yearRange.high} step={2} selectionColor="#285FE0" blankColor="#333" labelBackgroundColor="#285FE0" labelBorderColor="#285FE0" onValueChanged={(low, high, fromUser) => { setRange({ low, high }) }} />
					</View>
					:
					null
				}

				<View style={[ Styles.margin10, Styles.padding10 ]} >
					<TouchableOpacity onPress={() => toggleFilter(!filter)} style={[ Styles.borderRadius10, Styles.backgroundBlue, Styles.padding10 ]} >
						{
							(!filter)
							?
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18, Styles.textAlignCenter ]} >Show Filter</Text>
							:
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18, Styles.textAlignCenter ]} >Hide Filter</Text>
						}
					</TouchableOpacity>
				</View>


				<ScrollView style={Styles.flex1} keyboardShouldPersistTaps="always" >
					<View style={[ Styles.flexRow, Styles.flexWrap, Styles.justifySpaceAround ]} >
						{
							(filteredMovies && filteredMovies.length)
							?
							filteredMovies.map(movie => {
								return (
									<TouchableOpacity key={movie.imdbID} onPress={() => { dispatch(getMovieDetail(movie.imdbID)), navigation.navigate('Movie Detail') }} >
										<MovieCard movie={movie} />
									</TouchableOpacity>
								)
							})
							:
							null
						}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}