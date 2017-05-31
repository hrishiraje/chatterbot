import React from 'react';
import { Animated, asset, Image, View, VrButton, Model, StyleSheet, Text } from 'react-vr';
import _ from 'underscore';

import ToppingListEntry from './toppingListEntry';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: 1,
    height: 1,
    alignItems: 'stretch',
    transform: [
      {
        translate: [-4, 4, -3]
      },
      {
        rotateX: 45
      }
    ]
  },
  menuButton: {
    // backgroundColor: 'green',
    // borderRadius: 0.25,
    width: 2,
    height: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.01,
  },
  menuButtonView: {
    transform: [
      {
        translate: [-4.5, 3, -5]
      },
      {
        rotateY: 0
      }
    ]
  }
});

class TopplingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toppingList: '',
      zValue: new Animated.Value(-2)
    }
    
  }

  moveForward() {
    Animated.spring(this.state.zValue, {
      toValue: -1
    }).start();
  }

  moveBack() {
    Animated.spring(this.state.zValue, {
      toValue: -2
    }).start()
  }
  
  submit() {
    var toppings = this.state.toppingList.split("");
    this.props.submitOrder(toppings);
    this.setState({
      toppingList: ''
    });
  }

  manageToppings(code) {
    console.log('trying to add ', code);
    if (this.state.toppingList.indexOf(code) !== -1) {
      var index = this.state.toppingList.indexOf(code);
      this.setState({
        toppingList: this.state.toppingList.slice(0, index) + this.state.toppingList.slice(index + 1)
      });
    } else {
      this.setState({
        toppingList: this.state.toppingList+code
      })
    }
    
  }

  render() {
    console.log('MY TOPPINGS ARRAY', this.state.toppingList);
    return (
      <View style={styles.container}>
          {this.props.toppings.map((topping) => <ToppingListEntry key={topping.name} topping={topping} manageToppings={this.manageToppings.bind(this)}/>) } 
        {this.state.toppingList !== '' ? <View style={styles.menuButtonView}>
          <VrButton onClick={() => this.submit()}>
            <Animated.Image 
              source={asset('submit-button-md.png')} 
              onEnter={() => this.moveForward()} 
              onExit={() => this.moveBack()} 
              style={[styles.menuButton, {transform: [{ translateZ: this.state.zValue }]}]}>
            </Animated.Image>
          </VrButton> 
        </View> : null }
      </View>
      
    );
  }
}

export default TopplingList;
