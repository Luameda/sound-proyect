import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext, useEffect } from 'react'
// import { music } from '../../dumData';
// import { FontAwesome } from '@expo/vector-icons';

import { PlayerContext } from '../context/PlayerContext'
import WidgetPlayer from '../components/WidgetPlayer';

export default function SearchScreen() {
    const { isActive } = useContext(PlayerContext)

    // console.log(isActive)
    return (
        <>
            <View style={styles.conatiner}>
                <Text>
                    HOME SCREEN
                </Text>
            </View>

            {isActive && <WidgetPlayer />}
        </>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})