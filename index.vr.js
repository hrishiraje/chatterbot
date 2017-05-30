import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box } from 'react-vr';
import axios from 'axios';

import BouncingText from './components/bouncingText';
import RobotModel from './components/robotModel';
import Menu from './components/Menu';

const styles = StyleSheet.create({
  currentText: {
    border: 0.5,
    borderRadius: 0.05, 
    flex: 1, 
    flexDirection: 'row', 
    width: 1, 
    alignItems: 'stretch', 
    backgroundColor: 'lightblue', 
    color: 'green', 
    transform: [{ translate: [-1, 0, -2] }] 
  },
  historyText: {
    border: 0.2,
    borderRadius: 0.05, 
    flex: 1, 
    flexDirection: 'row', 
    width: 1, 
    alignItems: 'stretch', 
    backgroundColor: 'grey', 
    color: 'red', 
    transform: [{ translate: [-1, -0.1, -2] }] 
  }
})

const styles = StyleSheet.create({
  currentText: {
    border: 0.5,
    borderRadius: 0.05, 
    flex: 1, 
    flexDirection: 'row', 
    width: 1, 
    alignItems: 'stretch', 
    backgroundColor: 'lightblue', 
    color: 'green', 
    transform: [{ translate: [-1, 0, -2] }] 
  },
  historyText: {
    border: 0.2,
    borderRadius: 0.05, 
    flex: 1, 
    flexDirection: 'row', 
    width: 1, 
    alignItems: 'stretch', 
    backgroundColor: 'grey', 
    color: 'red', 
    transform: [{ translate: [-1, -0.1, -2] }] 
  }
})

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
        <RobotModel robotText={this.state.robotText}/>
        <View>
          <Text style={styles.currentText}>{this.state.keyboardText}</Text>
          <Text style={styles.historyText}>{this.state.messageText}</Text>
        </View>
        <Menu />
      </View>
    );
  }
}

AppRegistry.registerComponent('VRBasics', () => Basics);

