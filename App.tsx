import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Post from './src/post';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PostDetail from './src/postDetail';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="post"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="post" component={Post} />
          <Stack.Screen name="postDetail" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
