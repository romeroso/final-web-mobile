import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login, state } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      login(email, password);
    }
  };
  
  const handleSignupClick = () => {
    navigate('/signup');
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="text-gray-500">Sign in to continue your health journey</p>
      </div>
      
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        icon={<Mail size={18} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock size={18} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
      />
      
      <div className="text-right">
        <a href="#" className="text-sm text-sky-500 hover:text-sky-700 transition-colors">
          Forgot password?
        </a>
      </div>
      
      <Button 
        type="submit" 
        fullWidth 
        isLoading={state.isLoading}
        size="lg"
        className="mt-6"
      >
        Sign In <ArrowRight size={18} className="ml-2" />
      </Button>
      
      <div className="text-center mt-6">
        <p className="text-gray-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={handleSignupClick}
            className="text-sky-500 hover:text-sky-700 transition-colors font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;