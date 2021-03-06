import React, { Component, } from 'react';
import { Provider, } from 'react-redux';
import { PersistGate, } from 'redux-persist/integration/react'
import codePush from "react-native-code-push";
import MainStack from './src/index';
import { store, persistor, } from './src/getStore';
import preloadImages from './src/utility/imagesPreloader';

// preloadImages(results => {});
// persistor.purge();
// console.disableYellowBox = true;

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainStack/>
                </PersistGate>
            </Provider>
        );
    }
}


export default  codePush(App);
