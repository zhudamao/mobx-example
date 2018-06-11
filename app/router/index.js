import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
} from 'react-native';


import Page from "./page"
import Header from '../component/header'
import WebPage from './web';
import ToDoComponet from './todo';

import topicsStore from '../mobx/topicsStore';
import employeeStore from '../mobx/employeeStore';
import webStore from '../mobx/webStore';
import todoStore from '../mobx/todoStore';

class App extends Component {
  constructor(props) {
    super(props)
  }
  renderScene(route, navigator) {
    switch (route.id) {
      case "Item":
        return (<Page navigator={navigator} store={employeeStore} />)
        break
      case 'Web':
        return (<WebPage navigator={navigator} store={webStore}/>)
        break;
      case 'Todo':{
        return (<ToDoComponet navigator={navigator} store={todoStore}></ToDoComponet>)
      }
      break;
      default:
        return (<Index navigator={navigator} store={topicsStore} />)
    }
  }
  render() {
    return (
      
      <Navigator
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{ id: 'Todo',name: "Todo"}}
        renderScene = {this.renderScene.bind(this)}
        navigationBar={Header()}
      />
    )
  }
}

export default App
