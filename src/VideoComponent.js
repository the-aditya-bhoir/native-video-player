import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import { video } from './Constants/uri'
import playImg from './Assets/play-button.png'
import pauseImg from './Assets/pause-button.png'
import forwardImg from './Assets/forward.png'
import rewindImg from './Assets/rewind.png'
import refreshImg from './Assets/refresh.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let videoFrame = {
  y1: 0,
  y2: 0,
}

export default function VideoComponent({ scrollY }) {
  const [tempPaused, setTempPaused] = useState(true);
  const [paused, setPaused] = useState(false);
  const [controls, setControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if ((scrollY + windowHeight) > videoFrame.y2 && scrollY < videoFrame.y1) {
      setTempPaused(false);
    }
    else {
      setTempPaused(true);
    }
  }, [scrollY])

  const handlePlayPause = () => {
    setPaused(!paused);
    if(paused){
      setControls(false);
    }
  }

  const handleRewind = () => {
    player.seek((currentTime - 10));
  }

  const handleForward = () => {
    player.seek((currentTime + 10));
  }

  const handleRefresh = () => {
    player.seek(0);
    setControls(false);
    setEnded(false);
  }

  const handleVideoFrame = (e) => {
    videoFrame.y1 = e.nativeEvent.layout.y;
    videoFrame.y2 = e.nativeEvent.layout.y + e.nativeEvent.layout.height;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onLayout={handleVideoFrame}
      onPress={() => setControls(!controls)}
    >

      <View style={styles.videoContainer}>
        <Video
          paused={(paused || tempPaused)}
          source={{ uri: video }}
          style={styles.backgroundVideo}
          resizeMode="stretch"
          ref={(ref) => {
            player = ref;
          }}
          currentTime={currentTime}
          onProgress={(e) => setCurrentTime(e.currentTime)}
          onSeek={(e) => setCurrentTime(e.currentTime)}
          onEnd={() => { setControls(true); setEnded(true) }}
        />
      </View>

      <View style={styles.controlsContainer}>
        {
          ended ?
            <TouchableOpacity
              onPress={handleRefresh}
              style={styles.refreshContainer}>
              <Image source={refreshImg} style={styles.refreshButton} />
            </TouchableOpacity>
            :
            <View style={controls ? styles.controls : styles.hideControls}>
              <TouchableOpacity onPress={handleRewind}>
                <Image
                  source={rewindImg}
                  style={styles.rewindButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause}>
                <Image
                  source={paused ? playImg : pauseImg}
                  style={styles.playPauseButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForward}>
                <Image
                  source={forwardImg}
                  style={styles.rewindButton}
                />
              </TouchableOpacity>
            </View>
        }
      </View>

    </TouchableOpacity>
  )
}
var styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    height: 800
  },
  videoContainer: {
    width: windowWidth,
    height: 220,
    position: 'relative',
    margin: 10
  },
  backgroundVideo: {
    width: windowWidth - 20,
    height: 220
  },
  controlsContainer: {
    position: 'absolute'
  },
  controls: {
    width: windowWidth - 20,
    height: 220,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.3)'
  },
  hideControls: {
    display: 'none',
  },
  playPauseButton: {
    width: 60,
    height: 60
  },
  rewindButton: {
    width: 35,
    height: 35
  },
  refreshContainer: {
    width: windowWidth - 20,
    height: 220,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  refreshButton: {
    width: 50,
    height: 50
  }
});


/* 
App.js

const [scrollY, setScrollY] = useState(0);
  
const handleScroll = (event) => {
  setScrollY(event.nativeEvent.contentOffset.y)
}

<ScrollView onScroll={handleScroll}>
  <VideoComponent scrollY={scrollY} /> 
</ScrollView>
*/