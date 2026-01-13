import { Link } from 'react-router-dom';
import { Instagram, Music2 } from 'lucide-react';

const footerLinks = {
  about: [
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'Our story', href: '/story' },
    { name: 'Care guide', href: '/care' },
  ],
  service: [
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Contact', href: '/contact' },
    { name: 'Stores', href: '/stores' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Careers', href: '/careers' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy policy', href: '/privacy' },
    { name: 'Cookie policy', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter */}
      <div className="border-b border-stone/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl lg:text-3xl mb-4">
              Join our community
            </h3>
            <p className="text-stone text-sm mb-6">
              Subscribe to receive exclusive offers, styling tips, and new arrivals.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-b border-stone focus:border-cream py-2 text-sm placeholder:text-stone focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-cream text-charcoal text-sm tracking-wide hover:bg-biscuit transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-stone">About Merrachi</h4>
            <ul className="space-y-3">
              {footerLinks.about.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-biscuit transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-stone">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-biscuit transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-stone">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-biscuit transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-stone">Visit Us</h4>
            <div className="space-y-6">
              <div>
                <p className="font-medium text-sm mb-1">Amsterdam Flagship</p>
                <p className="text-sm text-stone">
                  Koningsplein 3<br />
                  1017 BB Amsterdam<br />
                  Netherlands
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Antwerp Store</p>
                <p className="text-sm text-stone">
                  Huidevettersstraat 16<br />
                  2000 Antwerp<br />
                  Belgium
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-stone/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone">© Merrachi 2026</p>
            
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-biscuit transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-biscuit transition-colors"
              >
                <Music2 size={20} />
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm text-stone">
              <span>Shipping to: Netherlands</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


