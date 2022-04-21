import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import PlayerModal from './PlayerModal'
import { useRef } from 'react'

export default function WidgetPlayer() {
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
                    source={{ uri: 'https://imagenes.elpais.com/resizer/FuuHVKhPDiTnD6P7oCNLulTTbdg=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/GUVJC4QSET5PPIO25ENUNLORK4.jpg' }}
                    style={styles.cover}
                    children={
                        <TouchableOpacity
                            onPress={() => alert('')}
                            children={
                                <FontAwesome5
                                    name='play'
                                    size={34}
                                    color='#fff'
                                />
                            }
                        />
                    }
                />
                <TouchableOpacity onPress={onOpen} style={{ width: '100%' }} >
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={styles.title}>Title Song</Text>
                        <Text style={styles.artist}>Artist</Text>
                        <Text style={styles.artist}>Album</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Portal
                children={
                    <Modalize
                        ref={modalizeRef}
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