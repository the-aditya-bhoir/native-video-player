import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import VideoComponent from './src/VideoComponent';

export default function App() {

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }

  return (
    <View>
      <ScrollView style={styles.container} onScroll={handleScroll}>

        <View style={styles.emptyContainer} />

        <VideoComponent scrollY={scrollY} />

        <View style={styles.emptyContainer} />

      </ScrollView>
    </View>
  )
}
var styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
  },
  emptyContainer: {
    textAlign: 'center',
    fontSize: 15,
    height: 800
  }
});