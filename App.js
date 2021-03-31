import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import Player from './src/components/Player'

const tracks = [
  {
    id: '0',
    url: require('./src/assets/tracks/HOME-Resonance.mp3'),
    title: 'Resonance',
    artist: 'HOME',
    duration: 213
  },
  {
    id: '1',
    url: require('./src/assets/tracks/憂鬱-Slow.mp3'),
    title: 'Slow',
    artist: '憂鬱',
    duration: 333
  },
  {
    id: '2',
    url: require('./src/assets/tracks/憂鬱-Sun.mp3'),
    title: 'Sun',
    artist: '憂鬱',
    duration: 322
  }
]

const App = () => {

//   const setUpTrackPlayer = async () => {
//     try {
//         await TrackPlayer.setupPlayer();
//         await TrackPlayer.add(tracks);
//     } catch (e) {
//         console.log(e);
//     }
// }

// useEffect(() => {
//     setUpTrackPlayer();

//     return () => TrackPlayer.destroy();
// }, [])

  return (
    <View style={styles.container}>
    <SafeAreaView >
      {tracks.map((track, index) => <View key={index}><Player track={track} index={index} /></View>)}
    </SafeAreaView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F1',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  }
})