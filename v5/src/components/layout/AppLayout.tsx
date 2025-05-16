import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Activity, BarChart2, Heart, Settings, Menu, X, 
  LogOut, User, Calendar, DropletIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Activity', href: '/activity', icon: Activity },
    { name: 'Nutrition', href: '/nutrition', icon: BarChart2 },
    { name: 'Sleep', href: '/sleep', icon: Calendar },
    { name: 'Water', href: '/water', icon: DropletIcon },
  ];
  
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile header */}
      <header className="bg-white border-b md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-sky-500" />
            <h1 className="ml-2 text-xl font-bold">HealthPulse</h1>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-sky-500" />
              <h1 className="ml-2 text-xl font-bold">HealthPulse</h1>
            </div>
            <button 
              onClick={closeMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4">
            {state.user && (
              <div className="flex items-center px-3 py-4 border-b">
                <div className="flex-shrink-0">
                  {state.user.profileImage ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={state.user.profileImage}
                      alt={state.user.name}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <User size={20} className="text-sky-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-800">{state.user.name}</p>
                  <p className="text-sm text-gray-500">{state.user.email}</p>
                </div>
              </div>
            )}
            
            <nav className="mt-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      closeMobileMenu();
                    }}
                    className={`
                      flex items-center px-3 py-4 text-base font-medium rounded-lg
                      ${isActive 
                        ? 'bg-sky-50 text-sky-500' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${isActive ? 'text-sky-500' : 'text-gray-500'}`}
                    />
                    {item.name}
                  </a>
                );
              })}
              
              <a
                href="/settings"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/settings');
                  closeMobileMenu();
                }}
                className="flex items-center px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <Settings className="mr-3 h-6 w-6 text-gray-500" />
                Settings
              </a>
              
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="flex w-full items-center px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <LogOut className="mr-3 h-6 w-6 text-gray-500" />
                Sign out
              </button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center flex-shrink-0 px-4 mb-8">
            <Heart className="h-8 w-8 text-sky-500" />
            <h1 className="ml-2 text-xl font-bold">HealthPulse</h1>
          </div>
          
          {state.user && (
            <div className="px-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <div className="flex-shrink-0">
                  {state.user.profileImage ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={state.user.profileImage}
                      alt={state.user.name}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <User size={20} className="text-sky-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{state.user.name}</p>
                  <p className="text-xs text-gray-500">{state.user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav className="mt-3 flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-lg
                    ${isActive 
                      ? 'bg-sky-50 text-sky-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? 'text-sky-500' : 'text-gray-500'}`}
                  />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
        
        <div className="flex-shrink-0 border-t p-4">
          <a
            href="/settings"
            onClick={(e) => {
              e.preventDefault();
              navigate('/settings');
            }}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Settings
          </a>
          
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500" />
            Sign out
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 md:ml-64 bg-gray-50">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;