import React, { Component } from 'react';
import { View, Model, asset, Animated } from 'react-vr'
import BouncingText from './bouncingText';

const AnimatedModel = Animated.createAnimatedComponent(Model);
class RobotModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0.5),
       hoverValue: new Animated.Value(-0.3),
       rotate: function (){
   Animated.sequence([
    Animated.timing(this._animatedValue, {
        toValue: -.3,
        duration: 1000
    }),
    Animated.timing(this._animatedValue,{
      toValue: -.7,
      duration: 1000
    })
    ]).start((event)=> {if(event.finished){this.state.rotate()}});
   },

    };
  }

componentWillMount() {
    this._animatedValue = new Animated.Value(-.7);
  }
  componentDidMount() {
   this.state.rotate()
  }
  render() {
     var rotate = this._animatedValue.interpolate({
        inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View>        
        <BouncingText theText={this.props.robotText} rotate={this.state.rotate} />
        <AnimatedModel style={{ transform: [{ translate: [1, -.3, -3] }, { scale: 0.7 }, {rotate: rotate}, {translateY: this._animatedValue}] }} source={{ obj: asset('br1.obj'), mtl: asset('br1.mtl')}}/>
      </View>
    );
  }
}

export default RobotModel;