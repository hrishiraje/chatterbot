import React, { Component } from 'react';
import { View, Model, asset } from 'react-vr'
import BouncingText from './BouncingText';

 
class RobotModel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>        
        <BouncingText theText={this.props.robotText} />
        <Model style={{ transform: [{translate: [1,-0.3,-3]},{scale: 0.7 }]}} source={{obj:asset('br1.obj'), mtl:asset('br1.mtl')}}/>
      </View>
    );
  }
}

export default RobotModel;