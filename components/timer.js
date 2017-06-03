import React from 'react';
import { Animated, StyleSheet, View, Text, asset, Image } from 'react-vr';

import BouncingText from './bouncingText';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1.5,
    height: 1.5,
    transform: [{ translate: [0, 2, 0] }],
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  text: {
    border: 0.5,
    borderRadius: 0.05,
    fontSize: 1.0,
    color: 'red',
    textAlign: 'center',
  },
  textETA: {
    border: 0.5,
    borderRadius: 0.05,
    fontSize: 0.3,
    color: 'green',
    textAlign: 'center',
  }
})


class Timer extends React.Component {
  constructor(props) {
    super(props);
    var time = Math.floor(Math.random()*30*60)+40*60;
    this.state = { 
      secondsElapsed: time, 
      laps: [],
      lastClearedIncrementer: null
    };
    this.incrementer = null;
  }  

  componentDidMount() {
    this.handleStartClick();
  }
    
  handleStartClick() {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed - 1
      })
    , 1000);
  }
  
  render() {

    var formattedSeconds = (sec) => {
      return (Math.floor(sec / 60) +
        ':' +
        ('0' + sec % 60).slice(-2));
    };
    
    var timer = formattedSeconds(this.state.secondsElapsed);
    console.log('calculated timer ', timer);

    console.log('im getting rendered and the time is', this.state.secondsElapsed);
    console.log('should timer show? ', this.props.showTracker);
    return (
      <View style={styles.container}>
        <BouncingText theText={'Alright I\'ve placed your order. Your pizza will arive in:'}/>
        <BouncingText theText={timer}/>
      </View>
    );
  }
}

export default Timer;