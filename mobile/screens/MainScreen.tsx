import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import HomeSlider from '../components/HomeSlider';
import { router } from 'expo-router'; 
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }
  
  // Dữ liệu slider
  const sliderData = [
    {
      id: 1,
      image: require('../assets/images/adver.png'),
      title: 'adver pressed',
      link: ''
    },
    {
      id: 2,
      image: require('../assets/images/category.png'),
      title: 'Thời trang và phụ kiện',
      link: ''
    },
    {
      id: 3,
      image: require('../assets/images/comestic.png'),
      title: 'Mỹ phẩm',
      link: ''
    },
  ];

  const handleSliderItemPress = (item: any) => {
    // Xử lý khi người dùng nhấn vào slide
    console.log('Slider item pressed:', item.title);
    // Có thể mở link hoặc navigate đến trang chi tiết
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} style={[styles.container, { marginTop: 20 }]}>
        {/* Thanh tìm kiếm */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <FontAwesome name="bars" size={20} color="#333" />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <FontAwesome name="search" size={20} color="#D17842" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              placeholderTextColor="#aaa"
            />
          </View>

          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Home Slider */}
        <HomeSlider 
          data={sliderData}
          autoPlay={true}
          autoPlayInterval={4000}
          onItemPress={handleSliderItemPress}
        />

        <Text style={styles.sectionTitle}>Danh mục phổ biến</Text>

        {/* Grid Categories */}
        <View style={styles.categoryGrid}>
          {[
            { 
              img: require('../assets/images/category.png'), 
              label: 'Thời trang&Phụ kiện',
              link: ''
            },
            { 
              img: require('../assets/images/comestic.png'), 
              label: 'Mỹ phẩm & Làm đẹp',
              link: ''
            },
            { 
              img: require('../assets/images/laptopmaytinhbang.png'), 
              label: 'Laptop và Tablet',
              link: ''
            },
            { 
              img: require('../assets/images/thietbithethao.png'), 
              label: 'Thiết bị thể thao',
              link: ''
            },
          ].map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryGridItem}
              onPress={() => {
                // Xử lý khi nhấn vào category
                console.log('Category pressed:', cat.label);
              }}
            >
              <View style={styles.categoryGridInner}>
                <View style={styles.categoryGridImage}>
                  <Image source={cat.img} style={styles.categoryGridImageContent} />
                </View>
                <View style={styles.categoryGridTitle}>
                  <Text style={styles.categoryGridTitleText}>{cat.label}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Khoảng cách giữa các section */}
        <View style={styles.sectionSpacing} />
        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            {products.map((item, index) => (
              <ProductCard
                key={index}
                platformLogo={item.platformLogo}
                productImage={item.productImage}
                currentPrice={item.currentPrice}
                originalPrice={item.originalPrice}
                discountPercentage={item.discountPercentage}
                shippingFee={item.shippingFee}
                totalPrice={item.totalPrice}
                isAvailable={item.isAvailable}
                rating={item.rating}
                productUrl={item.productUrl}
              />
            ))}
          </View>
        </ScrollView>

        {/* Khoảng cách giữa các section */}
        <View style={styles.sectionSpacing} />
        <Text style={styles.sectionTitle}>Các danh mục</Text>

        {[ 
          { icon: 'shopping-bag', label: 'Thời trang và phụ kiện' },
          { icon: 'star', label: 'Mỹ phẩm & Làm đẹp' },
          { icon: 'mobile', label: 'Điện thoại di động' },
          { icon: 'laptop', label: 'Laptop và máy tính bảng' },
          { icon: 'soccer-ball-o', label: 'Thiết bị thể thao' },
          { icon: 'pencil', label: 'Đồ dùng học tập' },
        ].map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <View style={styles.categoryContent}>
              <FontAwesome name={cat.icon} size={20} color="#333" style={{ marginRight: 8 }} />
              <Text style={styles.categoryText}>{cat.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Khoảng cách giữa các section */}
      <View style={styles.sectionSpacing} />
      {/* Thanh điều hướng dưới cùng */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
  },
    sectionSpacing: {
    height: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  adBanner: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  adText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    height:100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#FF9966',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 200,
  },
  categoryImage: {
    width: 70,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    textAlign: 'center',
    fontSize:16,
    
  },
  productCard: {
    backgroundColor: '#FF9966',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
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
    productName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  productPrice: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
 adContainer: {
    width: '100%', // Để ảnh chiếm toàn bộ chiều rộng của màn hình
    alignItems: 'center', // Căn giữa ảnh
    marginTop: 1, // Khoảng cách từ trên xuống
    marginBottom: 1, // Khoảng cách từ dưới lên
  },
  adImage: {
    width: '100%', // Kích thước ảnh sẽ là 100% chiều rộng của màn hình
    height: undefined, // Để chiều cao tự động theo tỷ lệ
    aspectRatio: 1.77, // Tỷ lệ khung hình cho ảnh (ví dụ: 16:9)
    marginTop: -10, // Dịch ảnh lên trên
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryGridItem: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryGridInner: {
    width: '100%',
  },
  categoryGridImage: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  categoryGridImageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryGridTitle: {
    padding: 10,
    backgroundColor: '#9E1111',
  },
  categoryGridTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
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
    width: 140,
    height: 160,
    resizeMode: 'contain',
    
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
});