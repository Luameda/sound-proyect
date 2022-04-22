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
import { useRef, useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../context/PlayerContext'

export default function WidgetPlayer() {
    const { isPlaying, onPLayPause, track, status } = useContext(PlayerContext)
    const modalizeRef = useRef(null);
    const [progress, setProgress] = useState(50)

    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onClose = () => {
        modalizeRef.current?.close();
    };
    const progressBar = () => {
        let _100 = status?.durationMillis / 100;
        let progress = status?.positionMillis

        setProgress(progress / _100)
    }

    useEffect(() => {
        progressBar()

        return () => {
            console.log('')
        }
    }, [status])


    return (
        <>
            <View style={styles.container}>
                <View style={styles.progressBar}
                    children={
                        <View style={[styles.progress, { width: `${progress}%` }]} />
                    }
                />

                <View style={styles.trackInfo}>
                    <TouchableOpacity
                        onPress={onPLayPause}
                        children={
                            <ImageBackground
                                source={{ uri: track?.cover }}
                                style={styles.cover}
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
                            <Text
                                style={styles.title}
                                children={track?.title}
                            />
                            <Text
                                style={styles.artist}
                                children={track?.artist}
                            />
                            <Text
                                style={styles.artist}
                                children={track?.album}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Portal
                children={
                    <Modalize
                        ref={modalizeRef}
                        modalTopOffset={250}
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
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    trackInfo: {
        flexDirection: 'row'
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
    },
    progressBar: {
        height: 5,
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    progress: {
        backgroundColor: '#f3f',
        height: 4
    }
})