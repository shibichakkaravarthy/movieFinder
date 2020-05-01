import React from 'react'
import { SafeAreaView, View, Text, Linking, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import Styles from '../Styles'

export const ScreenHeader = ({ title, goBack, openImdb }) => {
	return (
		<SafeAreaView>
			<View style={[ Styles.padding10, Styles.borderColorBlue, Styles.borderBottom1, Styles.flexRow, Styles.justifySpaceBetween, Styles.alignCenter ]} >
				{
					(title !== 'Movie Finder')
					?
					<TouchableOpacity onPress={() => goBack()} >
						<Icon name='md-arrow-round-back' type='Ionicons' style={[ Styles.fontColorBlue ]} />
					</TouchableOpacity>
					:
					null
				}
				<Text style={[ Styles.fontSize24, Styles.fontColorWhite, Styles.textAlignCenter ]} >{title}</Text>
				{
					(title !== 'Movie Finder')
					?
					<TouchableOpacity onPress={() => openImdb()} >
						<Icon name='imdb' type='Fontisto' style={[ Styles.fontColorBlue ]} />
					</TouchableOpacity>
					:
					null
				}
			</View>
		</SafeAreaView>
	)
}