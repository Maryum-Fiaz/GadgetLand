import { useEffect, useState } from 'react';
import { MetaData } from '../../components/index'
import { countries } from 'countries-list'
import { saveShippingInfo } from '../../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckoutSteps from './CheckoutSteps';

function Shipping() {

    const countriesList = Object.values(countries)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [country, setCountry] = useState('')

    const { shippingInfo } = useSelector(state => state.cart)

    useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
    }
  }, [shippingInfo]);


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo({ address, city, phoneNo, zipCode, country }));
        navigate('/confirm_order')
    }

  return (
    <>
  <MetaData title={"Shipping Info"} />

  {/* Page Container */}
  <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased selection:bg-mauve-100 selection:text-mauve-900 px-4 sm:px-6 py-10 md:py-16">
    <div className="max-w-xl mx-auto space-y-10">
      
      {/* ── CHECKOUT STEPS TIMELINE WRAPPER ── */}
      <div className="w-full overflow-x-auto pb-2">
        <CheckoutSteps shipping />
      </div>

      {/* ── FORM ── */}
      <div className="bg-white border border-zinc-200/80 rounded-[2rem] p-6 sm:p-10 shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Form Header */}
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 font-heading">
              Shipping Info
            </h2>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">
              Destination Particulars
            </p>
          </div>

          <div className="border-b border-zinc-100 pt-1" />

          {/* Input Blocks */}
          <div className="space-y-4">
            
            {/* Address Input Field */}
            <div className="space-y-1.5">
              <label htmlFor="address_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Street Address
              </label>
              <input
                type="text"
                id="address_field"
                className="w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-zinc-800 focus:ring-4 focus:ring-zinc-100 placeholder:text-zinc-400"
                name="address"
                placeholder="123 Architectural Avenue"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City Input Field */}
              <div className="space-y-1.5">
                <label htmlFor="city_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  City
                </label>
                <input
                  type="text"
                  id="city_field"
                  className="w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-zinc-800 focus:ring-4 focus:ring-zinc-100"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              {/* Zip Code Input Field */}
              <div className="space-y-1.5">
                <label htmlFor="zip_code_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Zip Code
                </label>
                <input
                  type="number"
                  id="zip_code_field"
                  className="w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-zinc-800 focus:ring-4 focus:ring-zinc-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Number Input Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-zinc-800 focus:ring-4 focus:ring-zinc-100"
                name="phoneNo"
                placeholder="+92 XXX XXXXXXX"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            {/* Country Dropdown Select */}
            <div className="space-y-1.5">
              <label htmlFor="country_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Country Location
              </label>
              <div className="relative w-full">
                <select
                  id="country_field"
                  className="w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-zinc-800 focus:ring-4 focus:ring-zinc-100 appearance-none cursor-pointer pr-10"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countriesList?.map((country) => (
                    <option key={country?.name} value={country?.name} className="text-zinc-800 bg-white">
                      {country?.name}
                    </option>
                  ))}
                </select>
                {/* Custom Dropdown Arrow*/}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4">
            {/* Submission Action Dispatch Button Trigger */}
            <button
              id="shipping_btn"
              type="submit"
              className="w-full h-12 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              Continue to Payment
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</>
  )
}

export default Shipping