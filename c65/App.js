import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb.js';
import PhonicSoundButton from './phonicsoundbuton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
      chunks: [],
      phonic: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Pronounciaion Assistant',
            style: { fontWeight: 'bold', fontSize: 15, color: '#FAD02C' },
          }}
          containerStyle={{ backgroundColor: '#071330' }}
        />
        <Image
          source={{
            uri: 'https://www.seekpng.com/png/full/284-2849259_cartoon-baby-children-kids-people-children-cartoon-characters.png',
          }}
          style={{
            width: '80%',
            alignSelf: 'center',
            height: 100,
            marginTop: 20,
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={'Type the word here'}
          onChangeText={(input) => {
            this.setState({ text: input });
          }}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim()
            
            db[word]? (this.setState({ chunks: db[word].chunks }),
            this.setState({ phonic: db[word].phones })) : alert("Sorry, the word does not exist in our database")
          }}>
          <Text style={styles.text}>Click Here</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordchunk={this.state.chunks[index]}
                soundChunk={this.state.phonic[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#E9EAEC', flex: 1 },
  input: {
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
    width: 200,
    height: 40,
    borderWidth: 2,
  },
  touchable: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    width: 100,
    height: 40,
  },
  text: { alignSelf: 'center', fontWeight: 'bold' },
  displayText: { fontWeight: 'bold', alignSelf: 'center', color: 'white' },
  chunkButton: {
    backgroundColor: '#071330',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    height: 50,
    marginTop: 20,
  },
});
