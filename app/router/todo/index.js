import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

import 'intl';
import 'intl/locale-data/jsonp/en';

import {
    observable,
    computed,
    autorun,
    toJS,
} from 'mobx';

import {
    observer
} from 'mobx-react/native';

@observer
export default class ToDoComponet extends Component {
    constructor(props) {
        super(props);

        this.textValue = observable.box('');
        this.showText = observable.box('');
        this.textValue.observe((change)=>{
            this.showText.set(`newValue:${change.newValue}  oldValue:${change.oldValue}`);
        })

        autorun (()=>console.log(this.textValue.get()))
    }

    render = () => {
        const { store } = this.props;
        const { data, allChoose, addNewOne, remove, chooseAll, nextAble, clearAll } = store;

        return (

            <View style={styles.container}>
                <ScrollView style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#ccc', }}>
                    <TextInput style={styles.textInput}
                        onChangeText={this._onChangeText}
                        value={this.textValue.get()}
                        underlineColorAndroid='transparent'
                    ></TextInput>

                    <Text style={{ marginHorizontal: 10, fontSize: 20, color: '#66ff66' }}>{this.showText.get()}</Text>
                    {
                        data.map((item, index) =>
                            <TouchableOpacity onPress={() => this._changeChoose(item)}>
                                <View style={styles.item} key={item.name}>
                                    <Text
                                        style={[styles.textStyle, item.choose && { textDecorationLine: 'line-through', color: 'blue' }]}
                                    >{item.name} 
                                    <Text style={{color:'orange'}}>
                                        {item.time}
                                    </Text>
                                    </Text>

                                    <Text onPress={() => remove(item)} style={styles.delete}>{'X'}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={chooseAll}>
                        <View>
                            <Text style={[{ color: allChoose ? 'blue' : '#666', }, styles.allChoose]}  >全选</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={clearAll}>
                        <View>
                            <Text style={[{ color: data.length > 0 ? 'blue' : '#666', }, styles.allChoose]}  >清空</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this._addOne} disabled={!this.textValue.get().length} >
                    <Text style={[styles.buttonStyle, !this.textValue.get().length && { backgroundColor: '#999' }]}>添加一个</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._nextAction} disabled={!nextAble}>
                    <Text style={[styles.buttonStyle, !nextAble && { backgroundColor: '#999' }]}>下一步</Text>
                </TouchableOpacity>

            </View>

        )
    }

    _onChangeText = (text) => {
        this.textValue.set(text);
    }

    _changeChoose = (item) => {
        item.choose = !item.choose;
    }

    _addOne = () => {
        const { store } = this.props;
        const { addNewOne } = store;
        let date = Date.now();
        let dateFormat = new Intl.DateTimeFormat('chinese');
        addNewOne({ name: this.textValue.get(),time: dateFormat.format(date), choose: false })
        this.textValue.set('');
    }

    _nextAction = () => {
        const { store } = this.props;
        const { hasChoose } = store;
        const names = hasChoose.map(item => item.name);

        alert(names.join(','))
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: Platform.OS == "android" ? 40 : 60,
            backgroundColor: '#fff'
        },
        item: {
            height: 40,
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
        },
        textStyle: {
            fontSize: 16,
            color: '#333',

        },
        buttonStyle: {
            fontSize: 18,
            color: 'white',
            backgroundColor: 'blue',
            textAlign: 'center',
            padding: 10,
            borderRadius: 5,
            marginHorizontal: 10,
            marginVertical: 5,
        },
        allChoose: {
            padding: 8,
            margin: 10
        },
        delete: {
            width: 30,
            height: 30,
            color: '#ff6900',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'orange',
            textAlign: 'center',
        },
        textInput: {
            height: 40,
            borderColor: '#333',
            borderWidth: 1,
            marginHorizontal: 10,
        }

    }
)