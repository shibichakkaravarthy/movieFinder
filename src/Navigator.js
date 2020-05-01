import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { MovieList, MovieDetail } from './Screens'

const Stack = createStackNavigator()

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} >
				<Stack.Screen name='Movie Finder' component={MovieList} />
				<Stack.Screen name='Movie Detail' component={MovieDetail} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigator