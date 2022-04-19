import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect } from 'react'
import { music } from '../../dumData';
import { FontAwesome } from '@expo/vector-icons';


export default function SearchScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                music.map((track, key = 0) => {
                    return (
                        <View key={key++} style={styles.item} >
                            <TouchableOpacity onPress={() => alert('')}>
                                <FontAwesome name="play" size={40} color='black' />
                            </TouchableOpacity>
                            <Text>{track.title}</Text>
                            <Text>{track.artits}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        marginBottom: 7
    }
})