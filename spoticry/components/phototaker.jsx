import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, Image } from "react-native";
import { CameraView, useCameraPermissions, CameraViewRef } from "expo-camera";
import * as Location from "expo-location";
import axios from "axios";
const secrets = require("../secrets.json");

export default function PhotoTaker() {
  const [imageUri, setImageUri] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission && permission.granted) {
      console.log("one");
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

  // Handle capture and send data to Twilio
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

      // Send image and geolocation to Twilio
      await sendToTwilio(photo.uri, coords.latitude, coords.longitude);
    }
  };

  // Function to send data to Twilio
  const sendToTwilio = async (imageUri, latitude, longitude) => {
    try {
      const { auth_token, account_sid, url } = secrets; // Use secrets from the json file

      const message = `Hi, this username registered you as an emergency contact. They pressed a panic button and were last seen at longitude: ${longitude}, latitude: ${latitude}.`;

      const data = new URLSearchParams({
        To: "+18777804236", // Your recipient phone number
        From: "+18779089736", // Your Twilio phone number
        //Body: message,
        Body: "HI!",
      });

      // Sending the message to Twilio via Axios
      const response = await axios.post(url, data, {
        auth: {
          username: account_sid,
          password: auth_token,
        },
      });

      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    }
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
