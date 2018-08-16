/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ButtonView from './ButtonView';
import RegistView from './regist/RegistView';

import {
  Platform,
  StyleSheet,
  Text,
  View, 
  TextInput, 
  Button,
  Alert,
  Fetch,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const PWRightWid = 100;


type Props = {};

class RootView extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { 
      userNameTip: "手机号",
      userName: "",
      userPWTip: "验证码",
      userPW: "",
      changeBtnTitle: "使用账号密码登录"
      PWRight: 0,
    };


    this._getUserName = this._getUserName.bind(this); //获取用户名
    this._getUserPW = this._getUserPW.bind(this); //获取密码
    this._onClickLogin = this._onClickLogin.bind(this); //登录
    this._getPhoneCode = this._getPhoneCode.bind(this); //获取验证码
    this._onClickSIM = this._onClickSIM.bind(this); //点击切换账号手机号登录
    this._onClickForgetPW = this._onClickForgetPW.bind(this); //点击忘记密码
    this._hiddenGetCodeBtn = this._hiddenGetCodeBtn.bind(this); //隐藏获取验证码

  }

  static navigationOptions = {
    title: '登录',
  };

  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.BGViewStyle}>
              <View style = {[styles.inputCellStyle, { height: 49.75, top: 0, right: 0, }]}>
                  <Text style={styles.welcome}>
                  {this.state.userNameTip}
                  </Text>
                  <TextInput style={styles.inputViewStyle}
                       onChangeText = {(text) => {
                          this.setState({userName: text});
                     }}
                      placeholder="请输入手机号"
                  />
              </View>
              
              <View style = {[styles.lineStyle, {top: 49.75}]}> </View>

              <View style = {[styles.inputCellStyle, { height: 49.75, top: 50.25, right: this.state.PWRight, justifyContent: 'space-between'}]}>
                  <Text style={styles.welcome}>
                      {this.state.userPWTip}
                  </Text>
                  <TextInput style={styles.inputViewStyle}
                      secureTextEntry={true}
                       onChangeText = {(text) => {
                         this.setState({userPW: text});
                     }}
                      placeholder="请输入验证码"
                  ></TextInput>
                  <ButtonView 
                      btnName='获取验证码'
                      btnStyle = {{width: 90,marginRight: 10, backgroundColor: '#D6D6D6'}}
                      onPress = {this._getPhoneCode}
                      textStyle = {{color:'gray', justifyContent: 'flex-end',}}
                  ></ButtonView>
              </View>

              <View style = {[styles.lineStyle, {top: 99}]}> </View>
          </View>

          <ButtonView 
              btnName='登录'
              btnStyle = {styles.loginBtnStyle}
              onPress = {this._onClickLogin}
          ></ButtonView>

          <ButtonView 
              btnName='忘记密码?'
              btnStyle = {styles.forgetPWStyle}
              onPress = {this._onClickForgetPW}
              textStyle = {{color:'#D6D6D6', justifyContent: 'flex-end',}}
          ></ButtonView>

          <ButtonView 
              btnName= {this.state.changeBtnTitle}
              btnStyle = {styles.SIMBtnStyle}
              onPress = {this._onClickSIM}
              textStyle = {{color:'#D6D6D6'}}
          ></ButtonView>

      </View>
    );
  }

    _getUserName = () => {
    alert('A name was submitted: ' + this.state.userName);
  };

   _getUserPW = () => {
    alert('A pwd was submitted: ' + this.state.userPW);
  }

  _getPhoneCode = () => {
    alert('获取验证码')
  }

  _onClickLogin = () => {
    var usrInfo = "用户名：" + this.state.userName + "密码：" + this.state.userPW
    Alert.alert(usrInfo);

  };

  _onClickSIM = () =>{
     this.setState({PWRight: this.state.PWRight == PWRightWid ? 0 : PWRightWid});
     this._hiddenGetCodeBtn
     this.setState({userNameTip: this.state.PWRight == PWRightWid ? "手机号" : "账户"});
     this.setState({userPWTip: this.state.PWRight == PWRightWid ? "验证码" : "密码"});
     this.setState({changeBtnTitle: this.state.PWRight == PWRightWid ? "使用账号密码登录" : "使用手机号验证码登录"});
  };

  _onClickForgetPW = () =>{
      this.props.navigation.navigate('Details');
  };

  _hiddenGetCodeBtn = () => {
    if (this.state.PWRight == PWRightWid){
        reuturn (
            <ButtonView 
                btnName='获取验证码'
                btnStyle = {{alignItems: 'flex-end', backgroundColor: '#D6D6D6'}}
                onPress = {this._getPhoneCode}
                textStyle = {{color:'gray', justifyContent: 'flex-end',}}
            ></ButtonView>
        );
    }else{
      return NULL;
    }
  }


  getUsrInfo = () => {

      fetch('http://mob.b2bex.com/mAutozi/login/login.mpi?loginName=xiaob10&pwd=123456789a')
      .then((response) => response.json())
      .then((responseJson) => {

          this.state.userName = responseJson.status.code;
          this.state.userPW = responseJson.status.msg;

          this.setState({'userName':responseJson.status.code, 'userPW':responseJson.status.msg});
          
          return "responseJson.movies";
      })
      .catch((error) => {
          console.error(error);
      });
  }
}

export default createStackNavigator({
  Home: {
    screen: RootView
  },
  Details:{
    screen: RegistView
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  BGViewStyle:{
    position: 'absolute', 
    top: 20, 
    left: 0, 
    right: 0,
    height: 100, 
    backgroundColor: 'white', 
    flexDirection: 'column',
  },
  inputCellStyle:{
      left: 0, backgroundColor: 'white', flexDirection: 'row', position: 'absolute', alignItems: 'center',
  },
  lineStyle:{
      height: 0.5, backgroundColor: '#D6D6D6', position: 'absolute', left: 0, right: 0
  },
  inputViewStyle:{
    height: 49.5,right: 0, left: 80, top: 0 , borderColor: 'white', borderWidth: 1, position: 'absolute'
  },
  loginBtnStyle:{
    backgroundColor: '#D6D6D6', height: 45, width: SCREEN_WIDTH - 32, top: 150, position: 'absolute', margin:16,
  },
  forgetPWStyle:{
    margin:16, 
    position: 'absolute',
    right: 0,
    top:210,
    width: 150,
    height: 30, 
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  SIMBtnStyle:{
    position: 'absolute',
    top:260,
    height: 30, 
    width: SCREEN_WIDTH - 32,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    height: 16.5,
    width: 100,
  },
});
