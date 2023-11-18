import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployeeDetails from "./components/EmployeeDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmployeeProfile">
        <Stack.Screen
          name="Employee Profile"
          component={EmployeeProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
