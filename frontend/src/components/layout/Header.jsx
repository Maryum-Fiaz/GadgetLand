import { useState } from 'react';
import { Search, ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import Container from '../Container';

// TODO: set it for medium screens like tabs

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-100/90 border-b border-zinc-200/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between px-2">
          
          {/* Logo Frame */}
          <div className="flex items-center shrink-0">
            <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              GadgetLand
            </span>
          </div>

          {/* 💻 Desktop Navigation Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-semibold text-zinc-600">
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Products</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Top Selling</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">Deals</li>
            <li className="cursor-pointer transition-colors hover:text-mauve-400">New Arrivals</li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            
            {/* Expandable Search Input Container */}
            <div className="relative flex items-center group h-10">
              <input
                type="text"
                placeholder="Search premium tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-10 group-hover:w-56 focus:w-56 h-full pl-10 pr-4 rounded-xl border border-transparent bg-transparent group-hover:bg-white focus:bg-white group-hover:border-zinc-200 focus:border-zinc-200 font-sans text-xs font-medium outline-none transition-all duration-300 ease-in-out cursor-pointer group-hover:cursor-text focus:cursor-text"
              />
              <div className="absolute left-3 pointer-events-none text-zinc-600 group-hover:text-mauve-500 focus:text-mauve-500 transition-colors">
                <Search size={18} strokeWidth={2.2} />
              </div>
            </div>

            
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
            <input
              type="text"
              placeholder="Search premium tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 font-sans text-sm outline-none focus:border-[rgba(139,123,171,1)] focus:bg-white transition-all"
            />
            <div className="absolute left-3.5 text-zinc-400">
              <Search size={18} />
            </div>
          </div>

          <ul className="flex flex-col gap-5 font-sans font-semibold text-zinc-700">
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Products</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Top Selling</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>Deals</li>
            <li className="cursor-pointer hover:text-mauve-400 py-1" onClick={() => setIsMenuOpen(false)}>New Arrivals</li>
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