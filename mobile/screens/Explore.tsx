import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import CompareProductScreen from '../screens/CompareProductScreen'; 
import { router } from 'expo-router'; 
import NavigationBar from '@/components/NavigationBar';

export default function Explore() {
  const navigation = useNavigation();
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'fashion', label: ' Thời trang & phụ kiện' },
    { id: 'beauty', label: ' Mỹ phẩm & làm đẹp' },
    { id: 'mobile', label: ' Điện thoại di động' },
    { id: 'laptop', label: ' Laptop & máy tính bảng' },
    { id: 'sport', label: ' Thiết bị thể thao' },
    { id: 'stationery', label: ' Đồ dùng học tập' },
  ];

  const handleTabPress = (label) => {
    navigation.navigate(label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Finding page</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="iPhone 15 Pro Max" style={styles.searchInput} />
        <TouchableOpacity>
          <Text style={styles.cancelText}>Huỷ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBox} onPress={() => setShowPriceFilter(true)}>
          <FontAwesome name="filter" size={16} color="#333" />
          <Text style={styles.filterText}>
            Giá từ {minPrice.toLocaleString()}đ đến {maxPrice.toLocaleString()}đ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBox} onPress={() => setShowCategoryFilter(true)}>
          <FontAwesome name="tags" size={16} color="#333" />
          <Text style={styles.filterText}>
            Danh mục: {selectedCategory ? selectedCategory : 'Chọn'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showPriceFilter} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn khoảng giá</Text>
            <Text>Giá từ: {minPrice.toLocaleString()} đ</Text>
            <Slider
              minimumValue={0}
              maximumValue={50000000}
              step={1000000}
              value={minPrice}
              onValueChange={setMinPrice}
            />
            <Text>Đến: {maxPrice.toLocaleString()} đ</Text>
            <Slider
              minimumValue={0}
              maximumValue={50000000}
              step={1000000}
              value={maxPrice}
              onValueChange={setMaxPrice}
            />
            <Button title="Áp dụng" onPress={() => setShowPriceFilter(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={showCategoryFilter} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> Chọn danh mục</Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryOption, selectedCategory === cat.label && styles.selectedCategory]}
                onPress={() => {
                  setSelectedCategory(cat.label);
                  setShowCategoryFilter(false);
                }}>
                <Text
                  style={[styles.categoryText, selectedCategory === cat.label && styles.selectedText]}> 
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
            <Button title="Đóng" onPress={() => setShowCategoryFilter(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        <Text style={styles.resultsText}>4 kết quả cho "iPhone 15 Pro Max"</Text>
        <View style={styles.productRow}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Image source={require('../assets/images/IP15.jpg')} style={styles.productImage} />
              <Text style={styles.price}>32.990.000 đ</Text>
              <Text style={styles.seller}>Ming Store</Text>
              <Text style={styles.ship}>Miễn phí vận chuyển</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                console.log('Pressed So sánh');
                router.push('/compare');
              }}
            >
              <Text style={styles.buyButtonText}>So sánh</Text>
            </TouchableOpacity>
        </View>
        ))}
        </View>
      </ScrollView>

      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
    marginBottom:15,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  cancelText: {
    marginLeft: 10,
    color: '#007AFF',
    fontWeight: '600'
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  filterText: {
    marginLeft: 5,
    fontSize: 12,
  },
  resultsText: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600'
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  card: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  price: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  seller: {
    fontSize: 12,
    color: '#333',
  },
  ship: {
    fontSize: 10,
    color: 'green',
    marginBottom: 4,
  },
  buyButton: {
    backgroundColor: '#D17842',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategory: {
    backgroundColor: '#D17842',
    borderColor: '#D17842',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
