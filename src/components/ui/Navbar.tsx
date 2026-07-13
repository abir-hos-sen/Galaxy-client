'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Rocket, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0E23]/80 backdrop-blur-md border-b border-[#6C5CE7]/20 py-4 shadow-lg shadow-[#000]/30'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Rocket className="h-7 w-7 text-[#6C5CE7] group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-wider text-white">
            GALAXY<span className="text-[#FFC947]">EXPLORER</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors duration-200 hover:text-[#6C5CE7] text-sm ${
                isActive(link.href) ? 'text-[#6C5CE7] font-semibold' : 'text-[#94A3B8]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/items/add"
                className={`text-xs px-4 py-2 rounded-full border border-[#6C5CE7] transition-all hover:bg-[#6C5CE7] hover:text-white ${
                  pathname === '/items/add' ? 'bg-[#6C5CE7] text-white' : 'text-[#6C5CE7]'
                }`}
              >
                Add Entry
              </Link>
              <Link
                href="/items/manage"
                className={`text-xs px-4 py-2 rounded-full border border-[#94A3B8] transition-all hover:bg-[#94A3B8] hover:text-[#0B0E23] ${
                  pathname === '/items/manage' ? 'bg-[#94A3B8] text-[#0B0E23]' : 'text-[#94A3B8]'
                }`}
              >
                Manage
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center text-xs text-[#FFC947] hover:text-[#FFC947]/80 font-bold"
                  title="Admin Dashboard"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Link>
              )}
              <div className="flex items-center space-x-2 border-l border-slate-700 pl-4">
                <Link href="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <img
                    src={user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-[#6C5CE7] bg-slate-800"
                  />
                  <span className="text-sm font-semibold text-white hidden lg:inline max-w-[100px] truncate" title={user.name}>
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-full hover:bg-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/85 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(108,92,231,0.5)]"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#0B0E23] border-l border-slate-800 z-40 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-lg transition-colors py-2 ${
                  isActive(link.href) ? 'text-[#6C5CE7] font-semibold' : 'text-[#94A3B8]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col space-y-4">
            {user ? (
              <>
                <Link href="/profile" onClick={handleLinkClick} className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
                  <img
                    src={user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border border-[#6C5CE7]"
                  />
                  <div className="truncate">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </Link>

                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={handleLinkClick}
                    className="flex items-center text-sm text-[#FFC947] py-2 font-bold"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Link>
                )}

                <Link
                  href="/profile"
                  onClick={handleLinkClick}
                  className="bg-slate-800 text-center text-slate-300 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700"
                >
                  Profile Settings
                </Link>

                <Link
                  href="/items/add"
                  onClick={handleLinkClick}
                  className="bg-[#6C5CE7] text-center text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#6C5CE7]/90"
                >
                  Add Space Entry
                </Link>
                <Link
                  href="/items/manage"
                  onClick={handleLinkClick}
                  className="bg-slate-800 text-center text-slate-300 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700"
                >
                  Manage Entries
                </Link>
                <button
                  onClick={() => {
                    handleLinkClick();
                    logout();
                  }}
                  className="flex items-center justify-center space-x-2 text-rose-500 border border-rose-500/20 py-2 rounded-xl text-sm font-semibold hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="text-center border border-slate-700 text-slate-300 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className="text-center bg-[#6C5CE7] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6C5CE7]/90 shadow-[0_0_15px_rgba(108,92,231,0.3)]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
