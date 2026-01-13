import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid2X2, Grid3X3 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, categories } from '../data/products';

type GridSize = 2 | 3 | 4;

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [gridSize, setGridSize] = useState<GridSize>(4);
  
  const category = categories.find(c => c.slug === slug);
  const products = useMemo(() => getProductsByCategory(slug || ''), [slug]);

  if (!category) {
    return (
      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 text-center">
          <h1 className="font-display text-2xl mb-4">Category not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 lg:px-12 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cream"
          >
            <h1 className="font-display text-4xl lg:text-6xl mb-2">{category.name}</h1>
            <p className="text-cream/80">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-16 lg:top-20 z-40 bg-off-white border-b border-cream-dark">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone">{products.length} products</p>
            
            {/* Grid Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone mr-2 hidden lg:inline">Grid</span>
              <button
                onClick={() => setGridSize(2)}
                className={`p-2 rounded ${gridSize === 2 ? 'bg-cream' : 'hover:bg-cream'} transition-colors`}
              >
                <Grid2X2 size={18} />
              </button>
              <button
                onClick={() => setGridSize(3)}
                className={`p-2 rounded hidden lg:block ${gridSize === 3 ? 'bg-cream' : 'hover:bg-cream'} transition-colors`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridSize(4)}
                className={`p-2 rounded hidden lg:block ${gridSize === 4 ? 'bg-cream' : 'hover:bg-cream'} transition-colors`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="4" height="4" />
                  <rect x="10" y="3" width="4" height="4" />
                  <rect x="17" y="3" width="4" height="4" />
                  <rect x="3" y="10" width="4" height="4" />
                  <rect x="10" y="10" width="4" height="4" />
                  <rect x="17" y="10" width="4" height="4" />
                  <rect x="3" y="17" width="4" height="4" />
                  <rect x="10" y="17" width="4" height="4" />
                  <rect x="17" y="17" width="4" height="4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        {products.length > 0 ? (
          <div className={`grid gap-4 lg:gap-6 ${
            gridSize === 2 ? 'grid-cols-2' :
            gridSize === 3 ? 'grid-cols-2 lg:grid-cols-3' :
            'grid-cols-2 lg:grid-cols-4'
          }`}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-stone text-lg">No products in this category yet</p>
          </div>
        )}
      </div>
    </main>
  );
}


