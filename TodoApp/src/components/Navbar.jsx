import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/30" 
          : "bg-transparent"
        }`}>

        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          
          {/* Logo */}
          <div className="font-extrabold text-2xl text-violet-700 cursor-pointer tracking-wide hover:scale-105 transition-transform duration-200">
            ✨ UTask
          </div>

          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-8 font-semibold text-gray-700'>
            <li className='cursor-pointer relative group'>
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className='cursor-pointer relative group'>
              Your Task
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26}/> : <Menu size={26}/>}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg px-6 py-4 space-y-4">
            <div className="cursor-pointer hover:text-violet-600">Home</div>
            <div className="cursor-pointer hover:text-violet-600">Your Task</div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar
