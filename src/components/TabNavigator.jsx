import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
import SettingsScreen from '../pages/SettingsScreen';
import Player from '../pages/Player';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Host>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Group>
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{ tabBarIcon: () => <FontAwesome5 name="search" size={24} color="black" /> }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{ tabBarIcon: () => <Ionicons name="settings-sharp" size={24} color="black" /> }}
                    />
                    <Tab.Screen
                        name="?"
                        component={Player}
                        //options={{ tabBarIcon: () => <Ionicons name="settings-sharp" size={24} color="black" /> }}
                    />
                </Tab.Group>
            </Tab.Navigator>
        </Host>
    )
}