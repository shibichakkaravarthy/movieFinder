import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity, LayoutAnimation, Platform, UIManager, Dimensions, Image } from 'react-native'
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
	const { movies, searchTerm, searchYear, searchSuggestions } = useSelector(state => {
		// console.log('state', state)
		return state.movies
	}, shallowEqual)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchMovies())
	}, [ dispatch ])

	useEffect(() => {
		LayoutAnimation.configureNext(config);
	})

	const currentYear = parseInt(new Date().getFullYear()) - 1870 //Oldest Movie in IMDb is dated back to 1874
	console.log('Year', searchYear)

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

				<ScrollView style={Styles.flex1} keyboardShouldPersistTaps="always" >
					<View style={[ Styles.flexRow, Styles.flexWrap, Styles.justifySpaceAround ]} >
						{
							(movies && movies.length)
							?
							movies.map(movie => {
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