import { StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import WidgetPlayer from '../components/WidgetPlayer'

export default function SettingsScreen() {
  const { widgetView } = useContext(PlayerContext)
  return (
    <>
      <View style={styles.container} >
        <Text>SETTINGS SCREEN</Text>
      </View>
      {widgetView && <WidgetPlayer />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})