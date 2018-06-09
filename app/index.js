import Router from './router'

import React, {Component} from 'react'
import {StyleSheet,Text,View,StatusBar} from 'react-native'
import {Provider} from 'mobx-react/native';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider color= {{color:'red'}}>
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor="#444"
          barStyle="light-content"
        />
        <Router />
      </View>
      </Provider>
    )
  }
}

export default App
