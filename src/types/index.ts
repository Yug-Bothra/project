export interface CustomerInfo {
  name: string;
  mobile: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  isVeg?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderSummary {
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  orderTime: string;
  orderId: string;
}