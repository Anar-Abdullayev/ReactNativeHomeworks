import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name='main' component={HomeScreen}/>
            <HomeStack.Screen name='details' component={DetailsScreen}/>
        </HomeStack.Navigator>
    )
}