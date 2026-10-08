import React, { createContext, useContext, useState, useEffect } from 'react';
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
import { dataService } from '../services/dataService';
import {
  INITIAL_PRODUCT,
  INITIAL_ASSEMBLY_STEPS,
  INITIAL_FEATURES,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_GALLERY,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
} from '../services/mockData';

interface DataContextType {
  product: ProductItem;
  assemblySteps: AssemblyStepData[];
  features: FeatureData[];
  websiteContent: WebsiteContentData;
  gallery: GalleryItem[];
  orders: OrderItem[];
  messages: CustomerMessage[];
  settings: AppSettings;
  isLoading: boolean;
  // Mutations
  updateProduct: (product: Partial<ProductItem>) => Promise<void>;
  updateAssemblyStep: (id: string, updates: Partial<AssemblyStepData>) => Promise<void>;
  updateFeature: (id: string, updates: Partial<FeatureData>) => Promise<void>;
  updateWebsiteContent: (updates: Partial<WebsiteContentData>) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  createOrder: (order: Omit<OrderItem, 'id' | 'createdDate'>) => Promise<OrderItem>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  createMessage: (msg: Omit<CustomerMessage, 'id' | 'createdDate' | 'status'>) => Promise<CustomerMessage>;
  updateMessageStatus: (id: string, status: MessageStatus) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<ProductItem>(INITIAL_PRODUCT);
  const [assemblySteps, setAssemblySteps] = useState<AssemblyStepData[]>(INITIAL_ASSEMBLY_STEPS);
  const [features, setFeatures] = useState<FeatureData[]>(INITIAL_FEATURES);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContentData>(INITIAL_WEBSITE_CONTENT);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [messages, setMessages] = useState<CustomerMessage[]>(INITIAL_MESSAGES);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function loadAll() {
      try {
        const [
          prod,
          steps,
          feat,
          content,
          gal,
          ord,
          msg,
          sett,
        ] = await Promise.all([
          dataService.getProduct(),
          dataService.getAssemblySteps(),
          dataService.getFeatures(),
          dataService.getWebsiteContent(),
          dataService.getGallery(),
          dataService.getOrders(),
          dataService.getMessages(),
          dataService.getSettings(),
        ]);

        setProduct(prod);
        setAssemblySteps(steps);
        setFeatures(feat);
        setWebsiteContent(content);
        setGallery(gal);
        setOrders(ord);
        setMessages(msg);
        setSettings(sett);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAll();
  }, []);

  const updateProduct = async (updates: Partial<ProductItem>) => {
    const updated = await dataService.updateProduct(updates);
    setProduct(updated);
  };

  const updateAssemblyStep = async (id: string, updates: Partial<AssemblyStepData>) => {
    const updated = await dataService.updateAssemblyStep(id, updates);
    setAssemblySteps(updated);
  };

  const updateFeature = async (id: string, updates: Partial<FeatureData>) => {
    const updated = await dataService.updateFeature(id, updates);
    setFeatures(updated);
  };

  const updateWebsiteContent = async (updates: Partial<WebsiteContentData>) => {
    const updated = await dataService.updateWebsiteContent(updates);
    setWebsiteContent(updated);
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const updated = await dataService.addGalleryItem(item);
    setGallery(updated);
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = await dataService.deleteGalleryItem(id);
    setGallery(updated);
  };

  const createOrder = async (order: Omit<OrderItem, 'id' | 'createdDate'>) => {
    const created = await dataService.createOrder(order);
    setOrders((prev) => [created, ...prev]);
    return created;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const updated = await dataService.updateOrderStatus(id, status);
    setOrders(updated);
  };

  const createMessage = async (msg: Omit<CustomerMessage, 'id' | 'createdDate' | 'status'>) => {
    const created = await dataService.createMessage(msg);
    setMessages((prev) => [created, ...prev]);
    return created;
  };

  const updateMessageStatus = async (id: string, status: MessageStatus) => {
    const updated = await dataService.updateMessageStatus(id, status);
    setMessages(updated);
  };

  const updateSettings = async (updates: Partial<AppSettings>) => {
    const updated = await dataService.updateSettings(updates);
    setSettings(updated);
  };

  const resetToDefaults = async () => {
    await dataService.resetToDefaults();
    setProduct(INITIAL_PRODUCT);
    setAssemblySteps(INITIAL_ASSEMBLY_STEPS);
    setFeatures(INITIAL_FEATURES);
    setWebsiteContent(INITIAL_WEBSITE_CONTENT);
    setGallery(INITIAL_GALLERY);
    setOrders(INITIAL_ORDERS);
    setMessages(INITIAL_MESSAGES);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <DataContext.Provider
      value={{
        product,
        assemblySteps,
        features,
        websiteContent,
        gallery,
        orders,
        messages,
        settings,
        isLoading,
        updateProduct,
        updateAssemblyStep,
        updateFeature,
        updateWebsiteContent,
        addGalleryItem,
        deleteGalleryItem,
        createOrder,
        updateOrderStatus,
        createMessage,
        updateMessageStatus,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
