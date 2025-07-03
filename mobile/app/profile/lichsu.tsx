import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavigationBar from '@/components/NavigationBar';

const screenWidth = Dimensions.get('window').width;

const productData = [
  {
    id: 1,
    image: require('../../assets/images/IP15.jpg'),
    price: '32.990.000 đ',
    store: 'tiki',
    status: 'Chưa đánh giá',
  },
  {
    id: 2,
    image: require('../../assets/images/IP15.jpg'),
    price: '32.990.000 đ',
    store: 'lazada',
    status: 'Chưa đánh giá',
  },
  {
    id: 3,
    image: require('../../assets/images/IP15.jpg'),
    price: '32.990.000 đ',
    store: 'tiki',
    status: 'Chưa đánh giá',
  },
  {
    id: 4,
    image: require('../../assets/images/IP15.jpg'),
    price: '32.990.000 đ',
    store: 'lazada',
    status: 'Chưa đánh giá',
  },
];

export default function LichSuDaXemScreen() {
  const router = useRouter();

  const handleTabPress = (label: string) => {
    router.push(`/${label}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử đã xem</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {productData.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.store}>Ming Store</Text>
              <Text style={styles.status}>{item.status}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Tới nơi bán</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom tab bar */}
      <NavigationBar />
    </View>
  );
}

const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  scrollContent: { paddingBottom: 100 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  store: {
    color: '#555',
    fontSize: 14,
  },
  status: {
    color: 'green',
    fontSize: 13,
    marginVertical: 4,
  },
  button: {
    marginTop: 6,
    backgroundColor: '#d2691e',
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
     borderRadius: 30,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#D17842',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});
