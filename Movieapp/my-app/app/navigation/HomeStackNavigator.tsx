import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <HomeStack.Navigator>
                <HomeStack.Screen name='main' component={HomeScreen} options={{
                    headerShown: false
                }} />
                <HomeStack.Screen name='details' component={DetailsScreen} options={{
                    headerShown: false
                }} />
            </HomeStack.Navigator>
        </View>

    )
}