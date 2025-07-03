import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { usePathname, router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

export default function NavigationBar() {
  const pathname = usePathname()

  const tabs = [
    { icon: 'home', label: 'Trang chủ', route: '/home' },
    { icon: 'search', label: 'Khám phá', route: '/explore' },
    { icon: 'heart', label: 'Yêu thích', route: '/favorites' },
    { icon: 'user', label: 'Cá nhân', route: '/profile' },
  ]

  return (
    <BlurView intensity={100} tint="light" style={styles.bottomTab}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
            activeOpacity={0.8}
          >
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <FontAwesome
                name={tab.icon}
                size={28}
                color={isActive ? '#000' : '#888'}
                style={{ fontWeight: isActive ? 'bold' : 'normal' }}
              />
            </View>
            <Text style={[styles.tabText,isActive && styles.tabTextActive,]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    borderTopColor: '#ddd',
    borderRadius: 40,
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
})