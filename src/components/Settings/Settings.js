import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { MaxScoreSetting, WinLoseSetting, SaveGameComponent, MainMenuSettingsFooter, } from './';
import { NavigationBar, } from './../../containers';
import { NewGameSettings, MainMenu, Scoreboard, } from './../../utility/constants';

const Settings = props => (
    <View style={styles.container}>
        <View style={styles.SettingsContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>
            <View style={styles.settings}>
                <WinLoseSetting
                    description="Top score to win or lose"
                    maxScoreWins={props.maxScoreWins}
                    toggleWinLose={props.updateWinOrLoseDispatcher}
                />
                <MaxScoreSetting
                    inputType="max-score"
                    description={ "Top score to " + (props.maxScoreWins? "win":"lose")}
                    maxScore={props.maxScore}
                    updateMaxScore={props.updateMaxScoreDispatcher}
                />
            </View>
            {props.navigation.state.routeName === NewGameSettings?
                <MainMenuSettingsFooter
                    navigation={props.navigation}
                />
                :
                <SaveGameComponent
                    edited={props.edited}
                    gameName={props.gameName}
                    saved={props.saved}
                    navigation={props.navigation}
                    saveProgress={props.saveProgressDispatcher}
                />
            }

        </View>
    </View>
);

Settings.navigationOptions = ({ navigation, }) => {
    return {
        headerTitle: <NavigationBar
            navigation={navigation}
            showControls={false}
            title={navigation.state.routeName === NewGameSettings? 'MULTIBOARD' : 'SCOREBOARD'}
        />,
        headerStyle: {
            backgroundColor: '#9a9',
            height: 65,
        },
        headerTintColor: '#222',
        headerLeft: <Icon name={'chevron-left'} size={35} onPress={ () => { if (navigation.state.routeName === NewGameSettings) navigation.goBack(); else navigation.navigate(Scoreboard);} }  />,
    };
};

Settings.propTypes = {
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    updateWinOrLoseDispatcher: PropTypes.func.isRequired,
    updateMaxScoreDispatcher: PropTypes.func.isRequired,
    saveProgressDispatcher: PropTypes.func,
    navigation: PropTypes.object,
    players: PropTypes.array.isRequired,
    gameName: PropTypes.string,
    saved: PropTypes.object,
    edited: PropTypes.bool,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9a9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    SettingsContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        flexDirection: 'column',
        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#444',
    },
    title: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: 2,
        padding: 35,
        marginBottom: 25,
    },
});

export default Settings;