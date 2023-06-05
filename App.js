import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Conversation from './screens/Conversation';
import Notice from './screens/Notice';
import Blacklist from './screens/BlackList';
import Gallery from './screens/Gallery';
import ToDo from './screens/ToDo';
import Convo from './screens/Convo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Convo"
          component={Convo}
        />
        <Stack.Screen
          name="Conversation"
          component={Conversation}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
        />
        <Stack.Screen
          name="Blacklist"
          component={Blacklist}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
        />
        <Stack.Screen
          name="To Do"
          component={ToDo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
