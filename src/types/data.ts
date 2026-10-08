export type OrderStatus = 'new' | 'confirmed' | 'delivered' | 'cancelled';
export type MessageStatus = 'unread' | 'read' | 'replied';

export interface ProductItem {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  heroImage: string;
  galleryImages: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  material: string;
  dimensions: string;
  weight: string;
  stock: number;
}

export interface AssemblyStepData {
  id: string;
  stepNumber: number;
  title: string;
  componentName: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  material: string;
  specs: string;
  animationType: string;
  order: number;
  image?: string;
}

export interface FeatureData {
  id: string;
  title: string;
  tagline: string;
  highlight: string;
  description: string;
  statNumber: string;
  statLabel: string;
  iconName: string;
  image?: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface WebsiteContentData {
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  scrollExploreText: string;
  activationTitle: string;
  activationSubtitle: string;
  activationTagline: string;
  activationDescription: string;
  explodedTitle: string;
  explodedSubtitle: string;
  explodedDescription: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featuresDescription: string;
  manualTitle: string;
  manualSubtitle: string;
  manualDescription: string;
  finalTitle: string;
  finalSubtitle: string;
  finalDescription: string;
  ctaText: string;
  footerDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export interface OrderItem {
  id: string;
  customerName: string;
  phone: string;
  product: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  createdDate: string;
  address?: string;
  note?: string;
}

export interface CustomerMessage {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  message: string;
  createdDate: string;
  status: MessageStatus;
  source: 'website' | 'messenger' | 'direct';
}

export interface AppSettings {
  storeName: string;
  currency: string;
  contactPhone: string;
  contactEmail: string;
  facebookPageId: string;
  supabaseEnabled: boolean;
  metaWebhookEnabled: boolean;
  primaryColor: string;
}
