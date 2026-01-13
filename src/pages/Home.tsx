import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, categories } from '../data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=80"
            alt="Fall Winter 2025 Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cream"
          >
            <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl mb-4 tracking-wide">
              Re-stock FW '25
            </h1>
            <Link
              to="/collection/fw25"
              className="inline-flex items-center gap-2 text-sm tracking-wide border-b border-cream pb-1 hover:opacity-70 transition-opacity"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="flex gap-4 pb-6 overflow-x-auto hide-scrollbar">
              <Link
                to="/category/scarves"
                className="flex-shrink-0 px-6 py-2 bg-off-white/90 backdrop-blur-sm text-charcoal text-sm tracking-wide hover:bg-cream transition-colors"
              >
                Scarves
              </Link>
              <Link
                to="/category/outerwear"
                className="flex-shrink-0 px-6 py-2 bg-off-white/90 backdrop-blur-sm text-charcoal text-sm tracking-wide hover:bg-cream transition-colors"
              >
                Outerwear
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* City Edit Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <h2 className="font-display text-3xl lg:text-5xl mb-6">
              Introducing: The City Edit
            </h2>
            <p className="text-stone lg:text-lg leading-relaxed">
              Finally, layering season has arrived. This Fall, we bring a collection designed 
              to take you through every moment of the season. Each piece is made to mix, match, 
              and build looks that feel confident and complete.
            </p>
          </motion.div>
          
          <Link
            to="/collection/city-edit"
            className="inline-flex items-center gap-2 text-sm tracking-wide border-b border-charcoal pb-1 hover:opacity-70 transition-opacity"
          >
            Discover
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <h2 className="font-display text-2xl lg:text-3xl">Curated Selection</h2>
            <Link
              to="/shop"
              className="text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook CTA */}
      <section className="relative h-[80vh] min-h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80"
            alt="The City Edit Lookbook"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-cream"
          >
            <h2 className="font-display text-4xl lg:text-6xl mb-6">The City Edit</h2>
            <Link
              to="/lookbook"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cream text-charcoal text-sm tracking-wide hover:bg-off-white transition-colors"
            >
              Shop Lookbook
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Signature Scarves */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl lg:text-4xl text-center mb-12"
          >
            Our Signature Scarves
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: 'Premium Jersey', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80' },
              { name: 'Liquid Jersey', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80' },
              { name: 'Bamboo Jersey', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80' },
              { name: 'Weightless Woven', image: 'https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?w=600&q=80' },
            ].map((scarf, index) => (
              <motion.div
                key={scarf.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/category/scarves?type=${scarf.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="aspect-square bg-stone/20 overflow-hidden mb-3 group">
                    <img
                      src={scarf.image}
                      alt={scarf.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-center text-sm tracking-wide">{scarf.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl lg:text-4xl text-center mb-12"
          >
            Shop by Category
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/category/${category.slug}`} className="block group">
                  <div className="aspect-[4/5] bg-cream overflow-hidden mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl">{category.name}</h3>
                  <p className="text-sm text-stone mt-1">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="py-16 lg:py-24 bg-charcoal text-cream">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Amsterdam */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl lg:text-3xl mb-4">
                Amsterdam Flagship Store
              </h3>
              <p className="text-stone mb-4">
                Koningsplein 3<br />
                1017 BB Amsterdam<br />
                Netherlands
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:no-underline"
              >
                View on Maps
              </a>
              <div className="mt-6 text-sm text-stone">
                <p>Monday 12:00 - 18:00</p>
                <p>Tuesday – Friday 11:00 - 18:00</p>
                <p>Saturday 10:00 – 18:00</p>
                <p>Sunday 12:00 – 18:00</p>
              </div>
            </motion.div>

            {/* Antwerp */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl lg:text-3xl mb-4">
                Antwerp Store
              </h3>
              <p className="text-stone mb-4">
                Huidevettersstraat 16<br />
                2000 Antwerp<br />
                Belgium
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:no-underline"
              >
                View on Maps
              </a>
              <div className="mt-6 text-sm text-stone">
                <p>Monday – Friday 12:00 – 18:00</p>
                <p>Saturday 10:00 – 18:00</p>
                <p>Sunday 11:00 – 18:00*</p>
                <p className="text-xs mt-2">*Only first Sunday of the month</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}


