import { StyleSheet, Text, View, Platform, Button, Image, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing'
// import Video from 'react-native-video';
import { Camera } from 'expo-camera'

export default function RecordVideo(){
    const cameraRef = useRef()
    const [ videoStatus, setVideoStatus ] = useState(false)
    const [ video, setVideo ] = useState()

    const [ hasCameraPermission, setHasCameraPermission ] = useState()
    const [ hasMediaLebraryPermission, setHasMediaLibraryPermission ] = useState()

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

    
    let recordAndStop = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        if (videoStatus) {
            setVideoStatus(false)
            await cameraRef.current.stopRecording()
        } else {
            setVideoStatus(true)
            let newPhoto = await cameraRef.current.recordAsync(options)
            setVideo(newPhoto)
        }
        console.log(video);
    }

    if (video) {
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
                setVideo(undefined)
            })
        }
      
        let saveVideo = async () => {
            await MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                setVideo(undefined)
            })
            alert('Saqlandi')
        }
      
        const forwardText = `Jo'natish`
        return (
            <SafeAreaView style={styles.container}>
                {/* <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64}}/> */}
                {/* <Video source={video.uri} paused={false} style={styles.preview} repeat={true}/> */}
                <Button title={forwardText} onPress={shareVideo}/>
                {hasMediaLebraryPermission ? <Button title='Saqlash' onPress={saveVideo}/> : undefined}
                <Button title='Bekor qilish' onPress={() => setVideo(undefined)}/>
            </SafeAreaView>
        )
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title={videoStatus ? 'Stop' : 'Start'} onPress={recordAndStop}/>
            </View>
        </Camera>
    )
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