import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SavedScreen from "../screens/SavedScreen";
import Screen from "../screens/Screen";
import HomeNavigator from "./HomeStackNavigator";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'black'
            },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: any;

                if (route.name === 'home') iconName = focused ? 'home' : 'home-outline'
                if (route.name === 'screen2') iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
                if (route.name === 'saved') iconName = focused ? 'bookmark' : 'bookmark-outline'
                if (route.name === 'profile') iconName = focused ? 'person' : 'person-outline'
                return (
                    <Ionicons name={iconName} color={color} size={size}/>
                )
            }
            
        })}>
            <Tab.Screen name="home" component={HomeNavigator} />
            <Tab.Screen name="screen2" component={Screen} />
            <Tab.Screen name="saved" component={SavedScreen} />
            <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}