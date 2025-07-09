import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { BASE_URL } from '@/constants';
import axios from 'axios';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [price, setPrice] = useState('');
  const [productUrl, setProductUrl] = useState('');

  const handleAddProduct = async () => {
    try {
      // Bước 1: Thêm Product
      const productRes = await axios.post(`${BASE_URL}/admin/products`, {
        name,
        description,
        image_url: imageUrl,
        category_id: parseInt(categoryId),
      });

      const productId = productRes.data.product_id;

      // Bước 2: Thêm ProductPlatform
      await axios.post(`${BASE_URL}/admin/products/platform`, {
        product_id: productId,
        platform_id: parseInt(platformId),
        price: parseFloat(price),
        product_url: productUrl,
      });

      Alert.alert('Thành công', 'Đã thêm sản phẩm!');
      setName(''); setDescription(''); setImageUrl('');
      setCategoryId(''); setPlatformId(''); setPrice(''); setProductUrl('');
    } catch (err) {
      console.error('Add product error:', err);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tên sản phẩm</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Image URL</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />

      <Text style={styles.label}>Category ID</Text>
      <TextInput style={styles.input} value={categoryId} onChangeText={setCategoryId} keyboardType="numeric" />

      <Text style={styles.label}>Platform ID</Text>
      <TextInput style={styles.input} value={platformId} onChangeText={setPlatformId} keyboardType="numeric" />

      <Text style={styles.label}>Giá</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Text style={styles.label}>Link sản phẩm</Text>
      <TextInput style={styles.input} value={productUrl} onChangeText={setProductUrl} />

      <Button title="Thêm sản phẩm" onPress={handleAddProduct} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
});
