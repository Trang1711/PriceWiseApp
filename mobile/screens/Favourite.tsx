import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yêu thích</Text>
      

      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20 },
 
});
