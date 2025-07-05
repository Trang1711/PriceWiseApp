import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavigationBar from '../components/NavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants';

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState<{ fullName: string } | null>(null);
  const router = useRouter();

  // const handleTabPress = (label: string) => {
  //   router.push(`/${label}`);
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) return;

        const response = await fetch(`${BASE_URL}/api/user/${userId}`);
        const data = await response.json();

        setUserInfo({
          fullName: data.full_name || 'Người dùng',
        });
      } catch (error) {
        console.error('Lỗi khi tải user info:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </View>

        {/* Thông tin người dùng */}
        <TouchableOpacity style={styles.profileSection}>
          <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
          <View>
           <Text style={styles.name}>{userInfo?.fullName || 'Đang tải...'}</Text>
          </View>
          <FontAwesome name="angle-right" size={24} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <Text style={styles.settingsTitle}>Cài đặt tài khoản</Text>

        {/* Các mục cài đặt */}
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/profile/thongtincanhan')}
        >
          <FontAwesome name="user" size={22} color="#333" style={styles.icon} />
          <Text style={styles.itemText}>Thông tin cá nhân</Text>
          <FontAwesome name="angle-right" size={22} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/profile/lichsu')}
      >
        <FontAwesome name="history" size={20} color="#333" style={styles.icon} />
        <Text style={styles.itemText}>Lịch sử</Text>
        <FontAwesome name="angle-right" size={20} color="gray" style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/profile/yeuthich')}
      >
        <FontAwesome name="heart" size={20} color="#333" style={styles.icon} />
        <Text style={styles.itemText}>Yêu thích</Text>
        <FontAwesome name="angle-right" size={20} color="gray" style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>

        {/* Khoảng trống để tránh che mất bởi NavigationBar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  logo: { width: 40, height: 40 },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#666' },
  settingsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  icon: { marginRight: 10 },
  itemText: { fontSize: 14, color: '#333' },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

});
