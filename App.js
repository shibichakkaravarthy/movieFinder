import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import Navigator from './src/Navigator'
import Reducers from './src/Components/Reducers'

const App = () => {

	const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))

  return (
  	<Provider store={store} >
  		<Navigator />
  	</Provider>
  )
};

export default App;
