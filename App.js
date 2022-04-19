import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/components/TabNavigator";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Player from "./src/pages/Player";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <TabNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}