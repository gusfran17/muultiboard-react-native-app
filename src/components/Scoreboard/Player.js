import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon, Badge, } from 'react-native-elements';
import PropTypes from 'prop-types';
import Counter from './Counter';
import { WON, LOST, PLAYING, } from './../../utility/constants';

const Player = props => {

    const removePlayer = () => {
        if (props.status !== WON) {
            props.removePlayer(props.index);
        }
        else {
            alert('You cannot delete the winner');
        }
    }

    const badge = props.status===WON?
        <Badge
            value="Winner"
            textStyle={{color: "white", fontWeight: "900", fontSize: 10,}}
            containerStyle={{backgroundColor: "#6b6",}}
        />
        : props.status===LOST?
            <Badge
                value="Loser"
                textStyle={{color: "white", fontWeight: "900", fontSize: 10,}}
                containerStyle={{ backgroundColor: "#b66",}}
            />: undefined;
    return (
        <View style={[ styles.player, ]}>
            <View style={styles.nameContainer}>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={removePlayer}
                >
                    <Icon
                        style={styles.removeButtonText}
                        color="#b66"
                        name="cancel">
                    </Icon>
                </TouchableOpacity>
                <Text
                    style={styles.name}
                    onPress={() => { props.selectPlayer(props.index) }}
                >
                    {props.name}
                </Text>
                <View style={styles.playerWonLost}>
                    {badge}
                </View>
            </View>
            <Counter
                score={props.score}
                updateScore={props.updateScore}
                index={props.index}
            />
        </View>
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ WON, LOST, PLAYING, ]).isRequired,
    removePlayer: PropTypes.func.isRequired,
    updateScore: PropTypes.func.isRequired,
    selectPlayer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    player: {
        flexDirection: 'row',
        backgroundColor: '#2f2f2f',
        borderColor: '#444',
        borderBottomWidth: 2,
    },
    playerWonLost: {
        position: 'absolute',
        top: 8,
        right: 5,
    },
    playerWon: {
        backgroundColor: '#2f6f2f',
        borderWidth: 2,
        borderColor: '#292',
    },
    playerLost: {
        backgroundColor: '#6f6f6f',
    },
    nameContainer: {
        flex: 4,
        flexDirection: 'row',
    },
    removeButton: {
        zIndex: 100,
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 17,
        paddingBottom: 18,
    },
    name: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: -30,
        fontWeight: '900',
    },
});

export default Player;
