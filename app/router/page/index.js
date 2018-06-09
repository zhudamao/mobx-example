import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  ListView,
  RefreshControl
} from 'react-native';

import styles from './styles'
import Markdown from 'react-native-simple-markdown'
import { observer } from 'mobx-react/native'

import ListAutoLoadMoreFooter from './FooterLoadingMoreComponet';
import EmployeeItem from './EmployItem';


import {
  computed,
  observable,
  action,
  autorun,
  observe
} from 'mobx';


@observer
class PanresAnimate extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    const { store } = this.props;
    const { data, hasMore, currentPage, headerLoading, footerLoading } = store;
    return (
      <View style={styles.page}>
        <ListView
          refreshControl={this._renderRefreshControl()}
          style={{ flex: 1 }}
          dataSource={this.props.store.dataSource}
          renderRow={this._renderItem}
          enableEmptySections={true}
          onEndReached={hasMore ? this._onEndReached : () => { }}
        />

      </View>
    )
  }

  _renderRefreshControl = () => {
    let { headerLoading } = this.props.store
    let loadFlag = false
    let text = "加载中..."

    return (
      <RefreshControl
        refreshing={headerLoading}
        onRefresh={this._onRefresh}
        tintColor="#ccc"
        title={text}
        progressBackgroundColor="#ccc"
        titleColor="#333"
        colors={['#888', '#666', '#fff']}
      />
    )
  }

  _keyExtractor = (item) => {
    return item.id.toString();
  }

  _onRefresh = () => {
    const { store } = this.props;
    const { load_data_now } = store;

    load_data_now(1);
  }

  _onEndReached = () => {
    const { store } = this.props;
    const {  currentPage,load_data_now } = store;

    load_data_now(currentPage + 1);
  }

  _itemPress = (item) => {
    const {navigator } = this.props;
    navigator.push({id:"Todo",name:item.name,back:true})
  }

  _renderItem = ( item) => {
    return (
      <EmployeeItem item={item} itemPress={this._itemPress} />
    )
  }

}


export default PanresAnimate;
