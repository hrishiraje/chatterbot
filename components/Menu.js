import React from 'react';
import {Animated, asset, Image, View, VrButton, Model} from 'react-vr';
import axios from 'axios';


export default class Menu extends React.Component {
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
    axios.post('/toppings', toppings)
    .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width: 2,
        alignItems: 'stretch',
        transform: [{translate: [-2, 2, -2]},
        {rotateY: 45}
        ]}}>
      <VrButton onClick={()=>this.setState({pepperoni:{selected: !this.state.pepperoni.selected, code: this.state.pepperoni.code}})}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://i.imgur.com/ISykk1n.jpg'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      <VrButton onClick={()=>this.setState({italianSausage:{selected: !this.state.italianSauage.selected, code: this.state.italianSausage.code}})}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://i.imgur.com/8fBPAY7.jpg'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      <VrButton onClick={()=>this.setState({beef:{selected: !this.state.beef.selected, code: this.state.beef.code}})}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://3.bp.blogspot.com/-IY5KYLYaTHY/UukyyqLZv8I/AAAAAAAGe9I/MHayfAqSI9g/s1600/DOMINO%27S+PIZZA+Medium+Beef+12+Inch+1+Lb.+7+Oz.+Pie,+Domino%27s+Pizza+Delivery+Take+Out+Store+Restaurant+Medium+Beef+Pizza.JPG'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      <VrButton onClick={()=>this.setState({ham:{selected: !this.state.ham.selected, code: this.state.ham.code}})}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'https://knightstemplarinternational.com/wp-content/uploads/2016/08/Ham-Pizza-2.jpg'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      <VrButton onClick={()=>this.setState({bacon:{selected: !this.state.bacon.selected, code: this.state.bacon.code}})}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'https://knightstemplarinternational.com/wp-content/uploads/2017/03/Bacon.jpg'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      <VrButton onClick={()=>this.submit()}>
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://i.imgur.com/t1dfqfF.png'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue} 
           // Map `bounceValue` to `scale`
          ]
        }}
      />
      </VrButton>
      </View>
    );
  }
}
