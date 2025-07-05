from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password_hash: str

class UserUpdate(BaseModel):
    username: str
    email: str
    password_hash: Optional[str] = None
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

class UserOut(BaseModel):
    user_id: int
    username: str
    email: str
    password_hash: str
    full_name: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

class ProductSchema(BaseModel):
    product_id: int
    name: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class ProductCardOut(BaseModel):
    platformLogo: str
    productImage: str
    currentPrice: str
    originalPrice: Optional[str]
    discountPercentage: Optional[str]
    shippingFee: Optional[str]
    totalPrice: str
    isAvailable: bool
    rating: str
    productUrl: str

    class Config:
        orm_mode = True

from pydantic import BaseModel
from datetime import datetime

class FavoriteProductSchema(BaseModel):
    favorite_id: int
    user_id: int
    product_id: int
    added_at: datetime

    class Config:
        orm_mode = True


from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PlatformInfo(BaseModel):
    name: str
    logo_url: Optional[str]
    url: Optional[str]

class ProductPlatformInfo(BaseModel):
    price: float
    discount: Optional[float]
    discount_percentage: Optional[float]
    rating: Optional[float]
    review_count: Optional[int]
    product_url: Optional[str]
    shipping_fee: Optional[float]
    estimated_delivery_time: Optional[str]
    is_official: Optional[bool]
    platform: PlatformInfo

    class Config:
        orm_mode = True

class ProductInfo(BaseModel):
    product_id: int
    name: str
    description: Optional[str]
    image_url: Optional[str]
    platforms: list[ProductPlatformInfo]

    class Config:
        orm_mode = True

class FavoriteProductResponse(BaseModel):
    favorite_id: int
    user_id: int
    added_at: datetime
    product: ProductInfo

    class Config:
        orm_mode = True

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class PlatformOut(BaseModel):
    platform_id: int
    name: str
    website_url: Optional[str] = None

    class Config:
        from_attributes = True

class ProductPlatformOut(BaseModel):
    platform: PlatformOut
    price: float
    discount: Optional[float] = None
    discount_percentage: Optional[float] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    product_url: str
    shipping_fee: float
    estimated_delivery_time: Optional[str] = None
    is_official: Optional[bool] = None

    class Config:
        from_attributes = True

class ProductOut(BaseModel):
    product_id: int
    name: str
    category_id: Optional[int] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    platforms: List[ProductPlatformOut] = Field(default_factory=list)

    class Config:
        from_attributes = True


from pydantic import BaseModel

class FavoriteCreate(BaseModel):
    user_id: int
    product_id: int
