import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import TryMeModal from '../components/TryMeModal';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isTryMeOpen, setIsTryMeOpen] = useState(false);

  if (!product) {
    return (
      <main className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-sm underline">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const completeTheLookProducts = product.completeTheLook
    ? product.completeTheLook.map(id => getProductById(id)).filter(Boolean) as Product[]
    : [];

  const handleAddToCart = () => {
    if (product.isSoldOut) return;
    
    const size = selectedSize || (product.sizes.length === 1 ? product.sizes[0] : null);
    
    if (!size && product.sizes.length > 1) {
      // Scroll to size selection
      document.getElementById('size-selection')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    addItem(product, size!);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <main className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
          <span>/</span>
          <Link 
            to={`/category/${product.category}`} 
            className="hover:text-charcoal transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-cream overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-off-white/80 hover:bg-off-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-off-white/80 hover:bg-off-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Status Badge */}
              {(product.isNew || product.isRestocked || product.isSoldOut) && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 text-sm tracking-wide ${
                    product.isSoldOut 
                      ? 'bg-stone text-cream' 
                      : 'bg-off-white text-charcoal'
                  }`}>
                    {product.isSoldOut ? 'Sold Out' : product.isNew ? 'New' : 'Restocked'}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-24 bg-cream overflow-hidden transition-opacity ${
                      currentImageIndex === index ? 'opacity-100 ring-1 ring-charcoal' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title & Price */}
              <h1 className="font-display text-3xl lg:text-4xl mb-2">{product.name}</h1>
              <p className="text-stone mb-4">{product.color}</p>
              <p className="text-2xl font-display mb-4">
                {product.isSoldOut ? 'Sold Out' : `€${product.price}`}
              </p>

              {/* Model Info */}
              {product.modelInfo && (
                <p className="text-sm text-stone mb-8 italic">
                  {product.modelInfo}
                </p>
              )}

              {/* Size Selection */}
              {!product.isSoldOut && product.sizes.length > 1 && (
                <div id="size-selection" className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">Select Size</p>
                    <button className="text-sm text-stone underline hover:no-underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] px-4 py-3 text-sm border transition-colors ${
                          selectedSize === size
                            ? 'bg-charcoal text-cream border-charcoal'
                            : 'border-cream-dark hover:border-charcoal'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.isSoldOut}
                    className={`flex-1 py-4 text-sm tracking-wide transition-colors flex items-center justify-center gap-2 ${
                      product.isSoldOut
                        ? 'bg-stone text-cream cursor-not-allowed'
                        : addedToCart
                        ? 'bg-olive text-cream'
                        : 'bg-charcoal text-cream hover:bg-cherry'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={18} />
                        Added to Cart
                      </>
                    ) : product.isSoldOut ? (
                      'Sold Out'
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 border transition-colors ${
                      isWishlisted
                        ? 'bg-cherry text-cream border-cherry'
                        : 'border-cream-dark hover:border-charcoal'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-4 border border-cream-dark hover:border-charcoal transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                
                {/* Try Me Button */}
                {!product.isSoldOut && (
                  <button
                    onClick={() => setIsTryMeOpen(true)}
                    className="w-full py-4 border-2 border-cherry text-cherry text-sm tracking-widest uppercase font-medium hover:bg-cherry hover:text-cream transition-all flex items-center justify-center gap-3 group"
                  >
                    <Sparkles size={18} className="group-hover:animate-pulse" />
                    Try On (MERRACHI AI)
                  </button>
                )}
              </div>

              {/* Try Me Modal */}
              <TryMeModal 
                isOpen={isTryMeOpen} 
                onClose={() => setIsTryMeOpen(false)}
                productName={product.name}
                productImage={product.images[0]}
              />

              {/* Description & Tabs */}
              <div className="mb-8 pt-8 border-t border-cream-dark">
                <div className="flex gap-6 mb-6 border-b border-cream-dark">
                  {['Description', 'Fabric', 'Sizing', 'Shipping and returns'].map((tab) => (
                    <button
                      key={tab}
                      className="pb-2 text-xs tracking-widest uppercase font-medium border-b-2 border-transparent hover:border-charcoal transition-all"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <p className="text-stone text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Material */}
              {product.material && (
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Material</h3>
                  <p className="text-stone">{product.material}</p>
                </div>
              )}

              {/* Features */}
              <div className="space-y-4 py-6 border-t border-cream-dark">
                <div className="flex items-center gap-3 text-sm">
                  <Truck size={18} className="text-stone" />
                  <span>Free shipping on orders over €100</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw size={18} className="text-stone" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>

              {/* Complete the look */}
              {completeTheLookProducts.length > 0 && (
                <div className="py-8 border-t border-cream-dark">
                  <h3 className="font-medium mb-6">Complete the look</h3>
                  <div className="space-y-6">
                    {completeTheLookProducts.map(lookProduct => (
                      <div key={lookProduct.id} className="flex gap-4 items-center group">
                        <Link to={`/product/${lookProduct.id}`} className="w-20 h-24 bg-cream flex-shrink-0">
                          <img 
                            src={lookProduct.images[0]} 
                            className="w-full h-full object-cover" 
                            alt={lookProduct.name} 
                          />
                        </Link>
                        <div className="flex-1">
                          <Link 
                            to={`/product/${lookProduct.id}`} 
                            className="text-sm font-medium hover:underline"
                          >
                            {lookProduct.name}
                          </Link>
                          <p className="text-xs text-stone">{lookProduct.color}</p>
                          <div className="flex gap-1 mt-2">
                            {lookProduct.sizes.map(size => (
                              <span key={size} className="text-[10px] px-1 border border-cream-dark uppercase">
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-medium">€{lookProduct.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Variants */}
              <div className="py-6 border-t border-cream-dark">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-charcoal"
                    style={{ backgroundColor: product.colorHex }}
                    title={product.color}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-2xl lg:text-3xl mb-8">You might also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

