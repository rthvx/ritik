import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  User, 
  Order, 
  OrderItem, 
  OrderStatus, 
  Coupon, 
  StoreSettings, 
  ToastNotification 
} from '../types';
import { PRODUCTS, VALID_COUPONS } from '../data/products';
import { formatPrice } from '../utils/format';

export const INITIAL_CUSTOMERS: User[] = [
  {
    id: 'usr-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    joinedDate: 'Jan 15, 2024',
    role: 'customer',
    totalSpent: 32427,
    ordersCount: 4,
    city: 'New Delhi',
    address: '42, Connaught Place, Block B'
  },
  {
    id: 'usr-002',
    name: 'Priya Patel',
    email: 'priya.patel@designstudio.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98234 56789',
    joinedDate: 'Mar 22, 2024',
    role: 'customer',
    totalSpent: 48999,
    ordersCount: 6,
    city: 'Mumbai',
    address: 'Flat 402, Sea Green Apts, Bandra West'
  },
  {
    id: 'usr-003',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@techworks.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+91 97112 88432',
    joinedDate: 'May 04, 2024',
    role: 'customer',
    totalSpent: 27498,
    ordersCount: 3,
    city: 'Bengaluru',
    address: 'Indiranagar 100ft Road, Stage 2'
  },
  {
    id: 'usr-004',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@creatives.co',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    phone: '+91 99401 23456',
    joinedDate: 'Jun 19, 2024',
    role: 'customer',
    totalSpent: 18999,
    ordersCount: 2,
    city: 'Chennai',
    address: '14, Besant Nagar Beach Road'
  },
  {
    id: 'usr-005',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@kolkataventures.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98300 76543',
    joinedDate: 'Aug 10, 2024',
    role: 'customer',
    totalSpent: 54299,
    ordersCount: 7,
    city: 'Kolkata',
    address: '7B, Ballygunge Circular Road'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RTH-89421',
    date: 'Aug 24, 2026',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98765 43210',
    paymentMethod: 'UPI (aarav@okaxis)',
    items: [
      {
        productId: 'prod-4',
        name: 'Smart Watch Series 9',
        price: 14999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Midnight Black',
        selectedSize: '45mm'
      }
    ],
    subtotal: 14999,
    discount: 1500,
    shipping: 0,
    tax: 1620,
    total: 15119,
    status: 'Delivered',
    trackingNumber: 'TRK-9831049-IN',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      address: '42, Connaught Place, Block B',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110001',
      country: 'India'
    }
  },
  {
    id: 'RTH-89422',
    date: 'Aug 26, 2026',
    customerEmail: 'priya.patel@designstudio.in',
    customerPhone: '+91 98234 56789',
    paymentMethod: 'Credit Card (HDFC **** 4892)',
    items: [
      {
        productId: 'prod-8',
        name: 'Sony WH-1000XM5',
        price: 24999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Midnight Black',
        selectedSize: 'Standard'
      },
      {
        productId: 'prod-1',
        name: 'Essential Hoodie',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Charcoal Black',
        selectedSize: 'M'
      }
    ],
    subtotal: 27498,
    discount: 2749,
    shipping: 0,
    tax: 2969,
    total: 27718,
    status: 'Shipped',
    trackingNumber: 'TRK-8819204-IN',
    shippingAddress: {
      fullName: 'Priya Patel',
      address: 'Flat 402, Sea Green Apts, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400050',
      country: 'India'
    }
  },
  {
    id: 'RTH-89423',
    date: 'Aug 27, 2026',
    customerEmail: 'rohan.mehta@techworks.com',
    customerPhone: '+91 97112 88432',
    paymentMethod: 'Net Banking (ICICI)',
    items: [
      {
        productId: 'prod-2',
        name: 'Air Max 270',
        price: 8999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Triple White / Orange',
        selectedSize: 'UK 9'
      },
      {
        productId: 'prod-5',
        name: 'Stainless Steel Bottle',
        price: 1299,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Matte Onyx',
        selectedSize: '750ml'
      }
    ],
    subtotal: 11597,
    discount: 500,
    shipping: 0,
    tax: 1331,
    total: 12428,
    status: 'Processing',
    trackingNumber: 'TRK-7729103-IN',
    shippingAddress: {
      fullName: 'Rohan Mehta',
      address: 'Indiranagar 100ft Road, Stage 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560038',
      country: 'India'
    }
  },
  {
    id: 'RTH-89424',
    date: 'Aug 28, 2026',
    customerEmail: 'ananya.iyer@creatives.co',
    customerPhone: '+91 99401 23456',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-9',
        name: 'Botanical Radiance Serum',
        price: 1499,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1608248597359-25f0a2569fa1?auto=format&fit=crop&w=400&q=80',
        selectedSize: '30ml'
      },
      {
        productId: 'prod-10',
        name: 'Nordic Ceramic Lounge Vase',
        price: 2199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=400&q=80',
        selectedColor: 'Limestone White'
      }
    ],
    subtotal: 5197,
    discount: 0,
    shipping: 0,
    tax: 624,
    total: 5821,
    status: 'Confirmed',
    trackingNumber: 'TRK-6640194-IN',
    shippingAddress: {
      fullName: 'Ananya Iyer',
      address: '14, Besant Nagar Beach Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip: '600090',
      country: 'India'
    }
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'RTHVX E-Commerce',
  supportEmail: 'support@rthvx.in',
  supportPhone: '+91 98765 43210',
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  taxRatePercent: 12,
  currency: 'INR',
  currencySymbol: '₹'
};

