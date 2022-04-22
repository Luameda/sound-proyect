import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext, useEffect } from 'react'
// import { music } from '../../dumData';
// import { FontAwesome } from '@expo/vector-icons';

import { PlayerContext } from '../context/PlayerContext'
import WidgetPlayer from '../components/WidgetPlayer';
import { music } from '../../dumData';

export default function SearchScreen() {
    const { widgetView, setTrack, updateAudio } = useContext(PlayerContext)

    return (
        <>
            <View style={styles.conatiner}>
                <View style={{ width: '100%' }}>
                    {
                        music.map((track, key = 0) => {
                            return (
                                <TouchableOpacity
                                    key={key++}
                                    onPress={() => setTrack(track)}
                                    style={styles.music}
                                >
                                    <Image source={{ uri: track.cover }} style={{ width: 50, height: 50 }} />
                                    <View>
                                        <Text>
                                            {track.title}
                                        </Text>
                                        <Text>
                                            {track.artist}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            {widgetView && <WidgetPlayer />}
        </>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    music: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'green',
        marginTop: 7
    }
})