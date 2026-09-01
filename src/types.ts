export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Fashion' | 'Electronics' | 'Beauty' | 'Fitness' | 'Home Decor' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  discountPercent?: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription?: string;
  features: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
  sku: string;
  stockCount?: number;
}

export interface Category {
  id: string;
  name: 'Fashion' | 'Electronics' | 'Beauty' | 'Fitness' | 'Home Decor' | 'Accessories';
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Confirmed' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customerEmail?: string;
  customerPhone?: string;
  paymentMethod?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  joinedDate: string;
  role?: 'admin' | 'customer';
  totalSpent?: number;
  ordersCount?: number;
  address?: string;
  city?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder?: number;
  description: string;
  isActive?: boolean;
  usageCount?: number;
  expiryDate?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline?: string;
  supportEmail: string;
  supportPhone: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxRatePercent: number;
  currency: string;
  currencySymbol: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
