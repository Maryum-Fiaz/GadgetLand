import { useState } from 'react';
import { ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import Container from '../Container';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
import SearchBar from './SearchBar';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-100/90 border-b border-zinc-200/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-22 items-center justify-between px-2">
          
          {/* Logo Frame */}
          <div className="flex items-center shrink-0">
            <Link to='/'>
            <img 
              src={logo} 
              alt="GadgetLand Logo" 
              className="h-22 w-auto object-contain" 
            />
            </Link>
          </div>

          {/* 💻 Desktop Navigation Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-semibold text-zinc-600">
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Home</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Products</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Top Selling</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">About Us</li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            
            {/* Expandable Search Input Container */}
            
              <SearchBar />
            

            
            <button className="p-2 text-zinc-600 transition-all hover:scale-110 hover:text-mauve-400 cursor-pointer">
              <ShoppingCart size={20} strokeWidth={2.2} />
            </button>

            
            <button className="flex items-center gap-2 bg-mauve-500 hover:bg-mauve-600 text-white font-sans text-xs uppercase font-bold tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer ml-2">
              <LogIn size={14} strokeWidth={2.5} />
              <span>Login</span>
            </button>
          </div>

          {/* 📱 Mobile Menu Trigger Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-700 hover:text-mauve-500 transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </nav>
      </Container>

      {/* 📱 Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-200 shadow-xl px-6 py-6 transition-all z-40">
          
          <div className="relative flex items-center mb-6">
            <SearchBar />
          </div>

          <ul className="flex flex-col gap-5 font-sans font-semibold text-zinc-700">
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Home</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Products</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Top Selling</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>About</li>
          </ul>
          
          {/* Mobile Cart & Action Controls */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-100">
            <button className="flex items-center gap-2 text-zinc-600 hover:text-mauve-500 font-medium text-sm cursor-pointer">
              <ShoppingCart size={20} />
              <span>View Cart</span>
            </button>
            
            <button className="flex items-center gap-2 bg-mauve-500 text-white font-sans text-xs uppercase font-bold tracking-widest px-5 py-2.5 rounded-xl cursor-pointer">
              <LogIn size={14} />
              <span>Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;