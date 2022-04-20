import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { music } from '../../dumData';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Sound } from 'expo-av/build/Audio/Sound'

export default function App() {
    const [song, setSong] = useState(null)
    const [sound, setSound] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(true)
    const [status, setStatus] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const onPlaybackStatusUpdate = status => setStatus(status)

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync()
        }

        const { sound: newSound } = await Sound.createAsync(
            { uri: song[currentIndex].url },
            { shouldPlay: true },
            onPlaybackStatusUpdate
        )

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })

        setSound(newSound)
    }


    const onPlayPausePress = async () => {
        if (!sound) {
            return;
        }
        if (status.isPlaying) {
            // setIsPlaying(!isPlaying)
            await sound.pauseAsync();
        } else {
            // setIsPlaying(!isPlaying)
            await sound.playAsync();
        }
    }
    const handleRepeat = async () => {
        await sound.replayAsync()
    }

    const handlePreviousTrack = () => {
        if (status.positionMillis > status.durationMillis / 6) {
            handleRepeat()
        } else {
            if (currentIndex === 0) {
                handleRepeat()
            } else {
                setCurrentIndex(currentIndex - 1)
            }
        }
    }

    const handleNextTrack = () => {
        let newIndex;

        if (currentIndex < music.length - 1) {
            newIndex = currentIndex + 1
        }
        else {
            newIndex = 0
        }

        setCurrentIndex(newIndex)
    }


    useEffect(() => {
        // console.log(song)
        setSong(music)
        if (song) {
            playCurrentSong();
            // console.log(status)
        }
    }, [song, currentIndex])



    return (
        <View style={styles.container}>
            <View>
                <Text>{song[currentIndex]?.title}</Text>
                <Text>{song[currentIndex]?.artist}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
                    <FontAwesome5 name='backward' size={40} color='black' />
                </TouchableOpacity>
                {
                    status?.positionMillis === status?.durationMillis ?
                        (
                            <TouchableOpacity
                                onPress={handleRepeat}
                                children={
                                    <FontAwesome
                                        name='repeat'
                                        size={40}
                                        color='black'
                                    />
                                }
                            />
                        ) :
                        (
                            <TouchableOpacity
                                onPress={onPlayPausePress}
                                style={styles.control}
                                children={
                                    <FontAwesome5
                                        name={status?.isPlaying ? 'pause' : 'play'}
                                        size={38}
                                        color='black'
                                    />
                                }
                            />
                        )
                }
                <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
                    <FontAwesome5 name='forward' size={40} color='black' />
                </TouchableOpacity>
            </View>

            <Text>{status?.positionMillis} / {status?.durationMillis}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row'
    },
    control: {
        margin: 8
    }
})