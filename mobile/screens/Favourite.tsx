import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { router } from 'expo-router';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FavoriteProduct {
  name: ReactNode;
  product: any;
  favorite_id: number;
  user_id: number;
  product_id: number;
  added_at: string;
  image_url: string;
  price: string;
  platforms: any;
  discount: string;
}

const { width } = Dimensions.get('window');

export default function YeuThichScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTabPress = (label: string) => {
    navigation.navigate(label as never);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        console.log('User ID:', userId);
        fetch(`${BASE_URL}/favorites/user/${userId}`)
          .then(res => {
            if (!res.ok) {
              console.error('API error:', res.status);
              return [];
            }
            return res.json();
          })
          .then(data => {
            console.log('Favorites from API:', data);
            setFavorites(data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Fetch failed:', err);
            setLoading(false);
          });
      }
    };

    fetchUserId();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

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

    <SafeAreaView style={[styles.container, favorites.length > 0 && styles.whiteBackground]}>
      {favorites.length === 0 && (
        <Image
          source={require('../assets/images/background.jpg')}
          style={styles.backgroundImage}
        />
      )}

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
         <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.fullWidthCenter}>
              <Text style={styles.resultTitle}>Danh sách sản phẩm yêu thích</Text>
            </View>
            <View style={styles.rowWrap}>
              {favorites.map(item => {
                const firstPlatform = item.product.platforms[0];
                const total = firstPlatform.price + (firstPlatform.shipping_fee || 0);
                const discountPercent = firstPlatform.discount_percentage;

                return (
                  <View key={item.favorite_id} style={styles.card}>
                    <View>
                      <Image source={{ uri: item.product.image_url }} style={styles.image} />
                      {/* Logo platform ở góc trên trái ảnh */}
                      <Image source={{ uri: firstPlatform.platform.logo_url }} style={styles.platformLogo} />
                    </View>

                    <Text style={styles.cardTitle}>{item.product.name}</Text>

                    <Text style={styles.discount}>
                      {firstPlatform.price.toLocaleString()}₫ - {discountPercent}%
                    </Text>

                    <Text style={styles.originalPrice}>
                      {firstPlatform.discount.toLocaleString()}₫
                    </Text>


                    <Text style={styles.cardSubtitle}>
                      Phí ship: {firstPlatform.shipping_fee?.toLocaleString() || 0}₫
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      Tổng: {total.toLocaleString()}₫
                    </Text>

                    <Text style={styles.status}>
                      Trạng thái: <Text style={styles.statusValue}>Còn hàng</Text>
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      ⭐ {firstPlatform.rating} ({firstPlatform.review_count} đánh giá)
                    </Text>

                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => router.push(firstPlatform.product_url)}
                    >
                      <FontAwesome name="shopping-cart" size={16} color="#fff" />
                      <Text style={styles.buyButtonText}>Tới nơi bán</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
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
  whiteBackground: {
    backgroundColor: '#fff',
  },

  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 80,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    width: (width - 30) / 2, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 16,

    // Shadow
    shadowColor: '#000',
    marginHorizontal: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    
  },
  logo1: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 5,
  },
  discount: {
    color: 'red',
    fontWeight: 'bold',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  details: {
    marginVertical: 10,
  },
  rating: {
    color: '#888',
  },
  buyButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cartIcon: {
    marginRight: 5,
  },
  status: {
    marginBottom: 2,
    color: '#000',
  },
  statusValue: {
    fontWeight: 'bold',
    color: 'green',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  platformLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    zIndex: 1,
  },
  fullWidthCenter: {
    width: '100%',
    alignItems: 'center',
  },
});
