import React, { Fragment } from 'react';
//import navigation
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

//import components
import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';


const MainNavigator = createStackNavigator({
  //components for the app
  MovieList: {
    screen: MovieListScreen
  },
  MovieDetail: {
    screen: MovieDetailScreen
  }
});

const App = createAppContainer(MainNavigator);

export default App;


