import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoTaker from "../../components/phototaker"; // Import the PhotoTaker component
import makeCall from "../../bland"

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topBar}>
        <Text style={styles.title}>SpotiCry</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Music</Text></TouchableOpacity>
        <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Podcasts</Text></TouchableOpacity>
      </View>

      {/* Dummy Buttons */}
      <View style={styles.dummyButtonsContainer}>
        <TouchableOpacity style={styles.dummyButton}><Text style={styles.dummyText}>Dhruv</Text></TouchableOpacity>
        <TouchableOpacity style={styles.dummyButton}><Text style={styles.dummyText}>The Feels</Text></TouchableOpacity>
        <TouchableOpacity style={styles.dummyButton}><Text style={styles.dummyText}>Mismatched</Text></TouchableOpacity>
        <TouchableOpacity style={styles.dummyButton}><Text style={styles.dummyText}>Feel Good Morning</Text></TouchableOpacity>
      </View>

      {/* Your Top Mixes */}
      <Text style={styles.sectionTitle}>Your top mixes</Text>
      <View style={styles.mixesContainer}>
      <TouchableOpacity style={styles.mix} onPress={makeCall}>
            <Text style={styles.mixText}>Call</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.mix}><Text style={styles.mixText}>Emergency</Text></TouchableOpacity>
      </View>

      {/* Large Emergency Button - PhotoTaker */}
      <View style={styles.photoTakerContainer}>
        <PhotoTaker />
        <Text style={styles.photoTakerLabel}>Take Emergency Photo</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={30} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="search" size={30} color="#fff" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bookmark" size={30} color="#fff" />
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topBar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  category: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#444',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  dummyButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dummyButton: {
    width: '48%',
    backgroundColor: '#333',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  dummyText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mixesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mix: {
    width: '48%',
    backgroundColor: '#1DB954',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  mixText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoTakerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoTakerLabel: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
});

