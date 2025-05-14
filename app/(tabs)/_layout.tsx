import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";

const Drawer = createDrawerNavigator();
export default function MyDrawer() {
  return (
    <Provider store={store}>
      <Drawer.Navigator>
        <Drawer.Screen name="Keypad" component={KeypadTabLayout} />
        <Drawer.Screen name="Quiz" component={QuizTabLayout} />
        <Drawer.Screen name="Settings" component={SettingsTabLayout} />
      </Drawer.Navigator>
    </Provider>
  );
}

function KeypadTabLayout() {
  return (
    <Tabs
      /*screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
      }}*/
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Keys",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"apps-outline"} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="settings/octaves"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/scales"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/difficulty"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/general"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/note"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="quiz/progression"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/interval"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
function QuizTabLayout() {
  return (
    <Tabs
      /*screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
      }}*/
    >
      <Tabs.Screen
        name="quiz/note"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"musical-note"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz/progression"
        options={{
          title: "Interval",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"musical-notes"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz/interval"
        options={{
          title: "Progression",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"pulse"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/octaves"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/scales"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/difficulty"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/general"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
function SettingsTabLayout() {
  return (
    <Tabs
      /*screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
      }}*/
    >
      <Tabs.Screen
        name="settings/scales"
        options={{
          title: "Scale",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"musical-notes"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/octaves"
        options={{
          title: "Octaves",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={"cellular-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/difficulty"
        options={{
          title: "Difficulty",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"options"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/general"
        options={{
          title: "Test",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"hammer"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/note"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/progression"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/interval"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
