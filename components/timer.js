import React from 'react';
import { Animated, StyleSheet, View, Text, asset, Image } from 'react-vr';

var styles = StyleSheet.create( {
  container: {
    flex: 1,
    height: 1,
    width: 1.5,
    transform: [{ translate: [0, 4, -3] }, {rotateX : 45}],
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  text: {
    border: 0.5,
    borderRadius: 0.05,
    fontSize: 0.1,
    color: 'red',
    textAlign: 'center',
    backgroundColor: 'lightblue'
  }
})


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 300, 
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
  
  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
      laps: []
    });
  }
  
  handleLabClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    });
  }
  
  render() {

    var formattedSeconds = (sec) => {
      return (Math.floor(sec / 60) +
        ':' +
        ('0' + sec % 60).slice(-2));
    };
    
    var timer = formattedSeconds(this.state.secondsElapsed);
    console.log('calculated timer ', timer);

    console.log(' im getting rendered and the time is', this.state.secondsElapsed);
    console.log('should timer show? ', this.props.showTracker);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{timer}</Text>
      </View>
    );
  }
}

export default Timer;