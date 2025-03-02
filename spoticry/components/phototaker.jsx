// PhotoTaker.js
import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import axios from "axios";

// Load the secrets file using require
const secrets = require("../assets/secrets.json");

export default function PhotoTaker() {
  const [imageUri, setImageUri] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  // Use the useCameraPermissions hook to get permission status
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Check if permissions are granted
  useEffect(() => {
    if (permission && permission.granted) {
      // Camera permissions granted, now request location
      const getLocationPermission = async () => {
        const { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== "granted") {
          console.log("Location permission denied");
        }
      };
      getLocationPermission();
    }
  }, [permission]);

  // Function to upload image to Cloudinary using Axios
  const uploadImageToCloudinary = async (photoUri) => {
    const data = new FormData();
    data.append("file", {
      uri: photoUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "your_upload_preset"); // Replace with your preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        data
      );

      if (response.data && response.data.public_id) {
        const imageUrl = `https://res.cloudinary.com/your_cloud_name/image/upload/c_scale,w_500/${response.data.public_id}.jpg`; // Apply any transformations if needed
        return imageUrl;
      }
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Function to send the data to Twilio
  const sendToTwilio = async (imageUri, latitude, longitude) => {
    try {
      const { auth_token, account_sid, url } = secrets; // Use secrets from the json file

      const data = new URLSearchParams({
        To: "+18777804236", // Your recipient phone number
        From: "+18779089736", // Your Twilio phone number
        Body: `Photo Captured! \nLatitude: ${latitude}\nLongitude: ${longitude}\nImage: ${imageUri}`,
      });

      const response = await axios.post(url, data, {
        auth: {
          username: account_sid,
          password: auth_token,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("Twilio response:", response.status);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending to Twilio:", error);
    }
  };

  // Save the image and location data to MongoDB
  const saveToMongoDB = async (imageUrl, latitude, longitude) => {
    const {
      MONGO_API_KEY,
      MONGO_DATA_SOURCE,
      MONGO_CLUSTER_NAME,
      MONGO_DB_NAME,
      MONGO_COLLECTION_NAME,
    } = secrets; // Use secrets

    const payload = {
      dataSource: MONGO_DATA_SOURCE,
      database: MONGO_DB_NAME,
      collection: MONGO_COLLECTION_NAME,
      document: {
        imageUrl: imageUrl,
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date(),
      },
    };

    try {
      const response = await axios.post(
        `https://data.mongodb-api.com/app/${MONGO_CLUSTER_NAME}/endpoint/data/v1/action/insertOne`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": MONGO_API_KEY,
          },
        }
      );
      console.log("Saved to MongoDB:", response.data);
    } catch (error) {
      console.error("Error saving to MongoDB:", error);
    }
  };

  // Photo and geolocation capture
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);

      const { coords } = await Location.getCurrentPositionAsync({});
      setGeolocation(coords);

      // Upload image to Cloudinary and get URL
      const uploadedImageUrl = await uploadImageToCloudinary(photo.uri);

      if (!uploadedImageUrl) {
        console.error("Failed to upload image");
        return;
      }

      // Save to MongoDB
      await saveToMongoDB(uploadedImageUrl, coords.latitude, coords.longitude);

      // Send to Twilio
      await sendToTwilio(uploadedImageUrl, coords.latitude, coords.longitude);
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
