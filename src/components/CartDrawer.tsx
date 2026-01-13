import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/40 z-[70]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-off-white z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-dark">
              <h2 className="font-display text-xl tracking-wide">
                Your Cart ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-cream rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag size={48} className="text-stone mb-4" />
                <p className="text-lg font-display mb-2">Your cart is empty</p>
                <p className="text-stone text-sm mb-6">
                  Discover our collection and add items to your cart
                </p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="px-8 py-3 bg-charcoal text-cream text-sm tracking-wide hover:bg-cherry transition-colors"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="w-24 h-32 bg-cream flex-shrink-0 overflow-hidden"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="font-medium text-sm hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-stone text-sm">{item.product.color}</p>
                        <p className="text-stone text-sm">Size: {item.size}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border border-cream-dark">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="p-2 hover:bg-cream transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="p-2 hover:bg-cream transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-medium">€{item.product.price * item.quantity}</p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="self-start p-1 hover:bg-cream rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-cream-dark p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-display text-xl">€{totalPrice}</span>
                  </div>
                  <p className="text-xs text-stone">
                    Tax included and shipping calculated at checkout
                  </p>
                  <button className="w-full py-4 bg-charcoal text-cream text-sm tracking-wide hover:bg-cherry transition-colors">
                    Checkout
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full py-3 border border-charcoal text-sm tracking-wide hover:bg-cream transition-colors"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


