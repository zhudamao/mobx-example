import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {observer,inject} from 'mobx-react/native';


export default inject('color')( observer( function EmployeeItem({ itemPress, item ,color}) {
    const { name, id, phone, leavePercent } = item;
    return (
        <TouchableOpacity onPress={()=>itemPress(item)}>
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.idnumber}>{`工号: ${id}`}</Text>
                    <Text style={styles.idnumber}>{`手机号: ${phone}`}</Text>
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.guess}>预测离职率</Text>
                    <Text style={styles.percent}>{Number(leavePercent * 100).toFixed(0)}
                        <Text style={[{ fontSize: 14 },color]}>
                        %
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )})
);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            height: 95,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
        },
        leftView: {
            flex: 1,
            justifyContent: 'space-between',
            //height:'100%',
        },
        rightView: {
            justifyContent: 'space-between',
            //height:'100%',
        },
        name: {
            fontSize: 17,
            color: '#333',
        },
        idnumber: {
            fontSize: 13,
            color: '#999'
        },
        percent: {
            fontSize: 36,
            fontWeight: '600',
            color: 'rgb(10,92,242)',
            alignSelf:'flex-end',
        },
        guess: {
            fontSize: 14,
            color: '#999'
        }


    }


);