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
  Button
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

export default function Explore() {
  const navigation = useNavigation();
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);

  const handleTabPress = (label) => {
    navigation.navigate(label);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.pageTitle}>Finding page</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="iPhone 15 Pro Max"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Text style={styles.cancelText}>Huỷ</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBox} onPress={() => setShowPriceFilter(true)}>
          <FontAwesome name="filter" size={16} color="#333" />
          <Text style={styles.filterText}> Giá từ {minPrice.toLocaleString()}đ đến {maxPrice.toLocaleString()}đ</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Filter */}
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
              onValueChange={value => setMinPrice(value)}
            />
            <Text>Đến: {maxPrice.toLocaleString()} đ</Text>
            <Slider
              minimumValue={0}
              maximumValue={50000000}
              step={1000000}
              value={maxPrice}
              onValueChange={value => setMaxPrice(value)}
            />
            <Button title="Áp dụng" onPress={() => setShowPriceFilter(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {/* Results Summary */}
        <Text style={styles.resultsText}>4 kết quả cho "iPhone 15 Pro Max"</Text>

        {/* Product Row */}
        <View style={styles.productRow}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Image
                source={require('../assets/images/IP15.jpg')}
                style={styles.productImage}
              />
              <Text style={styles.price}>32.990.000 đ</Text>
              <Text style={styles.seller}>Ming Store</Text>
              <Text style={styles.ship}>Miễn phí vận chuyển</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Tới nơi bán</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTab}>
        {[ 
          { icon: 'home', label: 'trangchu', text: 'Trang chủ' },
          { icon: 'search', label: 'explore', text: 'Khám phá' },
          { icon: 'heart', label: 'favorite', text: 'Yêu thích' },
          { icon: 'user', label: 'profile', text: 'Cá nhân' },
        ].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tab} onPress={() => handleTabPress(tab.label)}>
            <FontAwesome name={tab.icon} size={28} color="#000" />
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
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
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
    marginBottom: 10,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 10,
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
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D17842',
    paddingVertical: 12,
    borderTopColor: '#ddd',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
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
  }
});
