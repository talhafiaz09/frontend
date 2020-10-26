import {AppRegistry, Text} from 'react-native';
import NavigationHandler from './source/navigations/NavigationHandler';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => NavigationHandler);
