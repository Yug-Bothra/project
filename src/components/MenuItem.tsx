import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category: string;
    isVeg?: boolean;
  };
  onAddToCart: (item: any, quantity: number) => void;
  cartQuantity: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, cartQuantity }) => {
  const handleAddToCart = () => {
    onAddToCart(item, 1);
  };

  const handleIncrement = () => {
    onAddToCart(item, 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      onAddToCart(item, -1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div className={`w-3 h-3 rounded-full border-2 border-white ${
            item.isVeg !== false ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
          
          {cartQuantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-1 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-orange-50 rounded-lg p-1">
              <button
                onClick={handleDecrement}
                className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-orange-600 min-w-[2rem] text-center">
                {cartQuantity}
              </span>
              <button
                onClick={handleIncrement}
                className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;