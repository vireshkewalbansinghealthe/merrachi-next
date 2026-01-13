import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Fall / Winter \'25', href: '/collection/fw25' },
  { name: 'Shop all', href: '/shop' },
  { name: 'Scarves', href: '/category/scarves' },
  { name: 'Essentials', href: '/essentials' },
];

export default function Header() {
  const { openCart, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHomePage ? 'bg-transparent' : 'bg-off-white/95 backdrop-blur-sm border-b border-cream-dark'
      }`}>
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20">
            {/* Left Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${
                    isHomePage ? 'text-cream' : 'text-charcoal'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 -ml-2 ${isHomePage ? 'text-cream' : 'text-charcoal'}`}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className={`absolute left-1/2 -translate-x-1/2 font-display text-2xl lg:text-3xl tracking-display font-normal ${
                isHomePage ? 'text-cream' : 'text-charcoal'
              }`}
            >
              MERRACHI
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`hidden lg:block text-sm tracking-wide hover:opacity-60 transition-opacity ${
                  isHomePage ? 'text-cream' : 'text-charcoal'
                }`}
              >
                Search
              </button>
              <Link
                to="/world"
                className={`hidden lg:block text-sm tracking-wide hover:opacity-60 transition-opacity ${
                  isHomePage ? 'text-cream' : 'text-charcoal'
                }`}
              >
                MERRACHI World
              </Link>
              <Link
                to="/account"
                className={`hidden lg:block text-sm tracking-wide hover:opacity-60 transition-opacity ${
                  isHomePage ? 'text-cream' : 'text-charcoal'
                }`}
              >
                Account
              </Link>
              <button
                onClick={openCart}
                className={`flex items-center gap-1 text-sm tracking-wide hover:opacity-60 transition-opacity ${
                  isHomePage ? 'text-cream' : 'text-charcoal'
                }`}
              >
                <span className="hidden lg:inline">Cart</span>
                <span>({totalItems})</span>
              </button>
              
              {/* Mobile icons */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`lg:hidden p-2 ${isHomePage ? 'text-cream' : 'text-charcoal'}`}
              >
                <Search size={20} />
              </button>
              <button
                onClick={openCart}
                className={`lg:hidden p-2 -mr-2 relative ${isHomePage ? 'text-cream' : 'text-charcoal'}`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cherry text-cream text-xs flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-off-white"
          >
            <div className="flex items-center justify-between p-6">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-2xl tracking-display"
              >
                MERRACHI
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="px-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-2xl font-display border-b border-cream-dark"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 space-y-4">
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg"
                >
                  <User size={20} />
                  Account
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-off-white"
          >
            <div className="max-w-4xl mx-auto px-6 py-20">
              <div className="flex items-center justify-end mb-12">
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  className="w-full bg-transparent border-b-2 border-charcoal py-4 text-3xl lg:text-5xl font-display placeholder:text-stone focus:outline-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12"
              >
                <p className="text-sm text-stone mb-4">Popular Searches</p>
                <div className="flex flex-wrap gap-3">
                  {['Scarves', 'Abayas', 'New Arrivals', 'Dresses', 'Hijabs'].map(term => (
                    <Link
                      key={term}
                      to={`/search?q=${term}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-2 bg-cream rounded-full text-sm hover:bg-cream-dark transition-colors"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


