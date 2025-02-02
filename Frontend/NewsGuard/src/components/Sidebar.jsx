import {Home, TextSearch,  Bookmark, Twitter, Youtube} from 'lucide-react';
import React from 'react'
import { useLocation, Link} from 'react-router-dom';
import Logo from './Logo';

const Sidebar = () => {

    const location = useLocation();

  const navigationItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/home' },
    { icon: <TextSearch  size={20} />, label: 'Check News', path: '/check-news' },
    { icon: <Bookmark size={20} />, label: 'Saved', path: '/saved', isNew: true }
  ];


  const socialItems = [
    { icon: <Twitter size={20} />, label: 'Twitter', path: '/twitter' },
    { icon: <Youtube size={20} />, label: 'YouTube', path: '/youtube' },
  ];

  return (
     
    <div className="w-64 h-screen fixed left-0 top-0 bg-dark-3 border-r border-dark-4">
    <div className="p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-3 mb-8">
        <Logo/>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1 mb-8">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors
              ${location.pathname === item.path ? 'bg-dark-4 text-light-1' : 'text-light-3 hover:bg-dark-4'}`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.isNew && (
              <span className="text-[8px] font-bold px-2 py-1 rounded-full bg-primary-500 text-light-1">
                NEW
              </span>
            )}
          </Link>
        ))}
      </nav>


      {/* Social Links */}
      <div>
        <h4 className="text-light-4 text-xs uppercase tracking-wider mb-3 px-3">
          Social
        </h4>
        <nav className="space-y-1">
          {socialItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg text-light-3 hover:bg-dark-4 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </div>
      
  )
}

export default Sidebar
