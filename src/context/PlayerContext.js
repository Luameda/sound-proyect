import { createContext, useEffect, useState } from 'react'
import { Sound } from 'expo-av/build/Audio/Sound'
import { Audio } from 'expo-av'

import { music } from '../../dumData';

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
    const [widgetView, setWidgetView] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [track, setTrack] = useState(null)
    const [sound, setSound] = useState()
    const [status, setStatus] = useState({})

    const onPlaybackStatusUpdate = status => setStatus(status)

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync()
        }

        const { sound: newSound } = await Sound.createAsync(
            { uri: track?.url },
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
        setIsPlaying(true)
        setWidgetView(true)
    }



    useEffect(() => {
        playCurrentSong()
        sound ? setWidgetView(true) : setWidgetView(false)

        return async () => {
            setSound(null)
            sound?.stopAsync()
        }
    }, [track])


    const onPLayPause = async () => {
        if(isPlaying){
            setIsPlaying(!isPlaying)
            await sound.pauseAsync()
        }else{
            setIsPlaying(!isPlaying)
            await sound.playAsync()
        }
    }


    return (
        <PlayerContext.Provider
            value={{
                widgetView,
                isPlaying,
                track,
                status,
                onPLayPause,
                setTrack,
            }}
            children={children}
        />
    )
}