import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box } from 'react-vr';
import axios from 'axios';

import BouncingText from './components/bouncingText';
import RobotModel from './components/robotModel';

class Basics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 0.1,
      robotText: '',
      keyboardText: '',
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
    var me = this;
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
          var modifiedMessage = this.state.messageText.replace(/\>\s/gi, '+');
          var urlMessage = '?message='+modifiedMessage+'&context='+this.state.context;
          axios.get(`/api/response${urlMessage}`).then(function(response) {
            me.setState({
            robotText: response.data.output,
            context: response.data.nextContext,
                      });
          });
      });
    } else {
      if(e.nativeEvent.inputEvent.key !== 'Shift')
      this.setState({
        keyboardText: this.state.keyboardText+= e.nativeEvent.inputEvent.key
      });
    }
  }

  render() {
    return (
      <View onInput={this.handleInput.bind(this)}>
        <Pano source={asset('sky_platform.jpg')}></Pano>
        {/*<View style={{ flex: 1, flexDirection: 'column', width: 2, alignItems: 'stretch', transform: [{translate: [0, 0, -2]}]}}>*/}
          {/*<BouncingText style={{ color: 'red', transform: [{ translate: [0, 0, 0] }] }} theText={this.state.robotText}></BouncingText>*/}
        {/*</View>*/}
        <RobotModel robotText={this.state.robotText}/>
        <View>
          <Text style={{ backgroundColor: 'lightblue', color: 'red', transform: [{ translate: [-1, 0, -2] }] }}>{this.state.keyboardText}</Text>
          <Text style={{ backgroundColor: 'grey', color: 'red', transform: [{ translate: [-1, -0.1, -2] }] }}>{this.state.messageText}</Text>
        </View>
      </View>
    );
  }
}
/*
So whoever reviews this, I have three Text components. Each component refers to one of three things: robotText, keyboardText (input panel), 
and messageText(to confirm that the inputted user text was captured after pressing enter). Then, under the handleEvent for "Enter", I made a
this.setState call where I stored the inputted message, cleared the blank slate, and sent the inputted message via an axios.get. Then, within the axios 
call I again used this.setState to set the new robot chat text and grab the new context to pass along to the server with the next client message
*/
AppRegistry.registerComponent('VRBasics', () => Basics);

