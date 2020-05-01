import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text, Button, Icon } from 'native-base'

export const MovieCard = ({ movie }) => {

	const { Title, Year, Poster, Type } = movie

	return (
		<View style={[ Styles.borderRadius10, Styles.padding10, Styles.margin10, Styles.border1, Styles.borderColorGrey, Styles.flex1 ]} >
			<View style={[ Styles.alignCenter, Styles.padding5 ]} >
				<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >{Title}</Text>
			</View>
			<View style={[ Styles.alignCenter ]} >
				<Image style={{ width: 150, height: 222 }} source={{ uri: Poster }} />
			</View>
			<View style={[ Styles.alignCenter, Styles.justifyCenter ]} >
				<View style={[ Styles.alignCenter, Styles.flexRow, Styles.justifyCenter ]} >
					<Icon type='MaterialCommunityIcons' name='movie' style={[ Styles.fontColorBlue ]} />
					<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >Movie</Text>
				</View>
				<Text style={[ Styles.fontColorWhite, Styles.fontSize18 ]} >{Year}</Text>
			</View>
		</View>
	)
}