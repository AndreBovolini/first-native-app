import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import  Home  from './src/screens/home';
import  Carteira  from './src/screens/carteira'
import TabNavigation from './src/navigation/TabNavigation';
import  Performance  from './src/screens/performance';
import  AuthOrApp from './src/screens/AuthorApp';
import Login from './src/screens/Login';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TabNavigation);
