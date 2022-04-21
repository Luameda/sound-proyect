import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/components/TabNavigator";
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { PlayerProvider } from './src/context/PlayerContext'

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PlayerProvider>
          <TabNavigator />
        </PlayerProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}