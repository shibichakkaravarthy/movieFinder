import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity, Dimensions, Image, Linking } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Icon, Input, Text, Button, Spinner } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import { updateMovieData } from '../Components/Actions'

import { ScreenHeader } from '../Components'

const { width, height } = Dimensions.get('window')
console.log('Dim', width, height)

export const MovieDetail = ({ navigation }) => {

	const { selectedMovie } = useSelector(state => {
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

	return (
		<SafeAreaView style={[ Styles.backgroundBlack, Styles.flex1 ]} >
			<ScreenHeader title={selectedMovie.Title} goBack={() => { onGoBack() }} openImdb={() => onOpenImdb(selectedMovie.imdbID)} />
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