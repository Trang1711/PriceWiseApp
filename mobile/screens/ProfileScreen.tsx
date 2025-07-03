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
          <Text style={styles.headerTitle}> Hồ sơ</Text>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </View>

        {/* Thông tin người dùng */}
        <TouchableOpacity style={styles.profileSection}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Sam</Text>
           
          </View>
          <FontAwesome name="angle-right" size={24} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <Text style={styles.settingsTitle}> Cài đặt tài khoản</Text>

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

        <View style={{ height: 100 }} /> {/* Khoảng trống cho thanh tab */}
      </ScrollView>

      {/* Thanh điều hướng dưới */}
      <View style={styles.bottomTabContainer}>
        <View style={styles.bottomTab}>
          {[
            { icon: 'home', label: 'trangchu', text: 'Trang chủ' },
            { icon: 'search', label: 'explore', text: 'Khám phá' },
            { icon: 'heart', label: 'favorite', text: 'Yêu thích' },
            { icon: 'user', label: 'profile', text: 'Cá nhân' },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handleTabPress(tab.label)}
            >
              <FontAwesome name={tab.icon} size={26} color="#000" />
              <Text style={styles.tabText}>{tab.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  subtitle: {
    fontSize: 15,
    color: '#666',
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
  bottomTabContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D17842',
    paddingVertical: 14,
    borderRadius: 20,
    width: width * 0.9,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
});
