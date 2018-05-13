import React, { Component, } from 'react';
import PushNotification from 'react-native-push-notification';

class PushController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: notification => {
                console.log('NOTIFICATION: ', notification);
            },
        });
    }
    
    render() {
        return null;
    }
}

export default PushController;
