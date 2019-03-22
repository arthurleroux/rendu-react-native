import React from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';

function mapStateProps(state) {
    return {
        gameId: state.gameId,
        lastGameName: state.lastGameName
    }
}

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.goToGame = this.goToGame.bind(this);
    }

    state = {
        gamesList: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const gamesApiCall = await fetch('https://androidlessonsapi.herokuapp.com/api/game/list');
            this.setState({gamesList: JSON.parse(gamesApiCall._bodyText), loading: false})
            
        } catch(err) {
            console.log("Error fetching data", err);
        }
    }

    goToGame(item) {
        this.props.dispatch({
            type: 'GAME_ID',
            payload: item.id
        })
        this.props.dispatch({
            type: 'LAST_GAME_NAME',
            payload: item.name
        })
        this.props.navigation.navigate('Game')
    }

    render() {
        const { gamesList, loading } = this.state;
        if(!loading) {
            return (
                <View style={styles.container}>
                    <Text h1>Game list</Text>
                    <FlatList 
                        data={gamesList}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.goToGame(item)}>
                                <Text style={styles.gameList}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.name}
                    />
                    { this.props.lastGameName
                        ? <Text>Last game: {this.props.lastGameName}</Text>
                        : null
                    }
                </View>
            );
        }
        else {
            return <ActivityIndicator style={styles.container}/>
        }
    }
}

export default connect(mapStateProps)(GameList)