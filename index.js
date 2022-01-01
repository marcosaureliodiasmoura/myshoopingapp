import 'react-native-gesture-handler';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import { registerRootComponent } from 'expo';

import App from './App';

//Caso queira habilitar o emulador local
// if (__DEV__) {
//   firestore().useEmulator('10.0.0.154', 8080);
// }

// const db = firestore();


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
