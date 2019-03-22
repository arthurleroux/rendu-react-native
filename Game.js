import React from 'react';
import { View, Linking, ActivityIndicator, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';

function mapStateProps(state) {
    return {
        gameId: state.gameId,
        lastGameName: state.lastGameName
    }
}

class Game extends React.Component {
    state = {
        game: {},
        loading: true
    }

    async componentDidMount() {
        try {
            const gameApiCall = await fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.props.gameId}`);
            this.setState({game: JSON.parse(gameApiCall._bodyText), loading: false})
            
        } catch(err) {
            console.log("Error fetching data", err);
        }
    }

    render() {
        const { game, loading } = this.state;
        if(!loading) {
            return (
                <View style={styles.container}>
                    <Text h1>{game.name}</Text>
                    <Text>Players: {game.players}</Text>
                    <Text>Type: {game.type}</Text>
                    <Text>Year: {game.year}</Text>
                    <Text style={styles.textDescription}>Description: {game.description_en}</Text>
                    <Button
                        onPress={ ()=>{ Linking.openURL(game.url)}}
                        title="More details"
                    />
                </View>
            );
        }
        else {
            return <ActivityIndicator style={styles.container}/>
        }
    }
}

export default connect(mapStateProps)(Game)