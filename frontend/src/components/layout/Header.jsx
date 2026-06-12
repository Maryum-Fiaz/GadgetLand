import { useState } from 'react';
import { ShoppingCart, LogIn, Menu, X, User } from 'lucide-react';
import Container from '../Container';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import SearchBar from './SearchBar';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';


// ─── Nav links data ───────────────────────────────────────────────────────────
// Add/remove links here — renders in both desktop and mobile automatically
const NAV_LINKS = [
  { label: 'Home',        to: '/'           },
  { label: 'Products',    to: '/products'   },
  { label: 'Top Selling', to: '/top-selling'},
  { label: 'About Us',    to: '/about'      },
];


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  const { isLoading } = useGetMeQuery();
  console.log('loading -> ', isLoading);
  

  const { user } = useSelector(state => state.auth);
  

  // ─── Handlers — write once, used everywhere ────────────────────────────────
  const handleCart  = () => { /* cart logic here */ };
  const handleLogin = () => { 
    navigate('/login')
  };

  


  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-100/90 border-b border-zinc-200/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between px-2">

          {/* ── Logo ── */}
          <div className="shrink-0">
            <Link to='/'>
              <img src={logo} alt="GadgetLand Logo" className="h-14 w-auto object-contain" />
            </Link>
          </div>

          {/* ── Desktop nav links — hidden on mobile ── */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-semibold text-zinc-600">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="cursor-pointer transition-colors hover:text-mauve-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right side actions — always visible on ALL screen sizes ── */}
          {/*    Write the handler once above, it works on both mobile & desktop */}
          <div className="flex items-center gap-1 md:gap-3">

            {/* Search — has its own internal open/close logic */}
            <SearchBar />

            {/* Cart — one button, one handler, visible everywhere */}
            <button
              onClick={handleCart}
              className="p-2 text-zinc-600 transition-all hover:scale-110 hover:text-mauve-400 cursor-pointer"
            >
              <ShoppingCart size={20} strokeWidth={2.2} />
            </button>

            {/* Login — one button, one handler, visible everywhere */}
            {user ? (
              <div className="relative font-sans">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center relative gap-2 bg-mauve-500 hover:bg-mauve-600 text-white font-sans text-xs uppercase font-bold tracking-widest px-4 md:px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <User size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">{user?.name}</span>
            </button>
            {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-zinc-50 border border-zinc-200/80 rounded-xl p-1.5 shadow-md z-50 animate-in fade-in slide-in-from-top-1 duration-100">
        
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 text-xs font-semibold text-zinc-600 hover:text-mauve-500 hover:bg-zinc-100/50 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        )}

        <Link
          to="/me/orders"
          onClick={() => setIsOpen(false)}
          className="block px-3 py-2.5 text-xs font-semibold text-zinc-600 hover:text-mauve-500 hover:bg-zinc-100/50 rounded-lg transition-colors"
        >
          My Orders
        </Link>

        <Link
          to="/me/profile"
          onClick={() => setIsOpen(false)}
          className="block px-3 py-2.5 text-xs font-semibold text-zinc-600 hover:text-mauve-500 hover:bg-zinc-100/50 rounded-lg transition-colors"
        >
          Profile Settings
        </Link>

        {/* Premium Divider Separator */}
        <div className="my-1 border-t border-zinc-200/60" />

        {/* Logout Action Trigger */}
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            
          }}
          className="block px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          Log Out
        </Link>
      </div>
    )}
  </div>
              
            ):(
              <button
              onClick={handleLogin}
              className="flex items-center gap-2 bg-mauve-500 hover:bg-mauve-600 text-white font-sans text-xs uppercase font-bold tracking-widest px-4 md:px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <LogIn size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Login</span>
            </button>
            )}

            {/* Hamburger — only visible on mobile, toggles nav links dropdown */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-700 hover:text-mauve-500 transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </nav>
      </Container>

      {/* ── Mobile nav links dropdown ── */}
      {/*    Only the nav links collapse — Cart & Login stay in the header above */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-200 shadow-xl px-6 py-6 z-40">
          <ul className="flex flex-col gap-1 font-sans font-semibold text-zinc-700">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block cursor-pointer hover:text-mauve-400 py-3 border-b border-zinc-100 last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;