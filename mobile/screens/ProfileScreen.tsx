import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavigationBar from '../components/NavigationBar';

export default function ProfileScreen() {
  const router = useRouter();

  const handleTabPress = (label: string) => {
    router.push(`/${label}`);
  };

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
            <Text style={styles.name}>Sam</Text>
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
          <FontAwesome name="history" size={22} color="#333" style={styles.icon} />
          <Text style={styles.itemText}>Lịch sử hoạt động</Text>
          <FontAwesome name="angle-right" size={22} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/profile/yeuthich')}
        >
          <FontAwesome name="heart" size={22} color="#333" style={styles.icon} />
          <Text style={styles.itemText}>Danh sách yêu thích</Text>
          <FontAwesome name="angle-right" size={22} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Khoảng trống để tránh che mất bởi NavigationBar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Thanh điều hướng dưới */}
      <NavigationBar />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: 40,
    height: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 14,
    borderRadius: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
  },
  settingsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#555',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 14,
  },
  itemText: {
    fontSize: 20,
    color: '#333',
  },
});
