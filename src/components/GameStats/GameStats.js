import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import PositionsTable from './PositionsTable'
import { WON, LOST, PLAYING, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';
import { StatefullAnimatedButton, } from './../Button';
import { formatTime, } from './../../utility/format';

const GameStats = props => {
    const sortedPlayers = props.maxScoreWins?
        sortPlayersMaxScoreWins(props.players.slice())
        :
        sortPlayersMaxScoreLoses(props.players.slice());
    const gameFinishedTitleComponent = () => {
        let winningTimeComponent;
        if (props.gameFinished && props.maxScoreWins && props.timed && sortedPlayers[0].elapsedTime) {
            winningTimeComponent= <Text style={styles.winingTime}>Finished: {formatTime(sortedPlayers[0].elapsedTime)}</Text>;
        }
        if (props.gameFinished) {
            return (
                <View>
                    <Text style={styles.titleName}>
                        {sortedPlayers[0].name}
                    </Text>
                    <Text style={styles.titleWin}>
                        WON!!!
                    </Text>
                    {winningTimeComponent}
                </View>
            );
        }
    }

    return (
        <View style={[ styles.container, ]}>
            {gameFinishedTitleComponent()}
            <Text style={styles.subTitle}>Scores</Text>
            <PositionsTable
                players={sortedPlayers}
                timed={props.timed}
                showTime={props.gameFinished && !props.maxScoreWins && props.timed}
                time={props.time}
            />
            <StatefullAnimatedButton
                onPress={() => {props.updateDisplayStats(false);}}
                text="Continue"
                width={120}
                delay={700}
            />
        </View>
    );
}

GameStats.propTypes = {
    players: PropTypes.array.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    timed: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    gameFinished: PropTypes.bool.isRequired,
    updateDisplayStats: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        zIndex: 10,
        width: 300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
        borderColor: '#444',
        borderWidth: 3,
        borderRadius: 15,
        paddingBottom: 30,
    },
    titleName: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 15,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 20,
    },
    titleWin: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 30,
    },
    subTitle: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '600',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    winingTime: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 20,
    },
});

export default GameStats;
