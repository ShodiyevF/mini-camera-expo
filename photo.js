import { StyleSheet, Text, View, Platform, Button, Image, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing'
import { Camera } from 'expo-camera'


export default function TakePhoto() {
  let cameraRef = useRef()

  const [ hasCameraPermission, setHasCameraPermission ] = useState()
  const [ hasMediaLebraryPermission, setHasMediaLibraryPermission ] = useState()
  const [ photo, setPhoto ] = useState()

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()
  }, [])
  
  if (hasCameraPermission === undefined) {
    return <Text>Permission jonatilmoqda</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission camera uchun sozlamagan</Text>
  }

  let rasmgaol = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    }

    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  }

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }

    let savePhoto = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
      alert('Saqlandi')
    }

    const forwardText = `Jo'natish`
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64}}/>
        <Button title={forwardText} onPress={sharePic}/>
        {hasMediaLebraryPermission ? <Button title='Saqlash' onPress={savePhoto}/> : undefined}
        <Button title='Bekor qilish' onPress={() => setPhoto(undefined)}/>
      </SafeAreaView>
    )
  }
  
  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title='Rasmga olish' onPress={rasmgaol}/>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#fff',
  },
  preview: {
    width: 350,
    height: 350,
    marginBottom: 100
  }
});
