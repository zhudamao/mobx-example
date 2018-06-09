import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    WebView,
    RefreshControl,
} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable,
        autorun,
} from 'mobx';

@observer
export default class WebCompont extends Component {
    componentDidMount() {
        const { store } = this.props;
        store.load_data_now();
        setInterval(()=>{
            this.obValue.count ++;
        },1000)
    }

    obValue = observable({count:1});

    render = () => {
        const { navigator, store } = this.props;

        return (
            <View style={styles.container}>
                <WebView
                    source={{ html: store.content, baseUrl: store.baseUrl }}
                    //source={{uri:'http://www.baidu.com',method:'GET'}}
                    style={{ flex: 1 }}
                    renderLoaing={this._renderLoading}
                    scalesPageToFit = {true}
                >
                </WebView>

                <Text style={[{textAlign:'center',fontSize:18},{opacity: this.obValue.count%2? 0.1:1 },store.textStyle]}
                    onPress = {this._onPress}
                >{this.obValue.count}</Text>
            </View>
        )
    }

    _renderLoading = () => (
        <RefreshControl
            refreshing={true}
            tintColor="#ccc"
            title={'loading...'}
            progressBackgroundColor="#ccc"
            titleColor="#333"
        />
    )

    _onPress = () => {
        const {  store } = this.props;
        store.random_changeText_style();
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        }

    },


);
