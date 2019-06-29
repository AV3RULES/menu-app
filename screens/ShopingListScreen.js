import React, {Component} from 'react';
import {Image, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {CheckBox} from 'react-native-elements';
import CoolButton from '../components/CoolButton';
import {connect} from 'react-redux';
import {addFoodAction, updateFoodAction} from "../model/actions/actions";
import {NavigationEvents} from 'react-navigation';

class ShopingListScreen extends Component {

    static navigationOptions = {
        title: 'Lista de la compra',
    };

    updatedFood = [];

    constructor() {
        super();
        this.state = { name: '', approxPrice: '', market: '', done: false};
    }

    addFood(name, approxPrice, market, done) {
        if(name && approxPrice && market){
            this.props.dispatchAddFood(name, approxPrice, market, done);
            this.setState({ name: '', approxPrice: '', market: '', done: false});
        }
    }

    modifiyFood(food) {
        if(food.name && food.approxPrice && food.market){
            this.props.dispatchUpdateFood(food.name);
            this.updatedFood.map(updatedItem => {
                return updatedItem.name === food.name ? {...updatedItem, done: !updatedItem.done} : updatedItem;
            });
            //this.setState({ name: '', approxPrice: '', market: '', done: false});
        }
    }


    postFood(name, approxPrice, market) {
        console.log("POST_FOOD_URL - food name: " + name)
        // if(name && approxPrice && market){
        
        //     fetch('POST_FOOD_URL', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({
        //             name:name,
        //             approxPrice:approxPrice,
        //             market:market,
        //             done: false
        //         })
        //     })
        //         .then((res) => res.json())
        //         .then((data) =>  console.log(data))
        //         .catch((err)=>console.log(err))
        // }
    }

    patchFood() {
        // if(this.updatedFood.length != 0){
        //     console.log("PATCH_FOOD_URL - updated food")
        //     fetch('PATCH_FOOD_URL', {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({
        //             this.updatedFood
        //         })
        //     })
        //         .then((res) => res.json())
        //         .then((data) =>  console.log(data))
        //         .catch((err)=>console.log(err))
        // }
    }

    render() {

        const {food} = this.props;

        return (
            <View style={[styles.container]}>

                <NavigationEvents
                    onWillFocus={() => {
                        console.log('will focus');
                        console.log("GET_FOOD_URL - food")
                        // fetch('GET_FOOD_URL', {
                        //     method: 'GET'
                        // })
                        //     .then((response) => {
                        //         return response.json()
                        //     })
                        //     .then((food) => {
                        //         food.forEach((f) => this.addFood(f.name, f.approxPrice, f.market, f.done))
                        //     })
                        //     .catch((err)=> console.log(err))
                    }}
                    onDidFocus={() => console.log('did focus')}
                    onWillBlur={() => {
                        console.log('will blur - checking updates...');
                        patchFood()

                    }}
                    onDidBlur={() => console.log('did blur')}
                />

                <View style={[styles.startButton]}>
                    <CoolButton
                        label={'total'}
                        action={() => {
                            this.props.navigation.navigate('TimeTracking')
                        }}
                    />
                </View>
                <ScrollView style={[styles.foodListContainer]}>
                    {
                        food.map(
                            (item, index) => (
                                <View key={index} style={[styles.foodList]}>
                                    <Image
                                        source={require('../assets/images/shopping-basket.png')}
                                        style={{width: 50, height: 50, marginRight: 10}}
                                    />
                                    <View>
                                        <Text style={[styles.name]}>{item.name}</Text>
                                        <Text style={[styles.attributes]}>{item.approxPrice}€</Text>
                                        <Text style={[styles.attributes]}>{item.market}</Text>
                                    </View>
                                    <View style={[styles.checkbox]}>
                                        <CheckBox
                                            right={true}
                                            checked={item.done}
                                            onPress={() => {
                                                this.modifiyFood(item)
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                        )
                    }
                </ScrollView>
                <FoodForm
                    name={this.state.name}
                    onNameChange={name => this.setState({name})}
                    approxPrice={this.state.approxPrice}
                    onApproxPriceChange={approxPrice => this.setState({approxPrice})}
                    market={this.state.market}
                    onMarketChange={market => this.setState({market})}
                    addFood={() => {
                        this.addFood(this.state.name, this.state.approxPrice, this.state.market, false);
                        this.postFood(this.state.name, this.state.approxPrice, this.state.market);
                    }
                    }
                />
            </View>
        );
    }
}

const FoodForm = ({name, onNameChange, approxPrice, onApproxPriceChange, market, onMarketChange, addFood}) => (
    <View style={[styles.form]}>
        <View style={styles.inputWrapper}>
            <TextInput
                placeholder={"Nombre"}
                style={[styles.inputText]}
                value={name}
                onChangeText={onNameChange}/>
            <TextInput
                value={approxPrice}
                placeholder={"Precio aproximado"}
                style={[styles.inputText]}
                keyboardType = 'number-pad'
                onChangeText={onApproxPriceChange}/>
            <View style={styles.picker}>
                <Picker selectedValue = {market}
                        onValueChange = {onMarketChange}>
                    <Picker.Item label = "Mercados..." value = "" />
                    <Picker.Item label = "Mercadona" value = "Mercadona" />
                    <Picker.Item label = "Dia" value = "Dia" />
                    <Picker.Item label = "Lidl" value = "Lidl" />
                    <Picker.Item label = "AhorraMas" value = "AhorraMas" />
                    <Picker.Item label = "Carrefour" value = "Carrefour" />
                    <Picker.Item label = "Aldi" value = "Aldi" />
                    <Picker.Item label = "Simply" value = "Simply" />
                    <Picker.Item label = "Hipercor" value = "Hipercor" />
                </Picker>
            </View>
        </View>
        <TouchableOpacity onPress={addFood}>
            <View style={styles.containerButton}>
                <Text style={[styles.addButton]}>+</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    startButton: {
        flex: 1,
        maxHeight: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    foodListContainer: {
        flex: 1,
    },
    form: {
        flex: 1,
        maxHeight: 120,
        flexDirection: 'row',
        padding: 10,
    },
    foodList: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
    },
    attributes: {
        fontSize: 14,
    },
    inputWrapper:{
        flex: 1,
    },
    inputText: {
        height: 32,
        padding: 5,
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 2,
    },
    picker: {
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 2,
    },
    containerButton: {
        backgroundColor: '#ededed',
        width: 100,
        height: 100,
        borderRadius: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        fontSize: 28,
        lineHeight: 28,
    },
    checkbox: {
        position: 'absolute',
        right: 10
    },
});

const mapStateToProps = (state) => {
    return ({ food: state.food });
};

const mapDispatchToProps = {
    dispatchAddFood: (name, approxPrice, market, done) => addFoodAction(name, approxPrice, market, done),
    dispatchUpdateFood: (name) => updateFoodAction(name),
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingListScreen);