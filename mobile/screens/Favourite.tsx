import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants';

interface FavoriteProduct {
  favorite_id: number;
  user_id: number;
  product_id: number;
  added_at: string;
}

const { width } = Dimensions.get('window');

export default function YeuThichScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  const handleTabPress = (label: string) => {
    navigation.navigate(label as never);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        console.log('User ID:', userId);
        fetch(`http://${BASE_URL}/favorites/user/${userId}`)
          .then(res => res.json())
          .then(data => {
            console.log("Favorites from API:", data);
            setFavorites(data);
          });
      }
    };

    fetchUserId();
  }, []);

  return (
    // <View style={styles.container}>
    //   <Image
    //     source={require('../assets/images/background.jpg')}
    //     style={styles.backgroundImage}
    //   />

    //   <View style={styles.overlay}>
    //     <View style={styles.heartBox}>
    //       <FontAwesome name="heart" size={40} color="#fff" />
    //       <Text style={styles.heartText}>Sản phẩm yêu thích</Text>
    //     </View>

    //     <Text style={styles.messageText}>
    //       Hiện tại chưa có sản phẩm, hãy cùng{' '}
    //       <Text style={{ fontWeight: 'bold' }}>Khám phá</Text> các sản phẩm ~
    //     </Text>
    //   </View>
    // </View>

    <View style={styles.container}>
      <Image source={require('../assets/images/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <View style={styles.heartBox}>
          <View style={styles.heartIcon}>
            <Image
              source={require('../assets/images/heart_icon.jpg')}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
          </View>
          <Text style={styles.heartText}>Sản phẩm yêu thích</Text>
        </View>

        <Text style={styles.messageText}>
          Hiện tại chưa có sản phẩm, hãy cùng{' '}
          <Text
            style={{ fontWeight: 'bold', textDecorationLine: 'underline', color: 'black' }}
            onPress={() => router.push('/drawer/explore')}
          >
            Khám phá
          </Text>
          {' '}các sản phẩm 
        </Text>
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
    marginTop: '42%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heartBox: {
    backgroundColor: '#EAAE99',
    padding: 50,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: '22%',
  },
  heartText: {
    marginTop: 10,
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },

  heartIcon: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 10,
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
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 0,
    marginRight:10,
    // Drop shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Drop shadow for Android
    elevation: 6,
  },
});
