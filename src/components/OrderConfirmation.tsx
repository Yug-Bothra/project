import React from 'react';
import { CheckCircle, Clock, User, Phone, ShoppingBag, Utensils } from 'lucide-react';
import { OrderSummary } from '../types';

interface OrderConfirmationProps {
  orderSummary: OrderSummary;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderSummary, onNewOrder }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Your delicious meal is being prepared</p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Order ID */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Order ID</span>
              <span className="font-bold text-orange-600">{orderSummary.orderId}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{orderSummary.customer.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{orderSummary.customer.mobile}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{orderSummary.orderTime}</span>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Order Items</span>
            </h3>
            <div className="space-y-2">
              {orderSummary.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-orange-600">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">₹{orderSummary.total}</span>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Utensils className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-orange-700 font-medium">Estimated Preparation Time</p>
            <p className="text-2xl font-bold text-orange-600">15-20 minutes</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onNewOrder}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Place Another Order
          </button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Thank you for ordering from College Canteen! 🍽️</p>
            <p>We'll call you when your order is ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;