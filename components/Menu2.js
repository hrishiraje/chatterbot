import React from 'react';
import { Animated, asset, Image, View, VrButton, Model, StyleSheet } from 'react-vr';
import axios from 'axios';

import Topping from './topping';

const styles = StyleSheet.create({
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

  renderToppings() {

  }

  render() {
    return (
      <View>
        {this.props.toppings.map( (topping) => { return ( <Topping topping={topping} selectedTopping={}/>) } )}
      </View>
    );
  }
}

export default Menu2;