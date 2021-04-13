/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import { Home } from './src/screens/home';
import { Carteira } from './src/screens/carteira'
import TabNavigation from './src/navigation/TabNavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TabNavigation);
