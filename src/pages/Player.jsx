import { StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import WidgetPlayer from '../components/WidgetPlayer'

export default function Player() {
    const { widgetView } = useContext(PlayerContext)
    return (
        <>
            <View style={styles.container}>
                <Text>This screen needs to be replaced or removed</Text>
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