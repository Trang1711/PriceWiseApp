import React from 'react';
import {
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

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
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

        {/* Khung quảng cáo*/}
      <View style={styles.adContainer}>
  <Image 
    source={require('../assets/images/adver.png')} 
    style={styles.adImage} 
    resizeMode="contain" 
  />
</View>

        <Text style={styles.sectionTitle}>Danh mục phổ biến</Text>

       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
  {[
    { img: require('../assets/images/category.png'), label: ' Thời trang&Phụ kiện' },
    { img: require('../assets/images/comestic.png'), label: ' Mỹ phẩm & Làm đẹp' },
    { img: require('../assets/images/laptopmaytinhbang.png'), label: ' Laptop và Tablet' },
    { img: require('../assets/images/thietbithethao.png'), label: ' Thiết bị thể thao' },
    { img: require('../assets/images/dodunghoctap.png'), label: ' Đồ dùng học tập' },
  ].map((cat, index) => (
    <TouchableOpacity key={index} style={styles.categoryCard}>
      <View style={styles.categoryContent}>
        <Image source={cat.img} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{cat.label}</Text>
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>

      {/* Khoảng cách giữa các section */}
      <View style={styles.sectionSpacing} />
     <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {[
    { img: require('../assets/images/category3.png'), name: 'Nintendo Switch 2', price: '530.000' },
    { img: require('../assets/images/category4.png'), name: 'The Village (2022)', price: '240.000' },
    { img: require('../assets/images/iphone16prm.png'), name: 'iPhone 16 Pro Max', price: '32.590.000' },
  ].map((product, index) => (
    <TouchableOpacity
      key={index}
      style={styles.productCard}
      onPress={() => {}} // Không có hành động cụ thể, chỉ là để bấm được
    >
      <Image source={product.img} style={styles.categoryImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </TouchableOpacity>
  ))}
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
      {/* <View style={styles.bottomTab}>
        {[ 
          { icon: 'home', label: 'Trang chủ' },
          { icon: 'search', label: 'Khám phá' },
          { icon: 'heart', label: 'Yêu thích' },
          { icon: 'user', label: 'Cá nhân' },
        ].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tab}>
            <FontAwesome name={tab.icon} size={24} color="#000" />
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
});
