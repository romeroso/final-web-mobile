import React from 'react';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Heart size={32} className="text-sky-500" />
            <span className="ml-2 text-xl font-bold">HealthPulse</span>
          </div>
          {children}
        </div>
      </div>
      
      {/* Right side - Image and text */}
      <div className="hidden md:flex md:flex-1 bg-gradient-to-br from-sky-400 to-teal-400 text-white">
        <div className="relative w-full h-full overflow-hidden">
          {/* Background patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[10%] left-[20%] w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute top-[60%] left-[70%] w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute top-[30%] left-[60%] w-24 h-24 rounded-full bg-white"></div>
          </div>
          
          <div className="flex flex-col items-center justify-center h-full p-12 relative z-10">
            <div className="mb-8">
              <Heart size={64} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center">Track your health journey</h2>
            <p className="text-center text-lg opacity-90 max-w-md">
              Monitor your progress, set goals, and achieve optimal wellness with our comprehensive health tracking tools.
            </p>
            
            <div className="mt-12 space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full">
                  <Heart size={18} />
                </div>
                <span className="ml-3">Track your activity and fitness</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full">
                  <Heart size={18} />
                </div>
                <span className="ml-3">Monitor sleep and recovery</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full">
                  <Heart size={18} />
                </div>
                <span className="ml-3">Log nutrition and water intake</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;