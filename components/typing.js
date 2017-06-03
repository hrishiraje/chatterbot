import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, Sphere, asset } from 'react-vr';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: asset('cloud.jpg'),
    width: 1.5,
    flexDirection: 'row',
    alignItems: 'stretch',
    transform: [
      { translate: [-0.1, 0.8, -3] }
    ]
  },
  ballContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'stretch',
    fontSize: 0.3,
     transform: [
      { translate: [0, -0.25, 0] }
    ]
  }
})

class Typing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yValue1: new Animated.Value(-0.3),
      yValue2: new Animated.Value(-0.3),
      yValue3: new Animated.Value(-0.3)
    }
  }

  componentDidMount() {
    this.mainBounce();
  }

  mainBounce() {
    setInterval(() => {
      this.moveUp1();
    }, 100);

    setInterval(() => {
        this.moveUp2();
    }, 150);

    setInterval(() => {
        this.moveDown1();
    }, 300);
      
    setInterval(() => {
        this.moveUp3();
    }, 350);

    setInterval(() => {
        this.moveDown2();
    }, 350);

    setInterval(() => {
        this.moveDown3();
    }, 550);
  }

  moveUp1() {
    Animated.spring(this.state.yValue1, {
      toValue: -0.2
    }).start();
  }

  moveDown1() {
    Animated.spring(this.state.yValue1, {
      toValue: -0.3
    }).start();
  }

  moveUp2() {
    Animated.spring(this.state.yValue2, {
      toValue: -0.2
    }).start();
  }

  moveDown2() {
    Animated.spring(this.state.yValue2, {
      toValue: -0.3
    }).start();
  }

  moveUp3() {
    Animated.spring(this.state.yValue3, {
      toValue: -0.2
    }).start();
  }

  moveDown3() {
    Animated.spring(this.state.yValue3, {
      toValue: -0.3
    }).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.ballContainer, { transform: [{ translateY: this.state.yValue1 }] }]}>
          <Sphere
            radius={0.1}
            widthSegments={30}
            heightSegments={30}
            texture={asset('f_t.png')}
          />
          </Animated.View>
        <Animated.View style={[styles.ballContainer, { transform: [{ translateY: this.state.yValue2 }] }]}>
          <Sphere
            radius={0.1}
            widthSegments={30}
            heightSegments={30}
            texture={asset('f_t.png')}
          />
        </Animated.View>
        <Animated.View style={[styles.ballContainer, { transform: [{ translateY: this.state.yValue3 }] }]}>
          <Sphere
            radius={0.1}
            widthSegments={30}
            heightSegments={30}
            texture={asset('f_t.png')}
          />
        </Animated.View>
        <Text style={styles.text}>
          hmm
        </Text>
      </View>
    );
  }
}

export default Typing;