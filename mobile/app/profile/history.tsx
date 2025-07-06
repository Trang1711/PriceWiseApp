import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image,
  TouchableOpacity, Dimensions, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from '@/components/NavigationBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants';

type SearchHistoryItem = {
  search_id: number;
  user_id: number;
  query: string;
  search_time: string;
};

export default function LichSuDaXemScreen() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      if (id) setUserId(parseInt(id));
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      axios.get(`${BASE_URL}/search-history/user/${userId}`)
        .then(res => setHistory(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử tìm kiếm</Text>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có lịch sử tìm kiếm</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {history.map((item) => (
            <View key={item.search_id} style={styles.historyItem}>
              <Text style={styles.queryText}>Đã tìm kiếm: {item.query}</Text>
              <Text style={styles.timeText}>
                {new Date(item.search_time).toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

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
  historyItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  queryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timeText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
