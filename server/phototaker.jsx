import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, Image } from "react-native";
import { CameraView, useCameraPermissions, CameraViewRef } from "expo-camera";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
export default function PhotoTaker() {
  const [imageUri, setImageUri] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  //const [camera, setCamera] = useState(null);

  // Use the useCameraPermissions hook to get permission status
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  // Check if permissions are granted
  useEffect(() => {
    if (permission && permission.granted) {
      console.log("one");
      // Camera permissions granted, now request location
      const getLocationPermission = async () => {
        const { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();
        console.log("two");

        if (locationStatus !== "granted") {
          console.log("Location permission denied");
        }
      };
      getLocationPermission();
    }
  }, [permission]);

  //   photo and get geolocation
  const handleCapture = async () => {
    console.log(cameraRef);
    if (cameraRef.current) {
      // Take a picture using the camera
      console.log("three");

      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);

      // Get the geolocation
      const { coords } = await Location.getCurrentPositionAsync({});
      setGeolocation(coords);

      // Save image and geolocation to a file
      await saveDataToFile(photo.uri, coords);
    }
  };

  //  to save image URI and geolocation to a file
  const saveDataToFile = async (imageUri, coords) => {
    const fileUri = FileSystem.documentDirectory + "user_data.json";

    const data = {
      imageUri,
      geolocation: coords,
    };

    //  data to the file
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log("Data saved to", fileUri);
  };

  const onCameraReady = () => {
    console.log("READY");
    // startCapturingFrames();
  };

  const startCapturingFrames = () => {
    const interval = setInterval(async () => {
      const cameraRefValue = cameraRef.current;
      if (cameraRefValue) {
        const photo = await cameraRefValue.current?.takePicture({
          base64: true,
        });
        if (photo) {
          console.log(photo.base64);
        }
      }
    }, 1000); // capture the frame every so often

    return () => clearInterval(interval);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CameraView facing={"front"} ref={cameraRef} />
      <Button title="Capture Image and Location" onPress={handleCapture} />
      {imageUri && (
        <View>
          <Text>Captured Image: </Text>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
      {geolocation && (
        <View>
          <Text>Location:</Text>
          <Text>Latitude: {geolocation.latitude}</Text>
          <Text>Longitude: {geolocation.longitude}</Text>
        </View>
      )}
    </View>
  );
}
