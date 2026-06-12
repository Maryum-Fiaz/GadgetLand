
import MetaData from '../layout/MetaData'
import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const [register, {isLoading, error, data}] = useRegisterMutation();

    const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const registerData = {
            name,
            email,
            password
        }

        register(registerData)

    }
  return (
    <>
  <MetaData title={"Register"} />
  
  {/* Centered responsive container wrapper */}
  <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 font-sans selection:bg-mauve-100">
    <div className="w-full max-w-110 px-2">
      
      {/* Main Premium Card View */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
      >
        {/* Card Header Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800">Create Account</h2>
          <p className="text-xs font-medium text-zinc-400">Join our premium gadget platform today</p>
        </div>

        {/* Name Field Block */}
        <div className="space-y-1.5">
          <label htmlFor="name_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Full Name
          </label>
          <input
            type="text"
            id="name_field"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
            required
          />
        </div>

        {/* Email Field Block */}
        <div className="space-y-1.5">
          <label htmlFor="email_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            id="email_field"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
            required
          />
        </div>

        {/* Password Field Block */}
        <div className="space-y-1.5">
          <label htmlFor="password_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Password
          </label>
          <input
            type="password"
            id="password_field"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
            required
          />
        </div>

        {/* Premium Action Button */}
        <button
          id="register_button"
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
        >
          {isLoading ? "Creating Account..." : "REGISTER"}
        </button>

        {/* Form Footer Redirect Block */}
        <div className="pt-2 border-t border-zinc-100 text-center">
          <p className="text-xs font-medium text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login" 
              className="font-bold text-zinc-600 hover:text-mauve-500 transition-colors ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>

    </div>
  </div>
</>
  )
}

export default Register