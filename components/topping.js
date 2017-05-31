import React, { Component } from 'react';
import { Animated, asset, Image, View, VrButton, Model, StyleSheet } from 'react-vr';

class Topping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  addSelection() {
    this.setState({
      selected: !this.state.selected
    });

    
  }
  
  render() {
    return (
      <View style={{ borderColor: this.satte.selected === true ? 'red' : 'black', transform: [{ translate: this.props.location }]}}>
        <Image onClick={this.addSelection().bind(this)} />
      </View>
    );
  }
}

export default Topping;