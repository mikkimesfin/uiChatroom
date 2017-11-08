import React from 'react';

import {
  Text,
  View
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import FirstScreen from './tabs/FirstScreen'
import SecondScreen from './tabs/SecondScreen'
import ThirdScreen from './tabs/ThirdScreen'
import FourthScreen from './tabs/FourthScreen'
import FifthScreen from './tabs/FifthScreen'
import SixthScreen from './tabs/SixthScreen'




var MainScreenNavigator = TabNavigator({
  ui: {screen: FifthScreen},
  Chat: {screen: FirstScreen},
  Deck: {screen: FourthScreen},
  Fave: {screen: ThirdScreen},
  List: {screen: SecondScreen},
  Bye: {screen: SixthScreen}
  }, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: 'darkgreen',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: 'green',
    labelStyle: {
      fontSize: 16,
      padding: 10
    }
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Tab Example'
};

export default MainScreenNavigator;
