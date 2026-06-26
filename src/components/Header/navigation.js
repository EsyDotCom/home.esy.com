import React from 'react';
import Link from 'next/link';

const Navigation = () => {
    return (
      <nav className="flex items-center space-x-8">
        {/* Informational links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition text-sm">How it works</a>
          <a href="#" className="text-gray-300 hover:text-white transition text-sm">Pricing</a>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-gray-700"></div>
        
        {/* Product links */}
        <div className="flex items-center space-x-6">
          <Link href="/essays/" className="text-gray-300 hover:text-white transition text-sm">Essays</Link>
          <a href="/learn/" className="text-gray-300 hover:text-white transition text-sm">Learn</a>
        </div>
        
        {/* CTA Button */}
        <a href="https://app.esy.com" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:opacity-90 transition text-sm font-medium text-white">
          Write
        </a>
      </nav>
    );
  };

export default Navigation;