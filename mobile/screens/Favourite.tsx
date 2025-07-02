import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yêu thích</Text>
      <View style={styles.bottomTab}>
        {[ 
          { icon: 'home', label: 'Trang chủ', route: '/home' },
          { icon: 'search', label: 'Khám phá', route: '/explore' },
          { icon: 'heart', label: 'Yêu thích', route: '/favorite' },
          { icon: 'user', label: 'Cá nhân', route: '/profile' },
        ].map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => router.push(tab.route)} 
        >
          <FontAwesome name={tab.icon} size={24} color="#000" />
          <Text style={styles.tabText}>{tab.label}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20 },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D17842',
    paddingVertical: 10,
    position: 'absolute',
    borderTopColor: '#ddd',
    borderRadius: 40,
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#000',
  },
});
