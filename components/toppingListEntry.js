import React from 'react';
import { Animated, asset, Image, View, VrButton, Model, StyleSheet, Text } from 'react-vr';

var styles = StyleSheet.create({
  toppingImage: {
    width: 1,
    height: 1,
    borderRadius: 0.25,
    borderWidth: 0.05,
    margin: 0.2
  }, 
  text: {
    fontSize: 0.2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
})

class ToppingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

   addSelection(code) {
      this.setState({
        selected: !this.state.selected
      });
      
      this.props.manageToppings(code);
    }
    
  
  render() {

    console.log('I GOT TRIGGERD');
    
    return (
      <VrButton onClick={this.addSelection.bind(this, this.props.topping.code)}>
        <Text style={styles.text}>
          {this.props.topping.name}
        </Text>
        <Image                         
          source={asset(this.props.topping.image)}
          style={[styles.toppingImage, {borderColor: this.state.selected === true ? 'red' : 'black'}]}
        />
      </VrButton>
    );
  }
}

export default ToppingListEntry;