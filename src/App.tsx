import React, { useState } from 'react';
import { ShoppingCart, Phone, User, Plus, Minus, Clock, MapPin } from 'lucide-react';
import CustomerForm from './components/CustomerForm';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import { menuItems, thaliOptions } from './data/menuData';
import { CartItem, CustomerInfo, OrderSummary } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'form' | 'menu' | 'confirmation'>('form');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('snacks');
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const categories = [
    { id: 'snacks', name: 'Snacks', emoji: '🥪' },
    { id: 'meals', name: 'Meals', emoji: '🍽️' },
    { id: 'beverages', name: 'Beverages', emoji: '☕' },
    { id: 'thali', name: 'Veg Thali', emoji: '🍛' }
  ];

  const handleCustomerSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setCurrentStep('menu');
  };

  const addToCart = (item: any, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    const summary: OrderSummary = {
      customer: customerInfo!,
      items: cartItems,
      total: getTotalPrice(),
      orderTime: new Date().toLocaleString(),
      orderId: `ORD${Date.now()}`
    };
    setOrderSummary(summary);
    setCurrentStep('confirmation');
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setCurrentStep('form');
    setCustomerInfo(null);
    setOrderSummary(null);
  };

  if (currentStep === 'form') {
    return <CustomerForm onSubmit={handleCustomerSubmit} />;
  }

  if (currentStep === 'confirmation' && orderSummary) {
    return <OrderConfirmation orderSummary={orderSummary} onNewOrder={handleNewOrder} />;
  }

  const filteredItems = activeCategory === 'thali' ? thaliOptions : menuItems[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">College Canteen</h1>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{customerInfo?.name}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{customerInfo?.mobile}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b sticky top-[88px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.emoji}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {activeCategory === 'thali' ? 'Special Veg Thali' : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          {activeCategory === 'thali' && (
            <p className="text-gray-600">Customize your perfect thali with rice, dal, sabzi, and roti options</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              cartQuantity={cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}
            />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        total={getTotalPrice()}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Fixed Cart Button for Mobile */}
      {!isCartOpen && getTotalItems() > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50 md:hidden"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
        </button>
      )}
    </div>
  );
}

export default App;