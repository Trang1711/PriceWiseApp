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
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

interface ProductItem {
  logo_url?: string;
  product_platform_id: number;
  product_id: number;
  name: string;
  image_url: string;
  price: number;
  platform: string;
}

export default function Explore() {
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string, label: string } | null>(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: '1', label: ' Thời trang & phụ kiện' },
    { id: '2', label: ' Mỹ phẩm & làm đẹp' },
    { id: '3', label: ' Điện thoại di động' },
    { id: '4', label: ' Laptop & máy tính bảng' },
    { id: '5', label: ' Thiết bị thể thao' },
    { id: '6', label: ' Đồ dùng học tập' },
  ];

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    setLoading(true);

    setSelectedCategory({
      id: String(categoryId),
      label: categoryName || '',
    });

    fetch(`http://192.168.1.138:8000/products/by-category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, categoryName]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Danh mục: {categoryName}</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />
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
            Danh mục: {selectedCategory ? selectedCategory.label : 'Chọn'}
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
            <Text style={styles.modalTitle}>Chọn danh mục</Text>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryOption,
                  selectedCategory?.id === cat.id && styles.selectedCategory,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setShowCategoryFilter(false);

                  router.push({
                    pathname: "/drawer/explore",
                    params: {
                      categoryId: cat.id,
                      categoryName: cat.label,
                    },
                  });
                }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory?.id === cat.id && styles.selectedText,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}

            <Button title="Đóng" onPress={() => setShowCategoryFilter(false)} />
          </View>
        </View>
      </Modal>
        
      <ScrollView>
        <View style={styles.productRow}>
          {Array.isArray(products) &&
            products
              .filter((p) => p.price >= minPrice && p.price <= maxPrice)
              .map((p) => (
                <View key={`product-${p.product_platform_id}`} style={styles.card}>
                  <Image source={{ uri: p.logo_url }} style={styles.logo} />
                  <Image source={{ uri: p.image_url }} style={styles.productImage} />
                  <Text style={styles.price}>{p.price?.toLocaleString()} đ</Text>
                  <Text style={styles.seller}>{p.name}</Text>
                  <TouchableOpacity
                    style={styles.buyButton}
                     onPress={() =>
                      router.push({
                        pathname: '/compare',
                        params: {
                          productId: p.product_id.toString(),
                        },
                      })
                    }
                  >
                    <Text style={styles.buyButtonText}>So sánh</Text>
                  </TouchableOpacity>
                </View>
              ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '47%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
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
  logo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
