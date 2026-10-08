import {
  ProductItem,
  AssemblyStepData,
  FeatureData,
  GalleryItem,
  WebsiteContentData,
  OrderItem,
  CustomerMessage,
  AppSettings,
  OrderStatus,
  MessageStatus,
} from '../types/data';
import {
  INITIAL_PRODUCT,
  INITIAL_ASSEMBLY_STEPS,
  INITIAL_FEATURES,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_GALLERY,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
} from './mockData';

const STORAGE_KEYS = {
  PRODUCT: 'aura_data_product',
  STEPS: 'aura_data_assembly_steps',
  FEATURES: 'aura_data_features',
  CONTENT: 'aura_data_website_content',
  GALLERY: 'aura_data_gallery',
  ORDERS: 'aura_data_orders',
  MESSAGES: 'aura_data_messages',
  SETTINGS: 'aura_data_settings',
};

// Helper for local storage read/write
function readStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Failed to read from localStorage key "${key}":`, err);
    return defaultValue;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to write to localStorage key "${key}":`, err);
  }
}

/**
 * DataService provides an abstracted repository layer.
 * When Supabase client is configured, each method maps to a Supabase table:
 * e.g. `supabase.from('products').select('*')` etc.
 */
class DataService {
  // 1. Product
  async getProduct(): Promise<ProductItem> {
    return readStorage<ProductItem>(STORAGE_KEYS.PRODUCT, INITIAL_PRODUCT);
  }

  async updateProduct(product: Partial<ProductItem>): Promise<ProductItem> {
    const current = await this.getProduct();
    const updated = { ...current, ...product };
    writeStorage(STORAGE_KEYS.PRODUCT, updated);
    return updated;
  }

  // 2. Assembly Steps
  async getAssemblySteps(): Promise<AssemblyStepData[]> {
    const steps = readStorage<AssemblyStepData[]>(STORAGE_KEYS.STEPS, INITIAL_ASSEMBLY_STEPS);
    return [...steps].sort((a, b) => a.order - b.order);
  }

  async updateAssemblyStep(id: string, updates: Partial<AssemblyStepData>): Promise<AssemblyStepData[]> {
    const steps = await this.getAssemblySteps();
    const index = steps.findIndex((s) => s.id === id);
    if (index !== -1) {
      steps[index] = { ...steps[index], ...updates };
      writeStorage(STORAGE_KEYS.STEPS, steps);
    }
    return steps;
  }

  // 3. Features
  async getFeatures(): Promise<FeatureData[]> {
    const features = readStorage<FeatureData[]>(STORAGE_KEYS.FEATURES, INITIAL_FEATURES);
    return [...features].sort((a, b) => a.order - b.order);
  }

  async updateFeature(id: string, updates: Partial<FeatureData>): Promise<FeatureData[]> {
    const features = await this.getFeatures();
    const index = features.findIndex((f) => f.id === id);
    if (index !== -1) {
      features[index] = { ...features[index], ...updates };
      writeStorage(STORAGE_KEYS.FEATURES, features);
    }
    return features;
  }

  // 4. Website Content
  async getWebsiteContent(): Promise<WebsiteContentData> {
    return readStorage<WebsiteContentData>(STORAGE_KEYS.CONTENT, INITIAL_WEBSITE_CONTENT);
  }

  async updateWebsiteContent(updates: Partial<WebsiteContentData>): Promise<WebsiteContentData> {
    const current = await this.getWebsiteContent();
    const updated = { ...current, ...updates };
    writeStorage(STORAGE_KEYS.CONTENT, updated);
    return updated;
  }

  // 5. Gallery
  async getGallery(): Promise<GalleryItem[]> {
    const gallery = readStorage<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    return [...gallery].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async addGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem[]> {
    const gallery = await this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    const updated = [...gallery, newItem];
    writeStorage(STORAGE_KEYS.GALLERY, updated);
    return updated;
  }

  async deleteGalleryItem(id: string): Promise<GalleryItem[]> {
    const gallery = await this.getGallery();
    const updated = gallery.filter((g) => g.id !== id);
    writeStorage(STORAGE_KEYS.GALLERY, updated);
    return updated;
  }

  // 6. Orders
  async getOrders(): Promise<OrderItem[]> {
    return readStorage<OrderItem[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  async createOrder(order: Omit<OrderItem, 'id' | 'createdDate'>): Promise<OrderItem> {
    const orders = await this.getOrders();
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newOrder: OrderItem = {
      ...order,
      id: `ORD-${Date.now().toString().slice(-4)}`,
      createdDate: dateStr,
    };
    const updated = [newOrder, ...orders];
    writeStorage(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<OrderItem[]> {
    const orders = await this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      writeStorage(STORAGE_KEYS.ORDERS, orders);
    }
    return orders;
  }

  // 7. Messages
  async getMessages(): Promise<CustomerMessage[]> {
    return readStorage<CustomerMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  }

  async createMessage(msg: Omit<CustomerMessage, 'id' | 'createdDate' | 'status'>): Promise<CustomerMessage> {
    const messages = await this.getMessages();
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: CustomerMessage = {
      ...msg,
      id: `MSG-${Date.now().toString().slice(-4)}`,
      status: 'unread',
      createdDate: dateStr,
    };
    const updated = [newMsg, ...messages];
    writeStorage(STORAGE_KEYS.MESSAGES, updated);
    return newMsg;
  }

  async updateMessageStatus(id: string, status: MessageStatus): Promise<CustomerMessage[]> {
    const messages = await this.getMessages();
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages[index].status = status;
      writeStorage(STORAGE_KEYS.MESSAGES, messages);
    }
    return messages;
  }

  // 8. Settings
  async getSettings(): Promise<AppSettings> {
    return readStorage<AppSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  async updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...updates };
    writeStorage(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // Reset to initial defaults
  async resetToDefaults(): Promise<void> {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
}

export const dataService = new DataService();
