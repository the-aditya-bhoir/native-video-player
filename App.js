import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import playImg from './Assets/play-button.png'
import pauseImg from './Assets/pause-button.png'
import forwardImg from './Assets/forward.png'
import rewindImg from './Assets/rewind.png'
import refreshImg from './Assets/refresh.png'

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [paused, setPaused] = useState(true);
  const [controls, setControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [ended, setEnded] = useState(false);

  const handleTouch = () => {
    setControls(true);
    setTimeout(() => setControls(false), 5000)
  }

  const handleplayPause = () => {
    setPaused(!paused);
    if (paused) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Praveen's Story</Text>
      <View>

        <TouchableOpacity onPress={handleTouch} style={styles.videoContainer}>
          <Video
            paused={paused}
            source={{ uri: "https://pharmallama-prescription.s3.ap-south-1.amazonaws.com/Pharmallama_Customer_Success_Story_film.mp4" }}
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
        </TouchableOpacity>

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
                <TouchableOpacity onPress={(handleplayPause)}>
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

      </View>
    </View>
  )
}
var styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop:10,
    paddingBottom:10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
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
    position: 'absolute'
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