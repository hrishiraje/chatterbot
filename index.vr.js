import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box } from 'react-vr';

class Basics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 0.1
    }
  }

  handleInput(e){
    console.dir(e.nativeEvent.inputEvent);
  }

  render() {
    return (
      <View onInput={this.handleInput}>
        <Pano source={asset('test3.jpg')}></Pano>
        <Text onEnter={() => this.setState({ fontSize: 0.2 })} onExit={() => this.setState({ fontSize: 0.1 })} style={{ fontSize: this.state.fontSize, transform: [{ translate: [0, 0, -2] }] }}>Hover Over Me Plox</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('VRBasics', () => Basics);

