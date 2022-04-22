import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import PlayerModal from './PlayerModal'
import { useEffect, useRef, useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

export default function WidgetPlayer() {
    const { isPlaying, onPLayPause, track } = useContext(PlayerContext)
    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onClose = () => {
        modalizeRef.current?.close();
    };
    

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: track?.cover }}
                    style={styles.cover}
                    children={
                        <TouchableOpacity
                            onPress={onPLayPause}
                            children={
                                <FontAwesome5
                                    name={isPlaying ? 'pause' : 'play'}
                                    size={34}
                                    color='#fff'
                                />
                            }
                        />
                    }
                />
                <TouchableOpacity onPress={onOpen} style={{ width: '100%' }} >
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={styles.title}>{track?.title}</Text>
                        <Text style={styles.artist}>{track?.artist}</Text>
                        <Text style={styles.artist}>{track?.album}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Portal
                children={
                    <Modalize
                        ref={modalizeRef}
                        modalTopOffset={50}
                        children={
                            <PlayerModal onClose={onClose} />
                        }
                    />
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center'
    },
    cover: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18
    },
    artist: {
        color: "#fff",
        fontWeight: '200'
    }
})