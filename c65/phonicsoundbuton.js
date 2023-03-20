import * as React from 'react';
import { Audio } from 'expo-av';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default class PhonicSoundButton extends React.Component {
  constructor() {
    super();
    this.state = {
      pressButtonIndex: '',
    };
  }
  playAudio = async (soundChunk) => {
    var soundLink =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync({ uri: soundLink }, { shouldPlay: true });
  };
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.buttonIndex === this.state.pressButtonIndex
            ? [Style.chunkButton, { backgroundColor: 'red' }]
            : Style.chunkButton
        }
        onPress={() => {
          this.setState({ pressButtonIndex: this.props.buttonIndex });
          this.playAudio(this.props.soundChunk);
        }}>
        <Text style={Style.displayText}>{this.props.wordchunk}</Text>
      </TouchableOpacity>
    );
  }
}

const Style = StyleSheet.create({
  displayText: { textAlign: 'center', fontSize: 30, color: 'white' },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: '#071330',
  },
});
