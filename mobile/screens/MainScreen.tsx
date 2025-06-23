import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuButton}>
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
  {/* Khung quảng cáo màu cam */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>🔥 Mua 1 tặng 1 - Hôm nay duy nhất!</Text>
        </View>
      <Text style={styles.sectionTitle}>Danh mục phổ biến</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryCard}>
          <Image source={require('../assets/images/category.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Thời trang & Phụ kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Image source={require('../assets/images/category2.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Mỹ phẩm & Làm đẹp</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.productCard}>
              <Image source={require('../assets/images/category3.png')} style={styles.categoryImage} />
          <Text>Nintendo Switch 2</Text>
          <Text>$530,67</Text>
        </View>

        <View style={styles.productCard}>
           <Image source={require('../assets/images/category4.png')} style={styles.categoryImage} />
          <Text>The Village (2022)</Text>
          <Text>$240</Text>
        </View>
      </ScrollView>

      <Text style={styles.sectionTitle}>Các danh mục</Text>
      <TouchableOpacity style={styles.categoryCard}>
        <Text style={styles.categoryText}>Thiết bị điện tử</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryCard}>
        <Text style={styles.categoryText}>Laptop và máy tính bảng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryCard}>
        <Text style={styles.categoryText}>Đồ dùng học tập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
   adText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
    adBanner: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
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
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 150,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: {
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#f0f0f0',
    padding: 1,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
  },
  seeMoreButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#D17842',
    borderRadius: 10,
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
