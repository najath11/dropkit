export interface Product {
  id: string;
  name: string;
  codename: string;
  price: number;
  category: 'club' | 'intl';
  description: string;
  details: string[];
  fabric: {
    composition: string;
    weight: string; // e.g. "115 gsm"
    origin: string; // e.g. "Treviso, Italy"
    features: string[];
    dragCoef?: string; // e.g. "0.315 CdA"
    reclaimedPercentage?: string; // e.g. "82%"
  };
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  backImage?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
