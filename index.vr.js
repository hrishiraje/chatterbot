import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Text, StyleSheet, Box, VideoPano, Sound } from 'react-vr';
import axios from 'axios';

import BouncingText from './components/bouncingText';
import RobotModel from './components/robotModel';
import TopplingList from './components/toppingList';
import Typing from './components/typing';
import Timer from './components/timer';

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
      pizzaCode: '',
      toppings: [],
      playSound: true,
      robotTyping: false,
      showTracker: false
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
    if (e.nativeEvent.inputEvent.eventType === 'keyup')
    if (e.nativeEvent.inputEvent.key === 'Backspace'){
      this.setState({
        keyboardText: this.state.keyboardText.substring(0,this.state.keyboardText.length - 1)
      });
    } else if (e.nativeEvent.inputEvent.key === 'Enter') {
      this.setState({
        robotTyping: true
      });
      this.setState({
        messageText: JSON.parse(JSON.stringify(this.state.keyboardText)), keyboardText: ''}, () => {
          var modifiedMessage = this.state.messageText.replace(/\>\s/gi, '+');
          var urlMessage = '?message='+modifiedMessage+'&context='+this.state.context;
          axios.get(`/api/response${urlMessage}`).then(function(response) {
              console.log('TOPPINGS', response.data.toppings);
              setTimeout(() => {
                me.setState({
                  robotText: response.data.output,
                  context: response.data.nextContext,
                  playSound: !me.state.playSound,
                  robotTyping: false
                });
                if (response.data.pizzaCode !== undefined) {
                  me.setState({
                    pizzaCode: response.data.pizzaCode
                  });
                }
                if (response.data.toppings !== undefined) {
                  me.setState({
                    robotText: response.data.output,
                    context: response.data.nextContext,
                    robotTyping: false
                  });
                }
                if (response.data.pizzaCode !== undefined) {
                  me.setState({
                    pizzaCode: response.data.pizzaCode,
                    robotTyping: false
                  });
                }
                if (response.data.toppings !== undefined) {
                  me.setState({
                    toppings: response.data.toppings,
                    robotTyping: false
                  });
                }
              }, 2000);
            }
          );
      });
    } else {
      if(e.nativeEvent.inputEvent.key !== 'Shift')
      this.setState({
        keyboardText: this.state.keyboardText+= e.nativeEvent.inputEvent.key
      });
    }
  }

  placeOrder(toppings) {
    var me = this;
    var orderData = {};
    orderData.pizzaCode = this.state.pizzaCode;
    orderData.toppings = toppings;
    console.log('ORDER DATA TOPPINGS', orderData.toppings);
    axios.post('/api/placeOrder', orderData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      me.setState({
        toppings: [],
        pizzaCode: '',
        robotText: 'Great! Your pizza should be on its way! I\'ll keep you informed with updates',
        showTracker: true
      });
  }

  render() {
    return (
      <View onInput={this.handleInput.bind(this)}>
        <Pano source={asset('sky_platform.jpg')}></Pano>
        {this.state.playSound ? 
        ( <Sound source={asset('robo.mp3')} /> )
        : (
          <Sound source={asset('robo2.mp3')} />
        )}
        <RobotModel robotTyping={this.state.robotTyping} robotText={this.state.robotText}/>
        <View>
          <Text style={styles.currentText}>{this.state.keyboardText}</Text>
          <Text style={styles.historyText}>{this.state.messageText}</Text>
        </View>
        <TopplingList toppings={this.state.toppings} submitOrder={this.placeOrder.bind(this)}/>
        {this.state.showTracker === true ? <Timer showTracker={this.state.showTracker}/> : null}
      </View>
    );
  }
}

AppRegistry.registerComponent('VRBasics', () => Basics);

