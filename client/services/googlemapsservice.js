//sends last location of the user to the server/emergency contact

// HTML Template
// Include this in your web page
// ---------------------------------
// <div id="map" style="height: 400px; width: 100%;"></div>
// <button id="getLocationBtn">Get Current Location</button>
// <p id="locationStatus"></p>

// JavaScript for location tracking
let map;
let marker;
let userLocation = null;

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = config.GOOGLE_MAPS_API_KEY;

// Initialize the map
function initMap() {
  // Default center (you can set this to your business location)
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: defaultCenter,
  });
  
  // Create a marker but don't set its position yet
  marker = new google.maps.Marker({
    map: map,
    title: 'Your Location'
  });
  
  // Set up event listener for the get location button
  document.getElementById('getLocationBtn').addEventListener('click', getUserLocation);
  
  // If we have a saved location in localStorage, display it
  const savedLocation = getSavedLocation();
  if (savedLocation) {
    displayLocation(savedLocation);
    document.getElementById('locationStatus').textContent = 'Showing your last saved location.';
  }
}

// Get the user's current location
function getUserLocation() {
  const statusElement = document.getElementById('locationStatus');
  statusElement.textContent = 'Requesting your location...';
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success handler
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString()
        };
        
        // Save to localStorage and send to server
        saveLocation(userLocation);
        sendLocationToServer(userLocation);
        
        // Display on map
        displayLocation(userLocation);
        statusElement.textContent = 'Location updated successfully!';
      },
      (error) => {
        // Error handler
        console.error('Error getting location:', error);
        statusElement.textContent = `Error: ${getGeolocationErrorMessage(error)}`;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  } else {
    statusElement.textContent = 'Geolocation is not supported by your browser.';
  }
}

// Display a location on the map
function displayLocation(location) {
  const position = { lat: location.lat, lng: location.lng };
  map.setCenter(position);
  marker.setPosition(position);
  marker.setVisible(true);
}

// Save location to localStorage
function saveLocation(location) {
  localStorage.setItem('userLastLocation', JSON.stringify(location));
}

// Get saved location from localStorage
function getSavedLocation() {
  const saved = localStorage.getItem('userLastLocation');
  return saved ? JSON.parse(saved) : null;
}

// Send location to your server
function sendLocationToServer(location) {
  // Replace with your actual server endpoint
  const serverUrl = 'https://your-server.com/api/save-location';
  
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location: location,
      userId: getUserId() // Implement a function to get user ID from your auth system
    }),
  })
  .then(response => response.json())
  .then(data => console.log('Server response:', data))
  .catch(error => console.error('Error sending location to server:', error));
}

// Get user ID function (implement based on your authentication system)
function getUserId() {
  // This should return the current user's ID from your auth system
  // For example, if using Firebase Auth:
  // return firebase.auth().currentUser.uid;
  
  // Placeholder:
  return 'user123';
}

// Get a meaningful error message
function getGeolocationErrorMessage(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      return 'User denied the request for geolocation.';
    case error.POSITION_UNAVAILABLE:
      return 'Location information is unavailable.';
    case error.TIMEOUT:
      return 'The request to get user location timed out.';
    case error.UNKNOWN_ERROR:
      return 'An unknown error occurred.';
    default:
      return 'Error getting location.';
  }
}