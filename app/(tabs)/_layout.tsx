import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarStyle: { backgroundColor: Colors.white },
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.blue,
        tabBarShowLabel: false
      }}
    >
        <Tabs.Screen 
            name="Home"
            options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                ),
            }}
        />
        <Tabs.Screen 
            name="Reminder"
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="access-alarm" size={24} color={color} />
                ),
            }}
        />
        <Tabs.Screen 
            name="Explore"
            options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="search1" size={24} color={color} />
                ),
            }}
        />
        <Tabs.Screen 
            name="Emergency"
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="phone" size={24} color={color} />
                ),
                headerShown: false,
            }}
        />
        <Tabs.Screen 
            name="Profile"
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="menu" size={24} color={color} />
                ),
                headerShown: false,
            }}
        />
    </Tabs>
  )
}
