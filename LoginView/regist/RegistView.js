

import React, { Component } from 'react';
// import { createStackNavigator } from 'react-navigation';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import RegistCell from './RegistCell';

const { width1, height1 } = Dimensions.get('window');
const SCREEN_WIDTH1 = width1;

export default class RegistView extends React.Component {

	constructor(props) {
    super(props);
    this.state = { 
        error: false,
        page: 1,
        data:[],
        refreshing: false,
        loading: false,
    };
  }

  static navigationOptions = {
    title: '注册',
  };

  componentDidMount(){
    this.requestData();
  }

  requestData = () => {
    const url = 'https://api.github.com/users/futurechallenger/repos';
    fetch(url).then(res => {
      console.log('started fetch');
      return res.json()
    }).then(res => {
      this.setState({
        data: [...this.state.data, ...res], 
        error: res.error || null,
        laoding: false,
        refreshing: false,
      });
    }).catch(err => {
      console.log('==> fetch error', err);
      this.setState({ error: err, loading: false, refreshing: false});
    });
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      loading: false,
      data: [],
    }, () => {
      this.requestData();
    });
  };

  renderItem = (item) => (
    <RegistCell item={item} />
  )

  _clickItemCell = (key: number) => {
    console.log('clicked props item')
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>Message</Text>
        <FlatList
          data={this.state.data || []}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          // onRefresh={this.handleRefresh}
          onEndReachedThreshold={0} />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'stretch', 
    backgroundColor: 'white' 
  },
  touchable: {
    backgroundColor: 'yellow', 
    alignItems: 'stretch', 
    justifyContent: 'center',
    height: 250,
  },
  });