interface ShopContextType {
  // Navigation & Views
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  adminActiveTab: string;
  setAdminActiveTab: (tab: string) => void;

  // Products
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'> & { id?: string }) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleProductStock: (productId: string) => void;

  // Storefront & Cart
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  appliedCoupon: Coupon | null;
  coupons: Coupon[];
  customers: User[];
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;

  // Coupons CRUD
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (code: string, updated: Partial<Coupon>) => void;
  deleteCoupon: (code: string) => void;
  toggleCouponStatus: (code: string) => void;

  // Orders Admin
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderTracking: (orderId: string, trackingNumber: string) => void;
  deleteOrder: (orderId: string) => void;

  // Customers Admin
  addCustomer: (customer: Partial<User>) => void;
  deleteCustomer: (id: string) => void;

  // Toasts
  toasts: ToastNotification[];
  toast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  buyNow: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  
  // Navigation & filtering
  activeNav: string;
  setActiveNav: (nav: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Calculations
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  
  // Currency helper
  currency: string;
  currencySymbol: string;
  formatPrice: (amount: number | string | undefined | null) => string;

  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (id: string, pass: string) => { success: boolean; message?: string };
  adminLogout: () => void;

  // Auth & Orders
  login: (email: string, name?: string) => void;
  logout: () => void;
  createOrder: (shippingDetails: Order['shippingAddress']) => Order;
  resetToDefaultData: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Main view toggle: 'store' or 'admin'
  const [currentView, setCurrentView] = useState<'store' | 'admin'>(() => {
    try {
      const saved = localStorage.getItem('rthvx_view');
      return (saved === 'admin' || saved === 'store') ? saved : 'store';
    } catch {
      return 'store';
    }
  });

  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rthvx_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const adminLogin = (adminId: string, adminPass: string): { success: boolean; message?: string } => {
    const trimmedId = adminId.trim();
    const trimmedPass = adminPass.trim();

    // Exact credentials required: id: rthvx7, pass: Kumak4786
    if (trimmedId === 'rthvx7' && trimmedPass === 'Kumak4786') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('rthvx_admin_auth', 'true');
      } catch (e) {
        console.error(e);
      }
      toast('Admin Login Successful', 'Welcome back, Administrator rthvx7!', 'success');
      return { success: true };
    }

    if (trimmedId !== 'rthvx7') {
      toast('Login Failed', 'Invalid Admin ID / Username. Access Denied.', 'error');
      return { success: false, message: 'Invalid Admin ID. Access is restricted.' };
    }

