import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';

export default function SliderComp({ track, currentTrack }) {

    const { position } = useProgress()

    const handleChange = (val) => {
        TrackPlayer.seekTo(val);
    };
    
    const handleValueChange = val => {
        TrackPlayer.seekTo(val)
    }

    const renderPosition = () => {
        if(currentTrack === track.id) {
            return position
        } else {
            return 0
        }
    }

  return (
    <View style={styles.container}>
      <Slider
        style={{width: 237, height: 3}}
        minimumValue={0}
        value={renderPosition()}
        maximumValue={track.duration}
        minimumTrackTintColor="#317BD7"
        maximumTrackTintColor='#E1DFDD'
        onSlidingComplete={handleChange}
        onValueChange={handleValueChange}
        tapToSeek
        trackStyle={styles.trackSlider}
        // disabled={playing}
        thumbTintColor="rgba(225, 223, 221, 0)"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 70,
  },
  timers: {
    color: '#fff',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackSlider: {
      color: '#E1DFDD'
  }
});