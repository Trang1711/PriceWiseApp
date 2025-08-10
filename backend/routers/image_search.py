from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from PIL import Image
import io
import base64
from typing import List, Optional, Dict, Tuple
import os
import requests
from sqlalchemy.orm import Session
from database.db import get_db
from models.product import Product
from models.product import ProductPlatform
from models.platform import Platform
import hashlib
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction import image as skimage

router = APIRouter()

class AdvancedImageProcessor:
    def __init__(self):
        self.feature_cache = {}
    
    def extract_advanced_features(self, image_bytes: bytes, is_camera_photo: bool = False) -> Dict[str, np.ndarray]:
        """
        Trích xuất đặc trưng nâng cao từ hình ảnh với độ chính xác cao
        is_camera_photo: True nếu là ảnh chụp trực tiếp từ camera
        """
        try:
            # Chuyển bytes thành numpy array
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                return {}
            
            # Resize về kích thước chuẩn
            img = cv2.resize(img, (224, 224))
            
            # Cải tiến: Thêm preprocessing đặc biệt cho ảnh chụp
            if is_camera_photo:
                img = self._preprocess_camera_image(img)
            else:
                img = self._preprocess_image(img)
            
            features = {}
            
            # 1. Histogram màu (RGB) - Trọng số cao nhất
            features['color_hist'] = self._extract_color_histogram(img)
            
            # 2. Histogram grayscale
            features['gray_hist'] = self._extract_gray_histogram(img)
            
            # 3. Đặc trưng texture (GLCM)
            features['texture'] = self._extract_texture_features(img)
            
            # 4. Đặc trưng edge (Canny)
            features['edge'] = self._extract_edge_features(img)
            
            # 5. Đặc trưng SIFT
            features['sift'] = self._extract_sift_features(img)
            
            # 6. Đặc trưng HOG
            features['hog'] = self._extract_hog_features(img)
            
            # 7. Đặc trưng màu sắc trung bình
            features['color_mean'] = self._extract_color_mean(img)
            
            # 8. Đặc trưng độ tương phản
            features['contrast'] = self._extract_contrast_features(img)
            
            # 9. Đặc trưng mới: Shape features
            features['shape'] = self._extract_shape_features(img)
            
            # 10. Đặc trưng mới: Noise reduction features (đặc biệt cho ảnh chụp)
            if is_camera_photo:
                features['noise_reduction'] = self._extract_noise_reduction_features(img)
            
            return features
            
        except Exception as e:
            print(f"Error extracting advanced features: {e}")
            return {}
    
    def _preprocess_camera_image(self, img: np.ndarray) -> np.ndarray:
        """Tiền xử lý đặc biệt cho ảnh chụp từ camera"""
        try:
            # 1. Giảm nhiễu bằng Gaussian blur nhẹ
            img = cv2.GaussianBlur(img, (3, 3), 0)
            
            # 2. Cải thiện độ tương phản bằng CLAHE mạnh hơn
            lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
            l, a, b = cv2.split(lab)
            clahe = cv2.createCLAHE(clipLimit=5.0, tileGridSize=(8,8))  # Tăng clipLimit
            l = clahe.apply(l)
            lab = cv2.merge([l, a, b])
            img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
            
            # 3. Cân bằng màu sắc
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            
            # 4. Tăng độ sắc nét
            kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
            img = cv2.filter2D(img, -1, kernel)
            
            # 5. Chuẩn hóa độ sáng
            img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            h, s, v = cv2.split(v)
            v = cv2.equalizeHist(v)  # Cân bằng histogram cho kênh V
            img = cv2.merge([h, s, v])
            img = cv2.cvtColor(img, cv2.COLOR_HSV2BGR)
            
            return img
            
        except Exception as e:
            print(f"Error in camera preprocessing: {e}")
            return self._preprocess_image(img)  # Fallback to normal preprocessing
    
    def _preprocess_image(self, img: np.ndarray) -> np.ndarray:
        """Tiền xử lý hình ảnh để cải thiện chất lượng"""
        # Chuyển đổi màu sắc
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Cân bằng histogram
        lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        l = clahe.apply(l)
        lab = cv2.merge([l, a, b])
        img = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
        
        # Chuyển về BGR cho OpenCV
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        
        return img
    
    def _extract_color_histogram(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất histogram màu RGB"""
        hist_r = cv2.calcHist([img], [0], None, [64], [0, 256])
        hist_g = cv2.calcHist([img], [1], None, [64], [0, 256])
        hist_b = cv2.calcHist([img], [2], None, [64], [0, 256])
        
        # Chuẩn hóa
        hist_r = cv2.normalize(hist_r, hist_r).flatten()
        hist_g = cv2.normalize(hist_g, hist_g).flatten()
        hist_b = cv2.normalize(hist_b, hist_b).flatten()
        
        return np.concatenate([hist_r, hist_g, hist_b])
    
    def _extract_gray_histogram(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất histogram grayscale"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        return cv2.normalize(hist, hist).flatten()
    
    def _extract_texture_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng texture sử dụng GLCM"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Tính gradient
        grad_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
        
        # Tính magnitude và direction
        magnitude = np.sqrt(grad_x**2 + grad_y**2)
        direction = np.arctan2(grad_y, grad_x)
        
        # Tính đặc trưng texture
        texture_features = [
            np.mean(magnitude),
            np.std(magnitude),
            np.mean(direction),
            np.std(direction)
        ]
        
        return np.array(texture_features)
    
    def _extract_edge_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng edge"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Canny edge detection
        edges = cv2.Canny(gray, 50, 150)
        
        # Tính đặc trưng edge
        edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
        edge_hist = cv2.calcHist([edges], [0], None, [256], [0, 256])
        edge_hist = cv2.normalize(edge_hist, edge_hist).flatten()
        
        return np.concatenate([[edge_density], edge_hist])
    
    def _extract_sift_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng SIFT"""
        try:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            sift = cv2.SIFT_create()
            keypoints, descriptors = sift.detectAndCompute(gray, None)
            
            if descriptors is not None and len(descriptors) > 0:
                # Tính trung bình và độ lệch chuẩn của descriptors
                mean_desc = np.mean(descriptors, axis=0)
                std_desc = np.std(descriptors, axis=0)
                return np.concatenate([mean_desc, std_desc])
            else:
                return np.zeros(256)  # SIFT descriptor có 128 dimensions
        except:
            return np.zeros(256)
    
    def _extract_hog_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng HOG"""
        try:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Tính HOG features
            cell_size = (8, 8)
            block_size = (16, 16)
            block_stride = (8, 8)
            num_bins = 9
            
            hog = cv2.HOGDescriptor(block_size, cell_size, block_stride, cell_size, num_bins)
            hog_features = hog.compute(gray)
            
            return hog_features.flatten()
        except:
            return np.zeros(1764)  # HOG features size cho 224x224 image
    
    def _extract_color_mean(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất màu sắc trung bình"""
        mean_color = cv2.mean(img)
        return np.array(mean_color[:3])  # BGR
    
    def _extract_contrast_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng độ tương phản"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Tính độ tương phản
        contrast = np.std(gray)
        
        # Tính độ sáng trung bình
        brightness = np.mean(gray)
        
        return np.array([contrast, brightness])
    
    def _extract_shape_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng hình dạng"""
        try:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Tìm contours
            _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if contours:
                # Tính diện tích và chu vi của contour lớn nhất
                largest_contour = max(contours, key=cv2.contourArea)
                area = cv2.contourArea(largest_contour)
                perimeter = cv2.arcLength(largest_contour, True)
                
                # Tính circularity
                circularity = 4 * np.pi * area / (perimeter * perimeter) if perimeter > 0 else 0
                
                # Tính aspect ratio
                x, y, w, h = cv2.boundingRect(largest_contour)
                aspect_ratio = w / h if h > 0 else 0
                
                return np.array([area, perimeter, circularity, aspect_ratio])
            else:
                return np.array([0, 0, 0, 0])
        except:
            return np.array([0, 0, 0, 0])

    def _extract_noise_reduction_features(self, img: np.ndarray) -> np.ndarray:
        """Trích xuất đặc trưng giảm nhiễu cho ảnh chụp"""
        try:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Tính độ nhiễu
            noise_level = np.std(gray)
            
            # Tính độ mượt mà
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            smoothness = np.var(laplacian)
            
            # Tính độ tương phản cục bộ
            local_contrast = np.std(gray)
            
            return np.array([noise_level, smoothness, local_contrast])
            
        except Exception as e:
            print(f"Error extracting noise reduction features: {e}")
            return np.zeros(3)

def calculate_advanced_similarity(features1: Dict[str, np.ndarray], features2: Dict[str, np.ndarray]) -> float:
    """
    Tính độ tương đồng nâng cao sử dụng nhiều phương pháp
    """
    if not features1 or not features2:
        return 0.0
    
    similarities = []
    weights = {
        'color_hist': 0.25,
        'gray_hist': 0.15,
        'texture': 0.15,
        'edge': 0.15,
        'sift': 0.15,
        'hog': 0.10,
        'color_mean': 0.03,
        'contrast': 0.02,
        'shape': 0.05,  # Thêm trọng số cho đặc trưng hình dạng
        'noise_reduction': 0.05  # Thêm trọng số cho đặc trưng giảm nhiễu
    }
    
    for feature_name, weight in weights.items():
        if feature_name in features1 and feature_name in features2:
            try:
                if feature_name in ['color_hist', 'gray_hist', 'edge']:
                    # Sử dụng correlation cho histogram
                    similarity = cv2.compareHist(
                        features1[feature_name].astype(np.float32),
                        features2[feature_name].astype(np.float32),
                        cv2.HISTCMP_CORREL
                    )
                elif feature_name in ['texture', 'color_mean', 'contrast', 'noise_reduction']:
                    # Sử dụng cosine similarity cho vector features
                    similarity = cosine_similarity(
                        features1[feature_name].reshape(1, -1),
                        features2[feature_name].reshape(1, -1)
                    )[0][0]
                elif feature_name in ['sift', 'hog']:
                    # Sử dụng cosine similarity cho SIFT và HOG
                    similarity = cosine_similarity(
                        features1[feature_name].reshape(1, -1),
                        features2[feature_name].reshape(1, -1)
                    )[0][0]
                elif feature_name == 'shape':
                    # Sử dụng Euclidean distance cho shape features
                    distance = np.linalg.norm(features1[feature_name] - features2[feature_name])
                    similarity = 1.0 / (1.0 + distance)  # Chuyển đổi distance thành similarity
                else:
                    # Fallback cho các đặc trưng khác
                    similarity = cosine_similarity(
                        features1[feature_name].reshape(1, -1),
                        features2[feature_name].reshape(1, -1)
                    )[0][0]
                
                # Đảm bảo similarity trong khoảng [0, 1]
                similarity = max(0.0, min(1.0, similarity))
                similarities.append(similarity * weight)
                
            except Exception as e:
                print(f"Error calculating similarity for {feature_name}: {e}")
                continue
    
    if not similarities:
        return 0.0
    
    # Tính trung bình có trọng số
    total_similarity = sum(similarities)
    total_weight = sum(weights.get(feature_name, 0) for feature_name in features1.keys() if feature_name in features2)
    
    if total_weight == 0:
        return 0.0
    
    return total_similarity / total_weight

# Khởi tạo processor
image_processor = AdvancedImageProcessor()

def extract_features_from_image(image_bytes: bytes, is_camera_photo: bool = False) -> Dict[str, np.ndarray]:
    """
    Trích xuất đặc trưng từ hình ảnh sử dụng processor nâng cao
    """
    return image_processor.extract_advanced_features(image_bytes, is_camera_photo)

def calculate_similarity(features1: Dict[str, np.ndarray], features2: Dict[str, np.ndarray]) -> float:
    """
    Tính độ tương đồng sử dụng thuật toán nâng cao
    """
    return calculate_advanced_similarity(features1, features2)

@router.post("/search-by-image")
async def search_by_image(
    image: UploadFile = File(...),
    is_camera_photo: bool = False,  # Thêm tham số để phân biệt ảnh chụp
    db: Session = Depends(get_db)
):
    """
    Tìm kiếm sản phẩm bằng hình ảnh với độ chính xác cao
    is_camera_photo: True nếu là ảnh chụp trực tiếp từ camera
    """
    try:
        # Kiểm tra file
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File phải là hình ảnh")
        
        # Đọc nội dung file
        image_bytes = await image.read()
        
        # Trích xuất đặc trưng nâng cao từ hình ảnh upload với xử lý đặc biệt cho ảnh chụp
        uploaded_features = extract_features_from_image(image_bytes, is_camera_photo)
        
        if not uploaded_features:
            raise HTTPException(status_code=400, detail="Không thể xử lý hình ảnh")
        
        # Lấy tất cả sản phẩm có hình ảnh
        products_with_images = db.query(Product).filter(Product.image_url.isnot(None)).all()
        
        similar_products = []
        
        for product in products_with_images:
            try:
                # Tải hình ảnh sản phẩm từ URL
                response = requests.get(product.image_url, timeout=10)
                if response.status_code == 200:
                    product_image_bytes = response.content
                    # Sản phẩm trong DB thường là ảnh chất lượng cao, không cần xử lý đặc biệt
                    product_features = extract_features_from_image(product_image_bytes, False)
                    
                    if product_features:
                        # Tính độ tương đồng nâng cao
                        similarity = calculate_similarity(uploaded_features, product_features)
                        
                        # Ngưỡng tương đồng cao hơn (0.6 thay vì 0.3)
                        if similarity > 0.6:
                            # Lấy thông tin platform của sản phẩm
                            platforms = db.query(ProductPlatform).filter(
                                ProductPlatform.product_id == product.product_id
                            ).all()
                            
                            for platform in platforms:
                                platform_info = db.query(Platform).filter(
                                    Platform.platform_id == platform.platform_id
                                ).first()
                                
                                similar_products.append({
                                    "product_id": product.product_id,
                                    "product_platform_id": platform.product_platform_id,
                                    "platform_id": platform.platform_id,
                                    "price": platform.price,
                                    "shipping_fee": platform.shipping_fee,
                                    "product_url": platform.product_url,
                                    "similarity_score": similarity,
                                    "product": {
                                        "image_url": product.image_url,
                                        "name": product.name,
                                        "description": product.description
                                    },
                                    "platform": {
                                        "name": platform_info.name if platform_info else "Unknown"
                                    }
                                })
            except Exception as e:
                print(f"Error processing product {product.product_id}: {e}")
                continue
        
        # Sắp xếp theo độ tương đồng giảm dần
        similar_products.sort(key=lambda x: x["similarity_score"], reverse=True)
        
        # Giới hạn kết quả và chỉ trả về những sản phẩm có độ tương đồng cao
        high_quality_results = [p for p in similar_products if p["similarity_score"] > 0.7]
        medium_quality_results = [p for p in similar_products if 0.6 <= p["similarity_score"] <= 0.7]
        
        # Kết hợp kết quả, ưu tiên chất lượng cao
        results = high_quality_results + medium_quality_results[:10]
        
        return JSONResponse(content={
            "success": True,
            "results": results[:20],  # Giới hạn 20 kết quả
            "total_found": len(results),
            "high_quality_count": len(high_quality_results),
            "medium_quality_count": len(medium_quality_results),
            "is_camera_photo": is_camera_photo,  # Trả về thông tin loại ảnh
            "processing_info": {
                "camera_enhancement": is_camera_photo,
                "noise_reduction": is_camera_photo,
                "enhanced_contrast": is_camera_photo
            }
        })
        
    except Exception as e:
        print(f"Error in image search: {e}")
        raise HTTPException(status_code=500, detail="Lỗi khi tìm kiếm bằng hình ảnh") 