
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    
} from 'react-native';


export default function FooterLoadingMoreComponet({ hasMore, loadingMore }) {
    if (hasMore) {
        if (loadingMore) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <ActivityIndicator animating={true} style={{ margin: 8 }}></ActivityIndicator>
                    <Text style={{ fontSize: 14, color: '#333' }}>正在加载更多...</Text>
                </View>
            )

        } else {
            return (
                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>下拉加载更多</Text>
                </View>
            );
        }

    } else {
        return (
            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#333' }}>已全部加载完毕</Text>
            </View>
        )
    }
}