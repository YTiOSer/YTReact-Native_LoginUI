

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';


export default class ButtonView extends React.Component {

	static defaultProps = {
    	btnName: 'Button',
    	underlayColor: 'gray',
	};

	constructor(props) {
    	super(props);
	}

  render() {
    return (
     	<View style = {styles.container}>
        	<TouchableHighlight
            	style={[styles.btnDefaultStyle,this.props.btnStyle,styles.center]}
            	activeOpacity={0.5}
            	underlayColor={this.props.underlayColor}
            	onPress={this.props.onPress}>

            	<Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>

        	</TouchableHighlight>
    	</View>

    	);
  }
}

const styles = StyleSheet.create({
   container: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  center:{
      justifyContent:'center',
      alignItems:'center',
  },
  btnDefaultStyle:{
      height:30,
      width:100,
      backgroundColor: '#ff8447',
      borderColor: '#ff8447',
      borderRadius: 5,
  },
  textDefaultStyle:{
     color:'#ffffff',
     fontSize:15,
  },
 }
 );