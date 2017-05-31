import React from 'react';
import {Animated, asset, Image, View, VrButton, Model, StyleSheet, Text} from 'react-vr';
import axios from 'axios';

var styles = StyleSheet.create({
  toppingImage: {
    width: 1,
    height: 1,
    borderRadius: 0.25,
    borderWidth: 0.05,
    margin: 0.2
  },
  container: {
    flex: 1,
    flexDirection: 'row', 
    width: 1, 
    height: 1,
    alignItems: 'stretch',
    transform: [
      { 
        translate: [-3, 4, -3]
      }, 
      { 
        rotateX: 45
      }
    ]
  },
  text: {
    fontSize: 0.2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuButton: {
    backgroundColor: 'green',
    borderRadius: 0.25,
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    transform: [
      { translate: [-3, 3, -3] }
    ]
  }
})


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pepperoni: {
        selected : false,
        code : 'P'
      },
      italianSausage: {
        selected : false,
        code : 'S'
      },
      beef: {
        selected: false,
        code: 'B'
      },
      ham: {
        selected: false,
        code: 'H'
      },
      bacon : {
        selected: false,
        code: 'K'
      },
      salami: {
        selected: false,
        code: 'Sa'
      },
      chicken: {
        selected: false,
        code: 'Du'
      },
      bounceValue: new Animated.Value(0),
    }
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }

  submit() {
    var toppings = [];
    for(var key in this.state){
      if(this.state[key].selected === true){
        toppings.push(this.state[key].code)
      }
    }

    this.props.submitOrder(toppings);

  }

  renderToppings() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <VrButton>
          <Text style={styles.text}>
            Pepperoni
          </Text>
          <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'http://i.imgur.com/ISykk1n.jpg'}}
            style={[ styles.toppingImage,  {transform: [ {scale: this.state.bounceValue} ]}]}
          />
        </VrButton>
        <VrButton onClick={()=>this.setState({italianSausage:{selected: !this.state.italianSauage.selected, code: this.state.italianSausage.code}})}>
          <Text style={styles.text}>
            Italian Sausage
          </Text>
          <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'http://i.imgur.com/8fBPAY7.jpg'}}
            style={[styles.toppingImage, { transform: [{ scale: this.state.bounceValue }] }]}
          />
        </VrButton>
        <VrButton onClick={()=>this.setState({beef:{selected: !this.state.beef.selected, code: this.state.beef.code}})}>
          <Text style={styles.text}>
            Beef
          </Text>
          <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'http://3.bp.blogspot.com/-IY5KYLYaTHY/UukyyqLZv8I/AAAAAAAGe9I/MHayfAqSI9g/s1600/DOMINO%27S+PIZZA+Medium+Beef+12+Inch+1+Lb.+7+Oz.+Pie,+Domino%27s+Pizza+Delivery+Take+Out+Store+Restaurant+Medium+Beef+Pizza.JPG'}}
            style={[styles.toppingImage, { transform: [{ scale: this.state.bounceValue }] }]}
          />
        </VrButton>
        <VrButton onClick={()=>this.setState({ham:{selected: !this.state.ham.selected, code: this.state.ham.code}})}>
          <Text style={styles.text}>
            Ham
          </Text>
          <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'https://knightstemplarinternational.com/wp-content/uploads/2016/08/Ham-Pizza-2.jpg'}}
            style={[styles.toppingImage, { transform: [{ scale: this.state.bounceValue }] }]}
          />
        </VrButton>
        <VrButton onClick={()=>this.setState({bacon:{selected: !this.state.bacon.selected, code: this.state.bacon.code}})}>
          <Text style={styles.text}>
            Bacon
          </Text>
          <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'https://knightstemplarinternational.com/wp-content/uploads/2017/03/Bacon.jpg'}}
            style={[styles.toppingImage, { transform: [{ scale: this.state.bounceValue }] }]}
          />
        </VrButton>
        <View>
          <VrButton onClick={()=>this.submit()}>
            <Text style={styles.menuButton}>
              Submit
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

export default Menu;