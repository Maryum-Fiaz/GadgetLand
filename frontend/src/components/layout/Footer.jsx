import Container from '../Container';

// 🌐 Inline SVG Brand Icons
const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9"/></svg>
);

function Footer() {
  return (
    <footer className="w-full bg-zinc-100 border-t border-zinc-200/80 pt-16 pb-8 text-zinc-600 font-sans">
      <Container>
        

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-12 border-b border-zinc-200/60">
          
          {/* Brand Frame & Social Links */}
          <div className="flex flex-col gap-4">
            <span className="font-heading text-2xl font-black tracking-tight text-zinc-900">
              GadgetLand
            </span>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Your premium full-stack storefront for high-end tech, accessories, and audio gear architecture.
            </p>
            <div className="flex items-center gap-4 mt-1 text-zinc-500">
              <a href="#" className="hover:text-mauve-500 transition-colors"><FacebookIcon size={18} /></a>
              <a href="#" className="hover:text-mauve-500 transition-colors"><TwitterIcon size={18} /></a>
              <a href="#" className="hover:text-mauve-500 transition-colors"><InstagramIcon size={18} /></a>
              <a href="#" className="hover:text-mauve-500 transition-colors"><YoutubeIcon size={18} /></a>
            </div>
          </div>

          {/*  Shop / Product Queries */}
          <div className="flex flex-col gap-4 sm:pl-8">
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Shop</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-mauve-500 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-mauve-500 transition-colors">Top Selling</a></li>
              <li><a href="#" className="hover:text-mauve-500 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-mauve-500 transition-colors">Deals</a></li>
            </ul>
          </div>

          {/* Static Pages */}
          <div className="flex flex-col gap-4 sm:pl-8">
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Information</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-mauve-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-mauve-500 transition-colors">Account Profile</a></li>
              <li><a href="#" className="hover:text-mauve-500 transition-colors">Order Tracking</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Meta Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-zinc-400 font-medium gap-4">
          <span>&copy; {new Date().getFullYear()} GadgetLand. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </Container>
    </footer>
  );
}

export default Footer;