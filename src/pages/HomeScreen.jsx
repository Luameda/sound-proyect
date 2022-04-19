/* import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Audio } from 'expo-av'

import { music } from '../../dumData'

export default function HomeScreen() {
    const [playing, setPlaying] = useState(false)
    const [playbackObj, setPlaybackObj] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [volume, setVolume] = useState(1.0)
    const [buffering, setBuffering] = useState(false)

    const loadAudio = async () => {
        try {
            const playbackInstance = new Audio.Sound()
            const source = { uri: music[currentIndex].url }
            const status = { shouldPlay: playing, volume }

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)

            setPlaybackObj({ playbackInstance })
        } catch (err) {
            console.error(err)
        }
    }

    const onPlaybackStatusUpdate = status => {
        setBuffering(status.buffering)
    }

    const handlePlayPause = async () => {
        playing ? await playbackObj.pauseAsync() : playbackObj.playAsync()
        setPlaying(!playing)
    }

    const handlePreviousTrack = async () => {
        if (playbackObj) {
            await playbackObj.unloadAsync()
            currentIndex < music.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)

            setCurrentIndex({ currentIndex })
            loadAudio()
        }
    }

    const handleNextTrack = async () => {
        if (playbackObj) {
            await playbackObj.unloadAsync()
            currentIndex < music.length - 1 ? (currentIndex += 1) : (currentIndex = 0)

            setCurrentIndex(currentIndex)
        }
    }

    useEffect(async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })

            loadAudio()
        } catch (err) {
            console.error(err)
        }

        return playbackObj ?
            () => {
                playbackObj.unloadAsync()
            }
            : undefined
    }, [playbackObj])


    return (
        <View style={styles.container}>
            <Image
                style={styles.albumCover}
                source={{ uri: "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg" }}
            />

            <View style={styles.controls}>
                <TouchableOpacity style={styles.control} onPress={handlePreviousTrack} >
                    <FontAwesome5 name="step-backward" size={48} color="#444" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.control} onPress={handlePlayPause} >
                    {playing
                        ?
                        (<FontAwesome5 name='pause' size={48} color='#444' />)
                        :
                        (<FontAwesome5 name="play" size={48} color="#444" />)
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.control} onPress={handleNextTrack} >
                    <FontAwesome5 name="step-forward" size={48} color="#444" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumCover: {
        width: 250,
        height: 250
    },
    trackInfo: {
        padding: 40,
        backgroundColor: '#fff'
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#550088'
    },
    largeText: {
        fontSize: 22
    },
    smallText: {
        fontSize: 16
    },
    controls: {
        flexDirection: 'row'
    },
    control: {
        margin: 20
    }
}) */



import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { music } from '../../dumData';
import { FontAwesome5 } from '@expo/vector-icons';
import { Sound } from 'expo-av/build/Audio/Sound'

export default function App() {
    const [song, setSong] = useState(null)
    const [sound, setSound] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(true)
    const [status, setStatus] = useState(null)

    const onPlaybackStatusUpdate = status => setStatus(status)

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync()
        }

        const { sound: newSound } = await Sound.createAsync(
            { uri: song[2].url },
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


    useEffect(() => {
        // console.log(song)
        setSong(music)
        if (song) {
            playCurrentSong();
            console.log(status)
        }
    }, [song])



    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPlayPausePress}
                children={
                    <FontAwesome5
                        name={status?.isPlaying ? 'pause' : 'play'}
                        size={40}
                        color='black'
                    />
                }
            />
            <Text>{status?.positionMillis} / {status?.durationMillis}</Text>
            <Text>{status?.didJustFinish && 'Terminado'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})