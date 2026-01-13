import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid2X2, Grid3X3, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

type GridSize = 2 | 3 | 4;
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export default function Shop() {
  const [gridSize, setGridSize] = useState<GridSize>(4);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Keep original order (newest first)
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <main className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl lg:text-4xl mb-2"
        >
          Shop All
        </motion.h1>
        <p className="text-stone">{filteredProducts.length} products</p>
      </div>

      {/* Controls */}
      <div className="sticky top-16 lg:top-20 z-40 bg-off-white border-b border-cream-dark">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
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

            {/* Filter & Sort */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-cream-dark hover:bg-cream transition-colors"
              >
                <SlidersHorizontal size={16} />
                <span className="text-sm">Filter</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-transparent border border-cream-dark text-sm focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 pb-2 border-t border-cream-dark mt-4"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    !selectedCategory
                      ? 'bg-charcoal text-cream border-charcoal'
                      : 'border-cream-dark hover:bg-cream'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedCategory === category.slug
                        ? 'bg-charcoal text-cream border-charcoal'
                        : 'border-cream-dark hover:bg-cream'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Active Filters */}
          {selectedCategory && (
            <div className="flex items-center gap-2 pt-4">
              <span className="text-sm text-stone">Active filters:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 px-3 py-1 bg-cream text-sm rounded-full"
              >
                {categories.find(c => c.slug === selectedCategory)?.name}
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        <div className={`grid gap-4 lg:gap-6 ${
          gridSize === 2 ? 'grid-cols-2' :
          gridSize === 3 ? 'grid-cols-2 lg:grid-cols-3' :
          'grid-cols-2 lg:grid-cols-4'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone text-lg">No products found</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-sm underline hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