    toast('Login Failed', 'Incorrect Admin Password. Access Denied.', 'error');
    return { success: false, message: 'Incorrect password. Try again.' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('rthvx_admin_auth');
    } catch (e) {
      console.error(e);
    }
    toast('Admin Logged Out', 'Session terminated securely.', 'info');
  };

  // Products state persisted
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Coupons state persisted
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_coupons');
      return saved ? JSON.parse(saved) : VALID_COUPONS.map((c, i) => ({
        ...c,
        id: `cpn-${i + 1}`,
        isActive: true,
        usageCount: Math.floor(12 + Math.random() * 85),
        expiryDate: 'Dec 31, 2026'
      }));
    } catch {
      return VALID_COUPONS;
    }
  });

  // Store Settings persisted
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('rthvx_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Customers persisted
  const [customers, setCustomers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'init-cart-1',
          product: PRODUCTS[0],
          quantity: 1,
          selectedColor: 'Oatmeal Beige',
          selectedSize: 'M'
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_wishlist');
      return saved ? JSON.parse(saved) : ['prod-2', 'prod-4'];
    } catch {
      return ['prod-2', 'prod-4'];
    }
  });

  // User state persisted
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rthvx_user');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0];
    } catch {
      return null;
    }
  });

  // Orders history persisted
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rthvx_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // UI Drawer & Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Navigation & Search
  const [activeNav, setActiveNav] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rthvx_view', currentView);
    } catch (e) {
      console.error(e);
    }
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rthvx_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rthvx_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('rthvx_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast dispatcher
  const toast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'> & { id?: string }): Product => {
    const newId = productData.id || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 0,
      inStock: productData.inStock !== false,
      sku: productData.sku || `RTH-SKU-${Math.floor(100 + Math.random() * 900)}`,
      gallery: productData.gallery && productData.gallery.length > 0 ? productData.gallery : [productData.image],
      features: productData.features || ['Premium quality materials', 'Precision design']
    };

    setProducts((prev) => [newProduct, ...prev]);
    toast('Product Added', `"${newProduct.name}" is now available in your catalog.`, 'success');
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast('Product Updated', `Saved changes to "${updatedProduct.name}".`, 'success');
  };

  const deleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast('Product Deleted', target ? `"${target.name}" removed from catalog.` : 'Product removed.', 'info');
  };

  const toggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = !p.inStock;
          toast('Stock Status Changed', `${p.name} is now ${newStatus ? 'In Stock' : 'Out of Stock'}.`, 'info');
          return { ...p, inStock: newStatus };
        }
        return p;
      })
    );
  };

  // Coupon CRUD
  const addCoupon = (coupon: Coupon) => {
    const cleanCode = coupon.code.trim().toUpperCase();
    const newCoupon: Coupon = {
      ...coupon,
      code: cleanCode,
      id: coupon.id || `cpn-${Date.now()}`,
      isActive: coupon.isActive !== false,
      usageCount: 0
    };
    setCoupons((prev) => [newCoupon, ...prev.filter((c) => c.code !== cleanCode)]);
    toast('Coupon Created', `Promo code "${cleanCode}" is now active.`, 'success');
  };

  const updateCoupon = (code: string, updated: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, ...updated } : c))
    );
    toast('Coupon Updated', `Coupon "${code}" has been updated.`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    toast('Coupon Deleted', `Coupon "${code}" was deleted.`, 'info');
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => {
        if (c.code === code) {
          const updatedState = !c.isActive;
          toast('Coupon Status', `Coupon "${code}" is now ${updatedState ? 'Active' : 'Disabled'}.`, 'info');
          return { ...c, isActive: updatedState };
        }
        return c;
      })
    );
  };

  // Orders Admin
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    toast('Order Status Updated', `Order ${orderId} marked as ${status}.`, 'success');
  };

  const updateOrderTracking = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, trackingNumber } : ord))
    );
    toast('Tracking Updated', `Tracking for ${orderId} updated to ${trackingNumber}.`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    toast('Order Removed', `Order ${orderId} deleted.`, 'info');
  };

  // Customers Admin
  const addCustomer = (customerData: Partial<User>) => {
    const newCust: User = {
      id: customerData.id || `usr-${Date.now()}`,
      name: customerData.name || 'New Customer',
      email: customerData.email || 'customer@example.com',
      avatar: customerData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: customerData.phone || '+91 98765 00000',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalSpent: customerData.totalSpent || 0,
      ordersCount: customerData.ordersCount || 0,
      city: customerData.city || 'Mumbai',
      address: customerData.address || 'Street 1, Main Road'
    };
    setCustomers((prev) => [newCust, ...prev]);
    toast('Customer Added', `${newCust.name} added to records.`, 'success');
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast('Customer Deleted', 'Customer record deleted.', 'info');
  };

  // Settings
  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    toast('Settings Saved', 'Store configuration updated successfully.', 'success');
  };

  // Reset to default sample data
  const resetToDefaultData = () => {
    setProducts(PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCoupons(VALID_COUPONS.map((c, i) => ({
      ...c,
      id: `cpn-${i + 1}`,
      isActive: true,
      usageCount: 15,
      expiryDate: 'Dec 31, 2026'
    })));
    setStoreSettings(INITIAL_SETTINGS);
    localStorage.removeItem('rthvx_products');
    localStorage.removeItem('rthvx_orders');
    localStorage.removeItem('rthvx_customers');
    localStorage.removeItem('rthvx_coupons');
    localStorage.removeItem('rthvx_settings');
    toast('Demo Data Reset', 'Reset all products, orders, and settings to defaults.', 'success');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name);
    const size = selectedSize || (product.sizes && product.sizes[0]);
    const cartItemId = `${product.id}-${color || 'default'}-${size || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size
          }
        ];
      }
    });

    toast('Added to Cart', `${product.name} (x${quantity}) was added to your bag.`, 'success');
  };

  const buyNow = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    toast('Item Removed', 'Product was removed from your cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        toast('Removed from Wishlist', `${product.name} removed from your saved list.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        toast('Saved to Wishlist', `${product.name} added to your wishlist.`, 'success');
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const match = coupons.find((c) => c.code === cleanCode && (c.isActive !== false));
    if (!match) {
      toast('Invalid Promo Code', `Coupon code "${cleanCode}" is invalid or expired. Try "RTHVX10" or "FLASH70".`, 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    if (match.minOrder && subtotal < match.minOrder) {
      toast('Minimum Order Not Met', `Code ${match.code} requires a minimum order of ₹${match.minOrder.toLocaleString('en-IN')}.`, 'warning');
      return { success: false, message: `Requires minimum order of ₹${match.minOrder.toLocaleString('en-IN')}` };
    }

    setAppliedCoupon(match);
    toast('Coupon Applied! 🎉', `Applied ${match.code}: ${match.description}`, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast('Coupon Removed', 'Discount promo code removed.', 'info');
  };

  // Cart calculations in INR using dynamic storeSettings
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const freeShippingThreshold = storeSettings.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.code === 'FREESHIP';
  const shippingAmount = cart.length === 0 ? 0 : isFreeShipping ? 0 : storeSettings.standardShippingFee;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // Dynamic Tax / GST from store settings
  const taxAmount = cart.length === 0 ? 0 : Math.round((taxableAmount * storeSettings.taxRatePercent) / 100);
  const totalAmount = Math.max(0, taxableAmount + shippingAmount + taxAmount);

  // Auth actions
  const login = (email: string, name?: string) => {
    const formattedName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Joined Today',
      role: 'customer'
    };
    setUser(newUser);
    setIsAuthOpen(false);
    toast('Welcome Back!', `Signed in as ${newUser.name}`, 'success');
  };

  const logout = () => {
    setUser(null);
    setIsProfileOpen(false);
    toast('Signed Out', 'You have been logged out of your account.', 'info');
  };

  const createOrder = (shippingDetails: Order['shippingAddress']): Order => {
    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));

    const orderId = `RTH-${Math.floor(10000 + Math.random() * 90000)}`;
    const tracking = `TRK-${Math.floor(1000000 + Math.random() * 9000000)}-IN`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: orderItems,
      subtotal,
      discount: discountAmount,
      shipping: shippingAmount,
      tax: taxAmount,
      total: totalAmount,
      status: 'Confirmed',
      trackingNumber: tracking,
      shippingAddress: shippingDetails,
      customerEmail: user?.email || 'guest@customer.in',
      customerPhone: user?.phone || '+91 98765 43210',
      paymentMethod: 'UPI / Online'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminActiveTab,
        setAdminActiveTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        toggleCouponStatus,
        customers,
        addCustomer,
        deleteCustomer,
        storeSettings,
        updateStoreSettings,
        cart,
        wishlist,
        user,
        orders,
        updateOrderStatus,
        updateOrderTracking,
        deleteOrder,
        appliedCoupon,
        toasts,
        toast,
        removeToast,
        addToCart,
        buyNow,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        setQuickViewProduct,
        activeNav,
        setActiveNav,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cartCount,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        totalAmount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        currency: storeSettings.currency,
        currencySymbol: storeSettings.currencySymbol,
        formatPrice,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        login,
        logout,
        createOrder,
        resetToDefaultData
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

