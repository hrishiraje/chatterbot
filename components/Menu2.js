import React from 'react';
import { Animated, asset, Image, View, VrButton, Model, StyleSheet } from 'react-vr';
import axios from 'axios';

import Topping from './topping';

var locationArray = [];
var locationFinder = function() {
  for (var i = 0; i < 180; i+=30) {
    var x = 2 * Math.cos(i * Math.PI/180);
    var z = 2 * Math.sin(i * Math.PI/180);
    locationArray.push([x,2,z]);
  }
}

var styles = StyleSheet.create({
  toppingImage: {
    width: 1,
    height: 1,
    borderRadius: 0.25,
    borderWidth: 0.02
  }
})

class Menu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToppings: []
    }
  }

  submitToppings() {
    this.props.submitOrder(this.state.selectedToppings);
  }

  selectedToppingsList(toppingCode) {
    if (this.state.toppings.includes(toppingCode)) {
      var index = this.state.toppings.indexOf(toppingCode);
      this.setState({
        selectedToppings: this.state.toppings.splice(index, 1)
      });
    } else {
      this.setState({
        selectedToppings: this.state.selectedToppings.push(toppingCode)
      });
    } 
  }

  render() {
    return (
      <View>
        {this.props.toppings.map((topping) => { return (<Topping key={} topping={topping} location={} selectedTopping={this.selectedToppingsList.bind(this)}/>) } )}
      </View>
    );
  }
}

export default Menu2;