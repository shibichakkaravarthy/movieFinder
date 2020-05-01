import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity, Dimensions, Image, Linking } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Icon, Input, Text, Button, Spinner, Item, Picker } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import { fetchMovies, getMovieDetail, onSearch, setSuggestionsToMovies, resetSuggestions, updateMovieData } from '../Components/Actions'

import { ScreenHeader } from '../Components'

const { width, height } = Dimensions.get('window')
console.log('Dim', width, height)

export const MovieDetail = ({ navigation }) => {

	const { selectedMovie, movies, searchTerm, searchYear, searchSuggestions } = useSelector(state => {
		// console.log('state', state)
		return state.movies
	})

	const dispatch = useDispatch()

	if(!selectedMovie.Title) {
		return (
			<SafeAreaView style={[ Styles.backgroundBlack, Styles.flex1 ]} >
				<View style={[ Styles.alignCenter, Styles.justifyCenter, Styles.flex1 ]} >
					<Spinner color='#285FE0' />
				</View>
			</SafeAreaView>
		)
	}

	const onGoBack = () => {
		dispatch(updateMovieData('selectedMovie', {}))
		navigation.goBack()
	}

	const onOpenImdb = (id) => {
		Linking.openURL(`https://imdb.com/title/${id}/`)
	}

	const currentYear = parseInt(new Date().getFullYear()) - 1870 //Oldest Movie in IMDb is dated back to 1874

	return (
		<SafeAreaView style={[ Styles.backgroundBlack, Styles.flex1 ]} >
			<ScreenHeader title={selectedMovie.Title} goBack={() => { onGoBack() }} openImdb={() => onOpenImdb(selectedMovie.imdbID)} />
			
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

			<ScrollView style={[ Styles.flex1 ]} >
				<View style={[ Styles.alignCenter, Styles.margin10 ]} >
					<Image style={[{ width: width*0.8, height: (444*width*0.8)/300 }, Styles.borderRadius10]} source={{ uri: selectedMovie.Poster }} />
					<View style={{ position: 'absolute', bottom: 0, width: width*0.8 }} >
						<LinearGradient colors={['transparent', '#000']} >
							<Text style={[ Styles.fontSize24, Styles.fontColorWhite ]} >{selectedMovie.Title0}</Text>
						</LinearGradient>
						<View style={[ Styles.backgroundBlack ]} >
							<Text style={[ Styles.fontSize24, Styles.fontColorWhite ]} >{selectedMovie.Title}</Text>
							<Text style={[ Styles.fontSize18, Styles.fontColorWhite ]} >{selectedMovie.Year}</Text>
						</View>
					</View>	
				</View>

				<View style={[ Styles.margin10, Styles.padding10 ]} >
					<View style={[ Styles.margin10, Styles.border1, Styles.borderColorBlue, Styles.borderRadius10 ]} >
						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Cast</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Actors}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Director</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Director}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Writer</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Writer}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Genre</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Genre}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Country</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Country}</Text>
						</View>
					</View>

					<View style={[ Styles.margin10, Styles.border1, Styles.borderColorBlue, Styles.borderRadius10 ]} >
						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Plot</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Plot}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Duration</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Runtime}</Text>
						</View>
					</View>

					<View style={[ Styles.margin10, Styles.border1, Styles.borderColorBlue, Styles.borderRadius10 ]} >
						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Awards</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.Awards}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Box Office</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{selectedMovie.BoxOffice}</Text>
						</View>

						<View style={[ Styles.margin10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Ratings</Text>
							{
								selectedMovie.Ratings.map(rating => {
									return (
										<Text key={rating.Source} style={[ Styles.fontColorWhite, Styles.fontSize14 ]} >{rating.Source}: {rating.Value}</Text>
									)
								})
							}
						</View>
					</View>

					<View style={[ Styles.margin10, Styles.padding10 ]} >
						<TouchableOpacity onPress={() => onOpenImdb(selectedMovie.imdbID)} style={[ Styles.borderRadius10, Styles.backgroundBlue, Styles.padding10 ]} >
							<Text style={[ Styles.fontColorWhite, Styles.fontSize18, Styles.textAlignCenter ]} >Show in IMDb</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}