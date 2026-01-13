import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.isSoldOut) return;
    
    if (product.sizes.length === 1) {
      addItem(product, product.sizes[0]);
    } else if (selectedSize) {
      addItem(product, selectedSize);
      setSelectedSize(null);
      setShowSizes(false);
    } else {
      setShowSizes(true);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    addItem(product, size);
    setSelectedSize(null);
    setShowSizes(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-3">
          {/* Status Badge */}
          {(product.isNew || product.isRestocked || product.isSoldOut) && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2 py-1 text-xs tracking-wide ${
                product.isSoldOut 
                  ? 'bg-stone text-cream' 
                  : 'bg-off-white text-charcoal'
              }`}>
                {product.isSoldOut ? 'Sold Out' : product.isNew ? 'new' : 'restocked'}
              </span>
            </div>
          )}

          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Quick Add Button */}
          {!product.isSoldOut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-3 bottom-3"
            >
              {showSizes ? (
                <div className="bg-off-white p-3 space-y-2">
                  <p className="text-xs text-stone text-center">Choose your size</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSizeSelect(size);
                        }}
                        className="px-3 py-1.5 text-xs border border-charcoal hover:bg-charcoal hover:text-cream transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-off-white text-charcoal text-sm tracking-wide hover:bg-charcoal hover:text-cream transition-colors"
                >
                  Add to cart
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-sm">
              {product.isSoldOut ? 'Sold Out' : `€${product.price}`}
            </p>
          </div>
          <p className="text-sm text-stone">{product.color}</p>
          
          {/* Size pills on hover */}
          {!product.isSoldOut && product.sizes.length > 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? 'auto' : 0 
              }}
              className="flex flex-wrap gap-1 pt-1 overflow-hidden"
            >
              {product.sizes.map(size => (
                <span
                  key={size}
                  className="text-xs text-stone"
                >
                  {size}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

