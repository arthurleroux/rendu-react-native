import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GamesList from './GamesList'
import Game from './Game'

const MainNavigator = createStackNavigator({
    GamesList: { screen: GamesList },
    Game: { screen: Game }
})

const Navigation = createAppContainer(MainNavigator);

function reducer(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'GAME_ID':
      return { ...state, gameId: action.payload }
    case 'LAST_GAME_NAME':
      return { ...state, lastGameName: action.payload }
    default:
      return state;
  }
}

let store = createStore(reducer);

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}