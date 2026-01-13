import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/collection/:slug" element={<Shop />} />
              <Route path="/essentials" element={<Shop />} />
              <Route path="/lookbook" element={<Shop />} />
              <Route path="/world" element={<Shop />} />
              <Route path="/account" element={<Shop />} />
              {/* Fallback to Shop for any unmatched routes */}
              <Route path="*" element={<Shop />} />
            </Routes>
      </div>
          <Footer />
          <CartDrawer />
      </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
