import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function YeuThichScreen() {
  const navigation = useNavigation();

  const handleTabPress = (label: string) => {
    navigation.navigate(label as never);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background.jpg')} // thay đổi theo tên ảnh nền của bạn
        style={styles.backgroundImage}
      />

      <View style={styles.overlay}>
        <View style={styles.heartBox}>
          <FontAwesome name="heart" size={40} color="#fff" />
          <Text style={styles.heartText}>Sản phẩm yêu thích</Text>
        </View>

        <Text style={styles.messageText}>
          Hiện tại chưa có sản phẩm, hãy cùng{' '}
          <Text style={{ fontWeight: 'bold' }}>Khám phá</Text> các sản phẩm ~
        </Text>
      </View>

      {/* Bottom tab bar */}
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
            <FontAwesome name={tab.icon} size={24} color="#000" />
            <Text style={styles.tabText}>{tab.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heartBox: {
    backgroundColor: '#EAAE99',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  heartText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EAAE99',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
  },
});
