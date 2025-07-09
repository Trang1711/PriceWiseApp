import axios from 'axios';

// export const BASE_URL = "http://172.17.153.219:8000";
// export const BASE_URL = "http://192.168.23.138:8000";
// export const BASE_URL = "http://172.17.152.63:8000"
export const BASE_URL="http://172.17.154.222:8000"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// 🔍 Tìm kiếm sản phẩm theo keyword
export const search = async (keyword) => {
  return await api.get(`/search?keyword=${encodeURIComponent(keyword)}`);
};

// Thêm sản phẩm vào danh sách yêu thích
export const addToFavorites = (productId: number, userId: number, productPlatformId: number) => {
  return axios.post(`${BASE_URL}/favorites/add`, {
    product_id: productId,
    user_id: userId,
    product_platform_id: productPlatformId,
  });
  
};

// export const removeFromFavorites = (productId: number, userId: number, productPlatformId: number) => {
//   return axios.delete(`${BASE_URL}/favorites/remove`, {
//     data: {
//       product_id: productId,
//       user_id: userId,
//       product_platform_id: productPlatformId,
//     },
//   });
// };

export const removeFromFavorites = (productId: number, userId: number, productPlatformId: number) => {
  return axios.delete(`${BASE_URL}/favorites/remove`, {
    params: {
      product_id: productId,
      user_id: userId,
      product_platform_id: productPlatformId,
    },
  });
};

