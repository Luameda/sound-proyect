import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Audio } from 'expo-av'
import { FontAwesome5 } from '@expo/vector-icons'
import { music } from '../../dumData'



export class Player extends Component {
    state = {
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false
    }

    async componentDidMount() {
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

            this.loadAudio()
        } catch (err) {
            console.error(err)
        }
    }

    async loadAudio() {
        const { currentIndex, isPlaying, volume } = this.state

        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: music[currentIndex].url
            }
            const status = {
                shouldPlay: isPlaying,
                volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)

            this.setState({ playbackInstance })
        } catch (err) {
            console.error(err)
        }

        onPlaybackStatusUpdate = status => {
            this.setState({
                isBuffering: status.isBuffering
            })
        }
    }


    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state

        isPlaying ? await playbackInstance.pauseAsync() : playbackInstance.playAsync()
        this.setState({ isPlaying: !isPlaying })
    }

    handlePreviousTrack = async () => {
        let { playbackInstance, currentIndex } = this.state

        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < music.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)

            this.setState({ currentIndex })
            this.loadAudio()
        }
    }

    handleNextTrack = async () => {
        let { playbackInstance, currentIndex } = this.state

        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < music.length - 1 ? (currentIndex += 1) : (currentIndex = 0)

            this.setState({ currentIndex })
        }
    }

    renderFileInfo() {
        const { playbackInstance, currentIndex } = this.state

        return playbackInstance && (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {music[currentIndex].title}
                </Text>
                <Text style={[styles.trackInfoText, styles.smallText]}>
                    {music[currentIndex].artits}
                </Text>
                <Text style={[styles.trackInfoText, styles.smallText]}>
                    {music[currentIndex].album}
                </Text>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.albumCover}
                    source={{ uri: "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg" }}
                />

                {this.renderFileInfo()}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack} >
                        <FontAwesome5 name="step-backward" size={48} color="#444" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.control} onPress={this.handlePlayPause} >
                        {this.state.isPlaying ?
                            (
                                <FontAwesome5 name='pause' size={48} color='#444' />
                            ) :
                            (
                                <FontAwesome5 name="play" size={48} color="#444" />
                            )
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.control} onPress={this.handleNextTrack} >
                        <FontAwesome5 name="step-forward" size={48} color="#444" />
                    </TouchableOpacity>
                </View>
                {/* {this.renderFileInfo()} */}
            </View>
        )
    }
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
})

export default Player