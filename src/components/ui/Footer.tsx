import React from 'react';
import Link from 'next/link';
import { Rocket, Code2, MessageCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070914] border-t border-slate-900 text-[#94A3B8] pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-[#6C5CE7]" />
            <span className="font-display font-bold text-lg tracking-wider text-white">
              GALAXY<span className="text-[#FFC947]">EXPLORER</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            An interactive catalog for space enthusiasts, offering rich explorations of celestial bodies, space flight missions, and record-breaking astronauts.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#6C5CE7] transition-colors"
            >
            <Code2 className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#6C5CE7] transition-colors"
            >
            <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#FFC947] transition-colors"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-xs">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-white transition-colors">
                Explore Catalog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Our Story (About)
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Space Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-xs">
            Resources & Policies
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                NASA Open APIs
              </a>
            </li>
            <li>
              <a
                href="https://images.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                NASA Images Library
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-xs">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[#6C5CE7] shrink-0 mt-0.5" />
              <span>100 Cosmos Boulevard, Sector 42, Nebula City</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-[#FFC947] shrink-0" />
              <a href="mailto:contact@galaxyexplorer.com" className="hover:text-white transition-colors">
                contact@galaxyexplorer.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-[#94A3B8] shrink-0" />
              <span>+1 (800) SPACE-EX</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 text-center text-xs flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p>&copy; {currentYear} Galaxy Explorer. All rights reserved. Made for celestial discoverers.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
