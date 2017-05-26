import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box } from 'react-vr';
import axios from 'axios';

class Basics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 0.1,
      robotText: '',
      keyboardText: '>>',
      messageText: '',
      context: '',
    }
  }

  componentDidMount() {
    var me = this;
    axios.get('/api/startup').then(function(response) {
      me.setState({
        robotText: response.data.text,
        context: response.data.nextContext,
      });
    });
  }

  handleInput(e){
    if(e.nativeEvent.inputEvent.eventType === 'keyup')
    if (e.nativeEvent.inputEvent.key === 'Backspace'){
      this.setState({
        keyboardText: this.state.keyboardText.substring(0,this.state.keyboardText.length - 1)
      });
    }else if (e.nativeEvent.inputEvent.key === 'Enter'){
      this.setState({
        messageText: JSON.parse(JSON.stringify(this.state.keyboardText)),
        keyboardText: '',
      }, ()=>{
          console.log(this.state.messageText);
          var modifiedMessage = this.state.messageText.replace(/\s/gi, '+');
          console.log(this.state.messageText);
          var urlMessage = '?message='+modifiedMessage+'&context='+this.state.context;
          console.log(`Here: /api/startup${urlMessage}`, urlMessage);
          axios.get(`/api/startup${urlMessage}`).then(function(response) {
            me.setState({
            robotText: response.data.output,
            context: response.data.nextContext,
                      });
          });
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
        <View style={{
        flex: 1,
        flexDirection: 'column',
        width: 2,
        alignItems: 'stretch',
        transform: [{translate: [0, 0, -2]}],
      }}>
        {/*<Text onEnter={() => this.setState({ fontSize: 0.2 })} onExit={() => this.setState({ fontSize: 0.1 })} style={{ fontSize: this.state.fontSize, transform: [{ translate: [0, 0, -2] }] }}>{this.state.keyboardText}</Text>*/}
        
        <Text style={{ color: 'red', transform: [{ translate: [0, 0, 0] }] }}>{this.state.robotText}</Text>
        <View style={{ margin: 0.5, height: 0.10, backgroundColor: 'darkslategrey'}}>
        <Text style={{ color: 'red', transform: [{ translate: [0, 0, -2] }] }}>{this.state.keyboardText}</Text>
        <Text style={{ color: 'red', transform: [{ translate: [1, 0, -2] }] }}>{this.state.messageText}</Text>
        </View>
        </View>
      </View>
    );
  }
}
/*

*/
AppRegistry.registerComponent('VRBasics', () => Basics);

