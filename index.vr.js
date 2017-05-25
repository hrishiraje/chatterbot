import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box } from 'react-vr';
import axios from 'axios';

class Basics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 0.1,
      keyboardText: '>>'
    }
  }

  componentDidMount() {
    me = this;
    axios.get('/api/startup').then(function(response) {
      me.setState({
        keyboardText: response.data.text
      });
    });
  }

  handleInput(e){
    if(e.nativeEvent.inputEvent.eventType === 'keyup')
    if (e.nativeEvent.inputEvent.key === 'Backspace'){
      this.setState({
        keyboardText: this.state.keyboardText.substring(0,this.state.keyboardText.length - 1)
      });
    } else {
      console.log(e.nativeEvent.inputEvent.key);
      if(e.nativeEvent.inputEvent.key !== 'Shift')
      this.setState({
        keyboardText: this.state.keyboardText+= e.nativeEvent.inputEvent.key
      });
    }
  }

  render() {
    return (
      <View onInput={this.handleInput.bind(this)}>
        <Pano source={asset('test3.jpg')}></Pano>
        {/*<Text onEnter={() => this.setState({ fontSize: 0.2 })} onExit={() => this.setState({ fontSize: 0.1 })} style={{ fontSize: this.state.fontSize, transform: [{ translate: [0, 0, -2] }] }}>{this.state.keyboardText}</Text>*/}
        <Text style={{transform: [{ translate: [0, 0, -2] }] }}>{this.state.keyboardText}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('VRBasics', () => Basics);

