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
        {favorites.length === 0 ? (
          <>
            <View style={styles.heartBox}>
              <FontAwesome name="heart" size={40} color="#fff" />
              <Text style={styles.heartText}>Sản phẩm yêu thích</Text>
            </View>
            <Text style={styles.messageText}>
              Hiện tại chưa có sản phẩm, hãy cùng <Text style={{ fontWeight: 'bold' }}>Khám phá</Text> các sản phẩm ~
            </Text>
          </>
        ) : (
          <ScrollView>
            {favorites.map(item => (
              <View key={item.favorite_id} style={styles.card}>
                <Text>Product ID: {item.product_id}</Text>
                <Text>Thêm lúc: {new Date(item.added_at).toLocaleString()}</Text>
              </View>
            ))}
          </ScrollView>
        )}
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
