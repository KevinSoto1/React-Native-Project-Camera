/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';


import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';




class App extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      wea2: null,
      data: null,
      datavideo: null,
      isPhoto: false,
      captureAudio: true,
      isVideo: false
      
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </View>
        {
          this.state.isPhoto ?
            <View style={styles.container}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}

                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}


              />
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> Take Photo </Text>
                </TouchableOpacity>
              </View>
            </View>
            : <View>
              <View>
                <Button
                  onPress={() => {
                    this.setState({
                      isPhoto: true
                    })
                  }}
                  title="Photo"
                />
              </View>
              {this.state.data == null ?
                <View>
                  <View>
                    <Text style={{ color: 'yellow' }}>
                      No Image Taken!
                    </Text>
                  </View>

                </View>
                :
                <View>
                  <View style={{ alignItems: 'center' }}>

                    <Image source={{ uri: this.state.data }} style={{ width: 200, height: 200 }} />
                  </View>
                </View>
              }

            </View>
        }
        {
          this.state.isVideo ?
            <View style={styles.container}>
              
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.openImagePicker.bind(this)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> Take Video </Text>
                </TouchableOpacity>
              </View>
            </View>
            : <View>
              <View>
                <Button
                  onPress={this.openImagePicker.bind(this)}
                  title="Video"
                />
              </View>
              {this.state.datavideo == null ?
                <View>
                  <View>
                    <Text style={{ color: 'yellow' }}>
                      No Video Recorded!
                    </Text>
                  </View>

                </View>
                :
                <View>
                  <View style={{ alignItems: 'center' }}>
                    <Video source={{ uri: this.state.datavideo }}   
                      ref={(ref) => {
                        this.player = ref
                      }}                                      
                      style={{ width: 300, height: 300 }} 
                      controls={true}/>
                      

                  </View>
                </View>
              }

            </View>
        }





      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const wea = await this.camera.takePictureAsync(options);
      this.setState({
        isPhoto: false,
        data: wea.uri
      });
      console.log(wea.uri);
    }
  };

  

  openImagePicker(){
    const options = {
      title:'select an option',
      mediaType:'video',
      storageOptions:{
        skipBackup:true,
        path:'images'
      }
    }
    ImagePicker.showImagePicker(options,(response) => {
      if(response.didCancel){
        console.log('user cancelled');
      }else if (response.error) {
        console.log('ERROR'+response.error);
  
      }else if (response.customButton) {
        console.log('user tapped'+response.customButton);
      }else {
        this.setState({
          datavideo: response.uri,
          isVideo: false
          
        })
      }
  
  
    })
  
    }

  


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
