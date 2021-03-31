import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import TrackPlayer, { useProgress } from 'react-native-track-player';

import Slider from './Slider'

TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
})

export default function Player({ track, index }) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState()
    const { position, duration } = useProgress()

    console.log(position, duration);

    const formatTime = (secs) => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);
    
        if (seconds < 10) seconds = `0${seconds}`;
    
        return `${minutes}:${seconds}`;
      };

    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add([track]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setUpTrackPlayer();
        return () => TrackPlayer.destroy();
    }, [])

    async function checkPlayingTrack() {
        await TrackPlayer.getCurrentTrack()
            .then(result => setCurrentTrack(result))
        await TrackPlayer.getState()
            .then(result => {
                result === 'playing' ? setIsPlaying(true) : setIsPlaying(false)
            })
        }
    
    checkPlayingTrack()
    
    // const refreshPlayer = async () => {
    //     await Promise.all([ TrackPlayer.getState(), TrackPlayer.getCurrentTrack() ]).then(console.log())
        
    //     }

    return (
        <View style={styles.container}>
            <Text style={styles.lightText}>Meeting Category</Text>
            <Text style={styles.headerTxt}>{track.title}</Text>
            <Text style={styles.detailsText} >5th March 10:30 AM . 20 Guests</Text>

            <View style={styles.player}>
                {isPlaying && (currentTrack == track.id) ?
                    <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                        <Feather name="pause" size={16} color='black' />
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ async () => {
                        await Promise.all([TrackPlayer.play(), TrackPlayer.skip(`${track.id}`)]) 
                        }
                    }>
                    <Feather name="play" size={16} color='black' />
                </TouchableOpacity>
                }
                <Slider track={track} currentTrack={currentTrack} />
                <Text>- {formatTime(track.duration)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 16,
        marginVertical: 10
    },
    lightText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.52,
        color: '#3E4956',
        paddingBottom: 5
    
    },
    headerTxt: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        paddingBottom: 8
    },
    detailsText: {
        fontSize: 12,
        color: '#B0A9A1',
        fontWeight: '400',
        lineHeight: 14.52
    },
    player: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'red'
    }
})
